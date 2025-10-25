import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  User,
  RefreshToken,
  ActivationLink,
  Prisma,
} from '@track-my-money/database';

// Custom types that omit user connection and add userId parameter
type RefreshTokenCreateData = Omit<Prisma.RefreshTokenCreateInput, 'user'> & {
  userId: string;
};

type ActivationLinkCreateData = Omit<
  Prisma.ActivationLinkCreateInput,
  'user'
> & {
  userId: string;
};

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.client.user.findUnique({
      where: { email },
    });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.prisma.client.user.findUnique({
      where: { id },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.client.user.create({
      data,
    });
  }

  async updateUserEmailVerification(
    userId: string,
    isEmailVerified: boolean,
  ): Promise<User> {
    return this.prisma.client.user.update({
      where: { id: userId },
      data: { isEmailVerified },
    });
  }

  async createRefreshToken(
    data: RefreshTokenCreateData,
  ): Promise<RefreshToken> {
    const { userId, ...restData } = data;
    return this.prisma.client.refreshToken.create({
      data: {
        ...restData,
        user: { connect: { id: userId } },
      },
    });
  }

  async findRefreshTokenByToken(token: string): Promise<RefreshToken | null> {
    return this.prisma.client.refreshToken.findFirst({
      where: { token },
    });
  }

  async deleteRefreshTokenById(id: string): Promise<RefreshToken> {
    return this.prisma.client.refreshToken.delete({
      where: { id },
    });
  }

  async deleteRefreshTokensByUserId(
    userId: string,
  ): Promise<{ count: number }> {
    return this.prisma.client.refreshToken.deleteMany({
      where: { userId },
    });
  }

  async deleteRefreshTokenByUserIdAndToken(
    userId: string,
    token: string,
  ): Promise<{ count: number }> {
    return this.prisma.client.refreshToken.deleteMany({
      where: {
        userId,
        token,
      },
    });
  }

  async deleteExpiredRefreshTokensByUserId(
    userId: string,
  ): Promise<{ count: number }> {
    return this.prisma.client.refreshToken.deleteMany({
      where: {
        userId,
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }

  async createActivationLink(
    data: ActivationLinkCreateData,
  ): Promise<ActivationLink> {
    const { userId, ...restData } = data;
    return this.prisma.client.activationLink.create({
      data: {
        ...restData,
        user: { connect: { id: userId } },
      },
    });
  }

  async findActivationLinkById(
    id: string,
  ): Promise<(ActivationLink & { user: User }) | null> {
    return this.prisma.client.activationLink.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async deleteActivationLinkById(id: string): Promise<ActivationLink> {
    return this.prisma.client.activationLink.delete({
      where: { id },
    });
  }

  async deleteActivationLinksByUserId(
    userId: string,
  ): Promise<{ count: number }> {
    return this.prisma.client.activationLink.deleteMany({
      where: { userId },
    });
  }
}
