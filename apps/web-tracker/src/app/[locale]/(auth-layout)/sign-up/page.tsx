import type { Metadata, NextPage } from 'next';
import { getTranslations } from 'next-intl/server';

import { I18N_NAMESPACE } from '@/src/i18n/constants/i18n-namespace';
import { LOCALE_CODE_LIST, LocaleCode } from '@/src/i18n/constants/locale-code';

import { SignUpPageContent } from './page.content';

interface Props {
  params: Promise<{
    locale: LocaleCode;
  }>;
}

export function generateStaticParams() {
  return LOCALE_CODE_LIST.map((locale) => ({
    locale,
  }));
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

const SignUpPage: NextPage<Props> = async (props) => {
  const params = await props.params;
  const { locale } = params;

  return <SignUpPageContent locale={locale} />;
};

export default SignUpPage;
