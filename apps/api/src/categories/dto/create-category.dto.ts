import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { TransactionType } from '@track-my-money/database';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Food', description: 'Category name' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    enum: TransactionType,
    example: TransactionType.EXPENSE,
    description: 'Transaction type',
  })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Parent category ID (for subcategories)',
  })
  @IsOptional()
  @IsUUID()
  parentCategoryId?: string;
}
