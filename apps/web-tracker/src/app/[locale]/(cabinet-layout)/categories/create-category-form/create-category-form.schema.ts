import { z } from 'zod';

import { TransactionType } from '@/src/constants/transaction-type';

export const createCategorySchema = (
  t: (key: string) => string,
  tShared: (key: string) => string,
) =>
  z.object({
    name: z.string().min(1, t('nameRequired')),
    type: z.enum(Object.values(TransactionType), t('typeRequired')),
    parentCategoryId: z
      .union([z.string().uuid(tShared('invalidUuid')), z.literal('')])
      .transform((val) => (val === '' ? undefined : val))
      .optional(),
  });

export type CreateCategoryFormData = z.infer<
  ReturnType<typeof createCategorySchema>
>;
