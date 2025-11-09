import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import type { AuthResponseDto } from '@track-my-money/api-shared';

import type { RootState } from '@/app/store';
import { logout, setCredentials } from '@/app/store/slices/auth-slice';
import { HTTP_STATUS_CODE } from '@/app/constants/http-status-code';
import { AUTH_API_ROUTE } from '@/app/constants/api-routes';

const mutex = new Mutex();

const baseQueryWithoutInterceptor = fetchBaseQuery({
  baseUrl: String(process.env.NEXT_PUBLIC_API_URL),
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const state: RootState = getState() as RootState;
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

  if (result.error && result.error.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQueryWithoutInterceptor(
          {
            url: AUTH_API_ROUTE.refresh,
            method: 'POST',
          },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          const authData = refreshResult.data as AuthResponseDto;

          api.dispatch({
            type: setCredentials.type,
            payload: {
              user: authData.user,
              accessToken: authData.accessToken,
            },
          });

          result = await baseQueryWithoutInterceptor(args, api, extraOptions);
        } else {
          api.dispatch({ type: logout.type });
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
