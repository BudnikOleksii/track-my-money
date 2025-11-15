import { z } from 'zod';

import { TransactionType } from '@track-my-money/api-shared';

export const updateCategorySchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, t('nameRequired')),
    type: z.enum(TransactionType),
  });

export type UpdateCategoryFormData = z.infer<
  ReturnType<typeof updateCategorySchema>
>;
