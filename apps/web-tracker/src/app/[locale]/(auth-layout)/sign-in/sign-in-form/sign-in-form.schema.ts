import { z } from 'zod';

export const createSignInSchema = (t: (key: string) => string) =>
  z.object({
    email: z.email(t('emailInvalid')),
    password: z.string(t('passwordRequired')).min(8, t('passwordMinLength')),
  });

export type SignInFormData = z.infer<ReturnType<typeof createSignInSchema>>;
