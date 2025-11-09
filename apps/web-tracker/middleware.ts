import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import { routing } from './app/navigation/navigation';

export const middleware = (request: NextRequest) => {
  const handleI18nRouting = createIntlMiddleware(routing);
  const response = handleI18nRouting(request);

  return response;
};

export const config = {
  matcher: [
    `/((?!api|_next|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.svg$|.*\\.ico$).*)`,
  ],
};
