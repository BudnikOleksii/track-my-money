import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { I18N_NAMESPACE } from '@/src/i18n/constants/i18n-namespace';

import { SignUpPageContent } from './page.content';

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;

  const t = await getTranslations({
    locale,
    namespace: `${I18N_NAMESPACE.signUpPage}.metadata`,
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

const SignUpPage = () => {
  return <SignUpPageContent />;
};

export default SignUpPage;
