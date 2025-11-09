import { getTranslations } from 'next-intl/server';

import { Typography } from '@track-my-money/ui/src/components/atoms/typography/Typography';

import { I18N_NAMESPACE } from '@/src/i18n/constants/i18n-namespace';
import { ROUTES } from '@/src/shared/constants/routes';
import { NavigationLink } from '@/src/shared/components/navigation-link/NavigationLink';
import { LocaleCode } from '@/src/i18n/constants/locale-code';

import { SignUpForm } from './sign-up-form/SignUpForm';

import styles from './page.module.scss';

interface Props {
  locale: LocaleCode;
}

export const SignUpPageContent = async ({ locale }: Props) => {
  const t = await getTranslations({
    locale,
    namespace: `${I18N_NAMESPACE.signUpPage}.content`,
  });

  return (
    <>
      <div className={styles.header}>
        <Typography variant="title-l" className={styles.title}>
          {t('title')}
        </Typography>
        <Typography variant="body-l">{t('subtitle')}</Typography>
      </div>

      <SignUpForm />

      <Typography variant="body-s" className={styles.footer}>
        {t('haveAccount')}{' '}
        <NavigationLink href={ROUTES.signIn} className={styles.link}>
          {t('signInLink')}
        </NavigationLink>
      </Typography>
    </>
  );
};
