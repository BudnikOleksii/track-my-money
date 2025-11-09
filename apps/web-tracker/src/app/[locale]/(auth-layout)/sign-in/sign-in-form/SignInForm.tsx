'use client';

import { type FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { Button } from '@track-my-money/ui/src/components/atoms/button/Button';
import { Loader } from '@track-my-money/ui/src/components/atoms/loader/Loader';

import { useRouter } from '@/src/navigation/navigation';
import { I18N_NAMESPACE } from '@/src/i18n/constants/i18n-namespace';
import { useLoginMutation } from '@/src/store/api/auth-api';
import { ROUTES } from '@/src/shared/constants/routes';

import { AuthForm } from '../../components/auth-form/AuthForm';
import { EmailInput } from '../../components/email-input/EmailInput';
import { PasswordInput } from '../../components/password-input/PasswordInput';
import { createSignInSchema, SignInFormData } from './sign-in-form.schema';

import styles from '../../components/auth-form/AuthForm.module.scss';

export const SignInForm: FC = () => {
  const t = useTranslations(`${I18N_NAMESPACE.signInPage}.content`);
  const tShared = useTranslations(`${I18N_NAMESPACE.authShared}`);
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(createSignInSchema(tShared)),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      setErrorMessage('');

      await login(data).unwrap();
      router.push(ROUTES.dashboard);
    } catch {
      setErrorMessage(t('errorInvalidCredentials'));
    }
  };

  return (
    <AuthForm onSubmit={handleSubmit(onSubmit)}>
      <EmailInput register={register} name="email" fieldError={errors.email} />

      <PasswordInput
        register={register}
        name="password"
        fieldError={errors.password}
      />

      {errorMessage && <div className={styles.error}>{errorMessage}</div>}

      <Button
        type="submit"
        disabled={isLoading}
        className={styles.submitButton}
      >
        {isLoading ? <Loader size="sm" /> : t('signInButton')}
      </Button>
    </AuthForm>
  );
};
