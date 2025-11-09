import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import { routing } from './app/navigation/navigation';
import { LOCALE_CODE } from './app/i18n/constants/locale-code';
import { HTTP_STATUS_CODE } from './app/constants/http-status-code';

const EN_PATH = `/${LOCALE_CODE.EN}`;

export const middleware = (request: NextRequest) => {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname.startsWith(EN_PATH)) {
    const newPath = pathname.replace(EN_PATH, '') || '/';
    const newUrl = new URL(newPath, request.url);

    searchParams.forEach((value, key) => {
      newUrl.searchParams.set(key, value);
    });

    return NextResponse.redirect(newUrl, HTTP_STATUS_CODE.MOVED_PERMANENTLY);
  }

  const handleI18nRouting = createIntlMiddleware(routing);
  const response = handleI18nRouting(request);

  return response;
};

export const config = {
  matcher: [
    `/((?!api|_next|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.svg$|.*\\.ico$).*)`,
  ],
};
