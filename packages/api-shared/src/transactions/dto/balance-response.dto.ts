import { Currency } from '@track-my-money/database';

export interface BalanceResponseDto {
  balance: string;
  income: string;
  expenses: string;
  currency: Currency;
  transactionCount: number;
}
