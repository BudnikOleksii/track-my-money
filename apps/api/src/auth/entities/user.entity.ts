import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  isEmailVerified: boolean;

  @ApiProperty({ nullable: true })
  country: string | null;

  @ApiProperty()
  baseCurrency: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
