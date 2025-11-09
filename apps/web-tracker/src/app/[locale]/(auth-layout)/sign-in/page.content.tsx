import { type FC } from 'react';
import { getTranslations } from 'next-intl/server';

import { Typography } from '@track-my-money/ui/src/components/atoms/typography/Typography';

import { I18N_NAMESPACE } from '@/src/i18n/constants/i18n-namespace';
import { ROUTES } from '@/src/shared/constants/routes';
import { NavigationLink } from '@/src/shared/components/navigation-link/NavigationLink';
import { LocaleCode } from '@/src/i18n/constants/locale-code';

import { SignInForm } from './sign-in-form/SignInForm';

import styles from './page.module.scss';

interface Props {
  locale: LocaleCode;
}

export const SignInPageContent: FC<Props> = async ({ locale }) => {
  const t = await getTranslations({
    locale,
    namespace: `${I18N_NAMESPACE.signInPage}.content`,
  });

  return (
    <>
      <div className={styles.header}>
        <Typography variant="title-l" className={styles.title}>
          {t('title')}
        </Typography>
        <Typography variant="body-l">{t('subtitle')}</Typography>
      </div>

      <SignInForm />

      <Typography variant="body-s" className={styles.footer}>
        {t('noAccount')}{' '}
        <NavigationLink href={ROUTES.signUp} className={styles.link}>
          {t('signUpLink')}
        </NavigationLink>
      </Typography>
    </>
  );
};
