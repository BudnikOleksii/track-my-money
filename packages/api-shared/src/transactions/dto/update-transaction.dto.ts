import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  IsPositive,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

import { TransactionType, Currency } from '@track-my-money/database';

export class UpdateTransactionDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  amount?: number;

  @IsOptional()
  @Type(() => Date)
  date?: Date;

  @IsOptional()
  @IsString()
  @MinLength(1)
  description?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsEnum(Currency)
  currency?: Currency;

  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsUUID()
  subcategoryId?: string;
}
