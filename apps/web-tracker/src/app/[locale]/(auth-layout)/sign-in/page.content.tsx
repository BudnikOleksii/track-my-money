'use client';

import { type FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import type { LoginDto } from '@track-my-money/api-shared';
import { Typography } from '@track-my-money/ui/src/components/atoms/typography/Typography';
import { TextField } from '@track-my-money/ui/src/components/molecules/text-field/TextField';
import { Button } from '@track-my-money/ui/src/components/atoms/button/Button';
import { Loader } from '@track-my-money/ui/src/components/atoms/loader/Loader';

import { useRouter } from '@/src/navigation/navigation';
import { I18N_NAMESPACE } from '@/src/i18n/constants/i18n-namespace';
import { useLoginMutation } from '@/src/store/api/auth-api';
import { ROUTES } from '@/src/shared/constants/routes';
import { NavigationLink } from '@/src/shared/components/navigation-link/NavigationLink';

import styles from './page.module.scss';

interface FormData {
  email: string;
  password: string;
}

export const SignInPageContent: FC = () => {
  const t = useTranslations(`${I18N_NAMESPACE.signInPage}.content`);
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setErrorMessage('');
      const loginDto: LoginDto = {
        email: data.email,
        password: data.password,
      };
      await login(loginDto).unwrap();
      router.push(ROUTES.dashboard);
    } catch {
      setErrorMessage(t('errorInvalidCredentials'));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <Typography variant="title-l" className={styles.title}>
            {t('title')}
          </Typography>
          <Typography variant="body-l" className={styles.subtitle}>
            {t('subtitle')}
          </Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <TextField
            label={t('email')}
            type="email"
            placeholder={t('emailPlaceholder')}
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email', {
              required: t('emailRequired'),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t('emailInvalid'),
              },
            })}
          />

          <TextField
            label={t('password')}
            type="password"
            placeholder={t('passwordPlaceholder')}
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password', {
              required: t('passwordRequired'),
            })}
          />

          {errorMessage && <div className={styles.error}>{errorMessage}</div>}

          <Button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? <Loader size="sm" /> : t('signInButton')}
          </Button>
        </form>

        <Typography variant="body-s" className={styles.footer}>
          {t('noAccount')}{' '}
          <NavigationLink href={ROUTES.signUp} className={styles.link}>
            {t('signUpLink')}
          </NavigationLink>
        </Typography>
      </div>
    </div>
  );
};
