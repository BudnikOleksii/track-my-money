import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

import { TransactionType } from '@track-my-money/database';

export class CreateCategoryDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsOptional()
  @IsUUID()
  parentCategoryId?: string;
}
