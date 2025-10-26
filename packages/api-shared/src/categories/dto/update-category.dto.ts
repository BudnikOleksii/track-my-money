import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

import { TransactionType } from '@track-my-money/database';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;
}
