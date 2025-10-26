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

import { TransactionType, Currency } from '@track-my-money/database';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  amount: number;

  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @IsString()
  @MinLength(1)
  description: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsEnum(Currency)
  currency?: Currency;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsUUID()
  categoryId: string;

  @IsOptional()
  @IsUUID()
  subcategoryId?: string;
}
