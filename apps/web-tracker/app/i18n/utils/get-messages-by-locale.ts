import deepmerge from 'deepmerge';

import { LocaleCode } from '@/app/i18n/constants/locale-code';

import { DEFAULT_LOCALE_CODE } from '../constants/default-locale-code';
import { LocalizationMessages } from '../types/localization-messages';
import { LOCALIZATION_MESSAGES_FILE_NAME_BY_NAMESPACE } from '../constants/localization-messages-file-name-by-namespace';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withCache = <T extends (...args: any[]) => any>(fn: T) => {
  const cache = new Map<string, LocalizationMessages>();

  return async (...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    const cachedResult = cache.get(key);

    if (cachedResult) {
      return cachedResult;
    }

    const result = await fn(...args);
    cache.set(key, result);

    return result;
  };
};

const importMessagesJson = async (locale: LocaleCode, fileName: string) => {
  return (await import(`../../../messages/${locale}/${fileName}.json`)).default;
};

const _getMessagesByLocale = async (
  locale: LocaleCode,
  fileByNamespace: Record<string, string>,
) => {
  const messages: LocalizationMessages = {};

  for (const namespace in fileByNamespace) {
    const fileName = fileByNamespace[namespace];

    if (!fileName) {
      continue;
    }

    try {
      messages[namespace] = await importMessagesJson(locale, fileName);
    } catch {
      messages[namespace] = await importMessagesJson(
        DEFAULT_LOCALE_CODE,
        fileName,
      );
    }
  }

  return messages;
};

const getBundledMessagesByLocale = async (locale: LocaleCode) => {
  const currentLocaleMessages = await _getMessagesByLocale(
    locale,
    LOCALIZATION_MESSAGES_FILE_NAME_BY_NAMESPACE,
  );

  const defaultLocaleMessages = await _getMessagesByLocale(
    DEFAULT_LOCALE_CODE,
    LOCALIZATION_MESSAGES_FILE_NAME_BY_NAMESPACE,
  );

  return deepmerge(defaultLocaleMessages, currentLocaleMessages);
};

export const getMessagesByLocale = withCache(getBundledMessagesByLocale);
