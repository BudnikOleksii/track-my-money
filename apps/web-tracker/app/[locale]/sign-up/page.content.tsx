'use client';

import { type FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import type { SignupDto } from '@track-my-money/api-shared';
import { Typography } from '@track-my-money/ui/src/components/atoms/typography/Typography';
import { TextField } from '@track-my-money/ui/src/components/molecules/text-field/TextField';
import { Button } from '@track-my-money/ui/src/components/atoms/button/Button';

import { useSignupMutation } from '@/app/store/api/auth-api';
import { I18N_NAMESPACE } from '@/app/i18n/constants/i18n-namespace';

import styles from './page.module.scss';

interface FormData {
  name: string;
  email: string;
  password: string;
}

export const SignUpPageContent: FC = () => {
  const t = useTranslations(`${I18N_NAMESPACE.signUpPage}.content`);
  const router = useRouter();
  const [signup, { isLoading }] = useSignupMutation();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setErrorMessage('');
      const signupDto: SignupDto = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      await signup(signupDto).unwrap();
      router.push('/dashboard');
    } catch {
      setErrorMessage(t('errorGeneric'));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <Typography variant="title-l" className={styles.title}>
            {t('title')}
          </Typography>
          <Typography variant="body-l">{t('subtitle')}</Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <TextField
            label={t('name')}
            type="text"
            placeholder={t('namePlaceholder')}
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name', {
              required: t('nameRequired'),
            })}
          />

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
              minLength: {
                value: 8,
                message: t('passwordMinLength'),
              },
            })}
          />

          {errorMessage && <div className={styles.error}>{errorMessage}</div>}

          <Button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? 'Loading...' : t('signUpButton')}
          </Button>
        </form>

        <Typography variant="body-s" className={styles.footer}>
          {t('haveAccount')}{' '}
          <Link href="/sign-in" className={styles.link}>
            {t('signInLink')}
          </Link>
        </Typography>
      </div>
    </div>
  );
};
