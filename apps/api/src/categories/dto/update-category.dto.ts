import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { TransactionType } from '@track-my-money/database';

export class UpdateCategoryDto {
  @ApiPropertyOptional({
    example: 'Food & Dining',
    description: 'Category name',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @ApiPropertyOptional({
    enum: TransactionType,
    example: TransactionType.EXPENSE,
    description: 'Transaction type',
  })
  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;
}
