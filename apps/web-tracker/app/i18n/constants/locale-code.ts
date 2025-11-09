export const LOCALE_CODE = {
  EN: 'en',
  UK: 'uk',
} as const;

export type LocaleCode = (typeof LOCALE_CODE)[keyof typeof LOCALE_CODE];

export const LOCALE_CODE_LIST = Object.values(LOCALE_CODE);

export const checkIsLocaleCode = (locale: string): locale is LocaleCode => {
  return LOCALE_CODE_LIST.includes(locale as LocaleCode);
};
