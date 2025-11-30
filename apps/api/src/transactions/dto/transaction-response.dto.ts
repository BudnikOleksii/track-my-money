import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { TransactionType, Currency } from '@track-my-money/database';

export class TransactionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  amount: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  description: string;

  @ApiPropertyOptional()
  note: string | null;

  @ApiProperty({ enum: Currency })
  currency: Currency;

  @ApiProperty({ enum: TransactionType })
  type: TransactionType;

  @ApiProperty()
  categoryId: string;

  @ApiPropertyOptional()
  subcategoryId: string | null;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
