import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from './user.dto';

export class AuthResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token',
  })
  accessToken: string;

  @ApiProperty({ description: 'User information', type: UserDto })
  user: UserDto;
}
