import { Transaction } from '@track-my-money/database';

export type TransactionEntity = Omit<
  Transaction,
  'user' | 'category' | 'subcategory'
>;
