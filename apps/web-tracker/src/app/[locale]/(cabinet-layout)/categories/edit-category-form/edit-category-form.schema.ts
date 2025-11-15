import { z } from 'zod';

import { TransactionType } from '@/src/constants/transaction-type';

export const updateCategorySchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, t('nameRequired')),
    type: z.enum(Object.values(TransactionType)),
  });

export type UpdateCategoryFormData = z.infer<
  ReturnType<typeof updateCategorySchema>
>;
