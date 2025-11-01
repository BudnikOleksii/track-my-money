import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import type { AuthResponseDto } from '@track-my-money/api-shared';

import type { RootState } from '@/store';

const mutex = new Mutex();

const baseQueryWithoutInterceptor = fetchBaseQuery({
  baseUrl: String(import.meta.env.VITE_API_URL),
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state: RootState = getState() as any;
    const token = state.auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQueryWithoutInterceptor(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQueryWithoutInterceptor(
          {
            url: '/auth/refresh',
            method: 'POST',
          },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          const authData = refreshResult.data as AuthResponseDto;

          api.dispatch({
            type: 'auth/setCredentials',
            payload: {
              user: authData.user,
              accessToken: authData.accessToken,
            },
          });

          result = await baseQueryWithoutInterceptor(args, api, extraOptions);
        } else {
          api.dispatch({ type: 'auth/logout' });
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();

      result = await baseQueryWithoutInterceptor(args, api, extraOptions);
    }
  }

  return result;
};
