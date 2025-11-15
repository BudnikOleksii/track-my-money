import {
  IsEnum,
  IsOptional,
  IsUUID,
  IsDateString,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { TransactionType, Currency } from '@track-my-money/database';

export class TransactionQueryDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number', minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Items per page',
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({
    enum: ['date', 'amount', 'createdAt'],
    example: 'date',
    description: 'Sort field',
  })
  @IsOptional()
  @IsEnum(['date', 'amount', 'createdAt'])
  sortBy?: 'date' | 'amount' | 'createdAt';

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
    example: 'desc',
    description: 'Sort order',
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';

  @ApiPropertyOptional({
    enum: TransactionType,
    example: TransactionType.EXPENSE,
    description: 'Filter by transaction type',
  })
  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;

  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Filter by category ID',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174001',
    description: 'Filter by subcategory ID',
  })
  @IsOptional()
  @IsUUID()
  subcategoryId?: string;

  @ApiPropertyOptional({
    example: '2024-01-01',
    description: 'Start date filter (ISO date string)',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    example: '2024-01-31',
    description: 'End date filter (ISO date string)',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    enum: Currency,
    example: Currency.USD,
    description: 'Filter by currency',
  })
  @IsOptional()
  @IsEnum(Currency)
  currency?: Currency;
}
