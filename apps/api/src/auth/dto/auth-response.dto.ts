import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '../entities/user.entity';

export class AuthResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token',
  })
  accessToken: string;

  @ApiProperty({ description: 'User information', type: UserEntity })
  user: UserEntity;
}
