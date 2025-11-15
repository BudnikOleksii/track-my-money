import { z } from 'zod';

import { TransactionType } from '@track-my-money/api-shared';

export const createCategorySchema = (
  t: (key: string) => string,
  tShared: (key: string) => string,
) =>
  z.object({
    name: z.string().min(1, t('nameRequired')),
    type: z.enum(TransactionType, t('typeRequired')),
    parentCategoryId: z
      .union([z.string().uuid(tShared('invalidUuid')), z.literal('')])
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
  });

export type CreateCategoryFormData = z.infer<
  ReturnType<typeof createCategorySchema>
>;
