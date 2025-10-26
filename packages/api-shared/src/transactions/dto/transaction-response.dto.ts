import { TransactionType, Currency } from '@track-my-money/database';

export interface TransactionResponseDto {
  id: string;
  amount: string;
  date: Date;
  description: string;
  note: string | null;
  currency: Currency;
  type: TransactionType;
  categoryId: string;
  subcategoryId: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
