import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import {
  UserRole,
  User,
  RefreshToken,
  ActivationLink,
} from '@track-my-money/database';
import {
  SignupDto,
  LoginDto,
  RefreshTokenDto,
  AuthResponseDto,
  UserEntity,
} from '@track-my-money/api-shared';

import { EmailService } from '../email/email.service';
import { AuthConfig } from '../config/auth.config';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}

  private get authConfig(): AuthConfig {
    const config = this.configService.get<AuthConfig>('auth');
    if (!config) {
      throw new Error('Auth configuration is not available');
    }

    return config;
  }

  async signup(
    signupDto: SignupDto,
  ): Promise<AuthResponseDto & { refreshToken: string }> {
    const { email, password, name } = signupDto;

    const existingUser = await this.authRepository.findUserByEmail(email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    const user = await this.authRepository.createUser({
      email,
      password: hashedPassword,
      name,
      role: UserRole.USER,
      isEmailVerified: false,
    });

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    const activationLink = await this.createActivationLink(user.id);

    await this.emailService.sendActivationEmail(email, activationLink.id);

    await this.storeRefreshToken(
      user.id,
      tokens.refreshToken,
      // TODO: get info instead of hardcoded values
      'signup',
      '127.0.0.1',
      'signup-device',
    );

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: this.mapUserToEntity(user),
    };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<AuthResponseDto & { refreshToken: string }> {
    const { email, password } = loginDto;

    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isEmailVerified) {
      throw new UnauthorizedException(
        'Please verify your email before logging in',
      );
    }

    await this.cleanupExpiredRefreshTokens(user.id);

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    await this.storeRefreshToken(
      user.id,
      tokens.refreshToken,
      // TODO: get info instead of hardcoded values
      'login',
      '127.0.0.1',
      'login-device',
    );

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: this.mapUserToEntity(user),
    };
  }

  async refreshTokens(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<AuthResponseDto & { refreshToken: string }> {
    const { refreshToken } = refreshTokenDto;

    const tokenRecord = await this.validateRefreshToken(refreshToken);
    if (!tokenRecord) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.authRepository.findUserById(tokenRecord.userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    await this.cleanupExpiredRefreshTokens(user.id);

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    await this.authRepository.deleteRefreshTokenById(tokenRecord.id);

    await this.storeRefreshToken(
      user.id,
      tokens.refreshToken,
      // TODO: get info instead of hardcoded values
      'refresh',
      '127.0.0.1',
      'refresh-device',
    );

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: this.mapUserToEntity(user),
    };
  }

  async logout(userId: string, refreshToken: string): Promise<void> {
    await this.authRepository.deleteRefreshTokenByUserIdAndToken(
      userId,
      refreshToken,
    );
  }

  async logoutAll(userId: string): Promise<void> {
    await this.authRepository.deleteRefreshTokensByUserId(userId);
  }

  async verifyEmail(activationLinkId: string): Promise<void> {
    const activationLink =
      await this.authRepository.findActivationLinkById(activationLinkId);

    if (!activationLink) {
      throw new BadRequestException('Invalid activation link');
    }

    if (activationLink.expiresAt < new Date()) {
      throw new BadRequestException('Activation link has expired');
    }

    if (activationLink.user.isEmailVerified) {
      throw new BadRequestException('Email is already verified');
    }

    await this.authRepository.updateUserEmailVerification(
      activationLink.userId,
      true,
    );

    await this.authRepository.deleteActivationLinkById(activationLinkId);
  }

  async resendActivationLink(userId: string): Promise<void> {
    const user = await this.authRepository.findUserById(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('Email is already verified');
    }

    await this.authRepository.deleteActivationLinksByUserId(userId);

    const activationLink = await this.createActivationLink(userId);

    await this.emailService.sendActivationEmail(user.email, activationLink.id);
  }

  async validateUser(email: string, password: string) {
    const user = await this.authRepository.findUserByEmail(email);

    if (user && (await this.comparePasswords(password, user.password))) {
      return user;
    }

    return null;
  }

  private async generateTokens(
    userId: string,
    email: string,
    role: UserRole,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: userId, email, role };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.authConfig.jwtAccessExpiresIn,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.authConfig.jwtRefreshExpiresIn,
    });

    return { accessToken, refreshToken };
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;

    return bcrypt.hash(password, saltRounds);
  }

  private async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  private async storeRefreshToken(
    userId: string,
    token: string,
    deviceInfo: string,
    ipAddress: string,
    userAgent: string,
  ): Promise<void> {
    const expiresAt = new Date();
    const refreshExpiresIn = this.authConfig.jwtRefreshExpiresIn;
    const days = parseInt(refreshExpiresIn.replace('d', ''));
    expiresAt.setDate(expiresAt.getDate() + days);

    await this.authRepository.createRefreshToken({
      userId,
      token,
      deviceInfo,
      ipAddress,
      userAgent,
      expiresAt,
    });
  }

  private async validateRefreshToken(
    token: string,
  ): Promise<RefreshToken | null> {
    const tokenRecord =
      await this.authRepository.findRefreshTokenByToken(token);

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      return null;
    }

    return tokenRecord;
  }

  private async createActivationLink(userId: string): Promise<ActivationLink> {
    const expiresAt = new Date();
    const activationExpiresIn = this.authConfig.activationLinkExpiresIn;
    const hours = parseInt(activationExpiresIn.replace('h', ''));
    expiresAt.setHours(expiresAt.getHours() + hours);

    return this.authRepository.createActivationLink({
      userId,
      id: uuidv4(),
      expiresAt,
    });
  }

  private async cleanupExpiredRefreshTokens(userId: string): Promise<void> {
    await this.authRepository.deleteExpiredRefreshTokensByUserId(userId);
  }

  private mapUserToEntity(user: User): UserEntity {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      country: user.country ?? null,
      baseCurrency: user.baseCurrency,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
