export const BASE_AUTH_API_ROUTE = '/auth';

export const AUTH_API_ROUTE = {
  signup: `${BASE_AUTH_API_ROUTE}/signup`,
  login: `${BASE_AUTH_API_ROUTE}/login`,
  refresh: `${BASE_AUTH_API_ROUTE}/refresh`,
  logout: `${BASE_AUTH_API_ROUTE}/logout`,
  profile: `${BASE_AUTH_API_ROUTE}/profile`,
} as const;
