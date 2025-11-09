'use client';

import { type FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import type { SignupDto } from '@track-my-money/api-shared';
import { TextField } from '@track-my-money/ui/src/components/molecules/text-field/TextField';
import { Button } from '@track-my-money/ui/src/components/atoms/button/Button';
import { Loader } from '@track-my-money/ui/src/components/atoms/loader/Loader';

import { useRouter } from '@/src/navigation/navigation';
import { useSignupMutation } from '@/src/store/api/auth-api';
import { I18N_NAMESPACE } from '@/src/i18n/constants/i18n-namespace';
import { ROUTES } from '@/src/shared/constants/routes';

import { AuthForm } from '../../components/auth-form/AuthForm';
import { EmailInput } from '../../components/email-input/EmailInput';
import { PasswordInput } from '../../components/password-input/PasswordInput';
import { createSignUpSchema } from './sign-up-form.schema';

import styles from './SignUpForm.module.scss';

export const SignUpForm: FC = () => {
  const t = useTranslations(`${I18N_NAMESPACE.signUpPage}.content`);
  const tShared = useTranslations(`${I18N_NAMESPACE.authShared}`);
  const router = useRouter();
  const [signup, { isLoading }] = useSignupMutation();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createSignUpSchema(t, tShared)),
  });

  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      setErrorMessage('');
      const signupDto: SignupDto = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      await signup(signupDto).unwrap();
      router.push(ROUTES.dashboard);
    } catch {
      setErrorMessage(tShared('errorGeneric'));
    }
  };

  return (
    <AuthForm onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label={t('name')}
        type="text"
        placeholder={t('namePlaceholder')}
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register('name')}
      />

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
        {isLoading ? <Loader size="sm" /> : t('signUpButton')}
      </Button>
    </AuthForm>
  );
};
