import { Category } from '@track-my-money/database';

export type CategoryEntity = Omit<
  Category,
  'user' | 'parentCategory' | 'subcategories'
>;
