import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { checkIsLocaleCode } from '@/src/i18n/constants/locale-code';

import { getMessagesByLocale } from './utils/get-messages-by-locale';
import { onTranslateError } from './utils/on-translate-error';
import { getTranslationMessageFallback } from './utils/get-translation-message-fallback';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locale || !checkIsLocaleCode(locale)) {
    return notFound();
  }

  return {
    messages: await getMessagesByLocale(locale),
    onError: onTranslateError,
    getMessageFallback: getTranslationMessageFallback,
    locale,
  };
});
