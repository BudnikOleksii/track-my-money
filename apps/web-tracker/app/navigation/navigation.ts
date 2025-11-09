import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { LOCALE_CODE, LOCALE_CODE_LIST } from '../i18n/constants/locale-code';

export const routing = defineRouting({
  defaultLocale: LOCALE_CODE.EN,
  locales: LOCALE_CODE_LIST,
  alternateLinks: false,
  localePrefix: 'as-needed',
  localeDetection: false,
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
