import { UserEntity } from '../entities/user.entity';

export class AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  user: UserEntity;
}
