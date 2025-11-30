import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'MyS3cur3P@ssw0rd!',
    description: 'User password (minimum 8 characters)',
    minLength: 8,
    maxLength: 128,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User full name',
    minLength: 1,
    maxLength: 100,
  })
  @MinLength(1, { message: 'Name cannot be empty' })
  @MaxLength(100, { message: 'Name cannot exceed 100 characters' })
  @IsString()
  name: string;
}
