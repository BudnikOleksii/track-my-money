import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  IsPositive,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { TransactionType, Currency } from '@track-my-money/database';

export class UpdateTransactionDto {
  @ApiPropertyOptional({ example: 150.75, description: 'Transaction amount' })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  amount?: number;

  @ApiPropertyOptional({
    example: '2024-01-20T00:00:00.000Z',
    description: 'Transaction date',
  })
  @IsOptional()
  @Type(() => Date)
  date?: Date;

  @ApiPropertyOptional({
    example: 'Updated description',
    description: 'Transaction description',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  description?: string;

  @ApiPropertyOptional({
    example: 'Updated notes',
    description: 'Additional notes',
  })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiPropertyOptional({
    enum: Currency,
    example: Currency.USD,
    description: 'Transaction currency',
  })
  @IsOptional()
  @IsEnum(Currency)
  currency?: Currency;

  @ApiPropertyOptional({
    enum: TransactionType,
    example: TransactionType.EXPENSE,
    description: 'Transaction type',
  })
  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;

  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Category ID',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174001',
    description: 'Subcategory ID',
  })
  @IsOptional()
  @IsUUID()
  subcategoryId?: string;
}
