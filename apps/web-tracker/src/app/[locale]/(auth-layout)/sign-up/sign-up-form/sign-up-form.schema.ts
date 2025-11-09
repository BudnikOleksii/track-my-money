import { z } from 'zod';

export const createSignUpSchema = (
  t: (key: string) => string,
  tShared: (key: string) => string,
) =>
  z.object({
    name: z.string().min(4, t('nameMinLength')),
    email: z.email(tShared('emailInvalid')),
    password: z
      .string(tShared('passwordRequired'))
      .min(8, tShared('passwordMinLength')),
  });

export type SignUpFormData = z.infer<ReturnType<typeof createSignUpSchema>>;
