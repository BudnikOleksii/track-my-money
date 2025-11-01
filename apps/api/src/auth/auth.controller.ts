import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Throttle } from '@nestjs/throttler';

import {
  SignupDto,
  LoginDto,
  AuthResponseDto,
  UserEntity,
} from '@track-my-money/api-shared';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  private readonly REFRESH_TOKEN_COOKIE = 'refreshToken';
  private readonly REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

  constructor(private authService: AuthService) {}

  private setRefreshTokenCookie(res: Response, refreshToken: string): void {
    res.cookie(this.REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: this.REFRESH_TOKEN_MAX_AGE,
    });
  }

  private clearRefreshTokenCookie(res: Response): void {
    res.clearCookie(this.REFRESH_TOKEN_COOKIE);
  }

  @Public()
  @Throttle({ default: { limit: 3, ttl: 3600000 } }) // 3 requests per hour
  @Post('signup')
  async signup(
    @Body() signupDto: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const result = await this.authService.signup(signupDto);

    this.setRefreshTokenCookie(res, result.refreshToken);

    return {
      accessToken: result.accessToken,
      user: result.user,
    };
  }

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 requests per minute
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const result = await this.authService.login(loginDto);

    this.setRefreshTokenCookie(res, result.refreshToken);

    return {
      accessToken: result.accessToken,
      user: result.user,
    };
  }

  @Public()
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 requests per minute
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const refreshToken = req.cookies?.[this.REFRESH_TOKEN_COOKIE];

    if (!refreshToken) {
      throw new BadRequestException('Refresh token not provided');
    }

    const result = await this.authService.refreshTokens({ refreshToken });

    this.setRefreshTokenCookie(res, result.refreshToken);

    return {
      accessToken: result.accessToken,
      user: result.user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @CurrentUser() user: UserEntity,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const refreshToken = req.cookies[this.REFRESH_TOKEN_COOKIE];

    if (refreshToken) {
      await this.authService.logout(user.id, refreshToken);
    }

    this.clearRefreshTokenCookie(res);

    return { message: 'Logged out successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout-all')
  @HttpCode(HttpStatus.OK)
  async logoutAll(
    @CurrentUser() user: UserEntity,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    await this.authService.logoutAll(user.id);

    this.clearRefreshTokenCookie(res);

    return { message: 'Logged out from all devices successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: UserEntity): Promise<UserEntity> {
    return user;
  }

  @Public()
  @Get('verify-email/:activationLinkId')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(
    @Param('activationLinkId') activationLinkId: string,
  ): Promise<{ message: string }> {
    await this.authService.verifyEmail(activationLinkId);

    return { message: 'Email verified successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 3, ttl: 3600000 } }) // 3 requests per hour
  @Post('resend-activation')
  @HttpCode(HttpStatus.OK)
  async resendActivation(
    @CurrentUser() user: UserEntity,
  ): Promise<{ message: string }> {
    await this.authService.resendActivationLink(user.id);

    return { message: 'Activation link sent successfully' };
  }
}
