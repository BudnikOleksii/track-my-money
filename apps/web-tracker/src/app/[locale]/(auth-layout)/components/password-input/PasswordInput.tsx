import { useTranslations } from 'next-intl';
import type { FieldError, Path, UseFormRegister } from 'react-hook-form';

import { TextField } from '@track-my-money/ui/src/components/molecules/text-field/TextField';

import { I18N_NAMESPACE } from '@/src/i18n/constants/i18n-namespace';

interface Props<T extends Record<string, unknown>> {
  register: UseFormRegister<T>;
  name: Path<T>;
  fieldError?: FieldError;
}

export const PasswordInput = <T extends Record<string, unknown>>({
  register,
  name,
  fieldError,
}: Props<T>) => {
  const t = useTranslations(`${I18N_NAMESPACE.authShared}`);

  return (
    <TextField
      label={t('password')}
      type="password"
      placeholder={t('passwordPlaceholder')}
      error={!!fieldError}
      helperText={fieldError?.message}
      {...register(name)}
    />
  );
};
