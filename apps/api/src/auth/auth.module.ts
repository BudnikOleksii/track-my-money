import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailModule } from '../email/email.module';
import { AuthConfig } from '../config/auth.config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const authConfig = configService.get<AuthConfig>('auth')!;
        return {
          secret: authConfig.jwtAccessSecret,
          signOptions: { expiresIn: authConfig.jwtAccessExpiresIn },
        };
      },
      inject: [ConfigService],
    }),
    PrismaModule,
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtStrategy],
  exports: [AuthService, AuthRepository, JwtStrategy],
})
export class AuthModule {}
