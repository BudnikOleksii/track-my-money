import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsPositive,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { TransactionType, Currency } from '@track-my-money/database';

export class CreateTransactionDto {
  @ApiProperty({ example: 100.5, description: 'Transaction amount' })
  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  amount: number;

  @ApiProperty({
    example: '2024-01-15T00:00:00.000Z',
    description: 'Transaction date',
  })
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    example: 'Grocery shopping',
    description: 'Transaction description',
  })
  @IsString()
  @MinLength(1)
  description: string;

  @ApiPropertyOptional({
    example: 'Weekly groceries',
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

  @ApiProperty({
    enum: TransactionType,
    example: TransactionType.EXPENSE,
    description: 'Transaction type',
  })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Category ID',
  })
  @IsUUID()
  categoryId: string;

  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174001',
    description: 'Subcategory ID',
  })
  @IsOptional()
  @IsUUID()
  subcategoryId?: string;
}
