export const BASE_AUTH_API_ROUTE = '/auth';

export const AUTH_API_ROUTE = {
  register: `${BASE_AUTH_API_ROUTE}/register`,
  login: `${BASE_AUTH_API_ROUTE}/login`,
  refresh: `${BASE_AUTH_API_ROUTE}/refresh`,
  logout: `${BASE_AUTH_API_ROUTE}/logout`,
  logoutAll: `${BASE_AUTH_API_ROUTE}/logout-all`,
} as const;

export const BASE_USERS_API_ROUTE = '/users';

export const USERS_API_ROUTE = {
  me: `${BASE_USERS_API_ROUTE}/me`,
} as const;

export const BASE_CATEGORIES_API_ROUTE = '/categories';

export const CATEGORIES_API_ROUTE = {
  list: BASE_CATEGORIES_API_ROUTE,
} as const;

export const BASE_TRANSACTIONS_API_ROUTE = '/transactions';

export const TRANSACTIONS_API_ROUTE = {
  list: BASE_TRANSACTIONS_API_ROUTE,
  statistics: `${BASE_TRANSACTIONS_API_ROUTE}/statistics`,
  byId: (id: string) => `${BASE_TRANSACTIONS_API_ROUTE}/${id}`,
} as const;
