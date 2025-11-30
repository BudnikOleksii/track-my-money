import { ApiProperty } from '@nestjs/swagger';

import { Currency } from '@track-my-money/database';

export class BalanceResponseDto {
  @ApiProperty()
  balance: string;

  @ApiProperty()
  income: string;

  @ApiProperty()
  expenses: string;

  @ApiProperty({ enum: Currency })
  currency: Currency;

  @ApiProperty()
  transactionCount: number;
}
