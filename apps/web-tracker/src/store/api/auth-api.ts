import { createApi } from '@reduxjs/toolkit/query/react';

import type {
  SignupDto,
  LoginDto,
  AuthResponseDto,
  UserEntity,
} from '@track-my-money/api-shared';

import { AUTH_API_ROUTE } from '@/src/constants/api-routes';

import { baseQuery } from './base-api';
import { setCredentials, logout } from '../slices/auth-slice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponseDto, SignupDto>({
      query: (body) => ({
        url: AUTH_API_ROUTE.signup,
        method: 'POST',
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch {
          // Handle error
        }
      },
    }),
    login: builder.mutation<AuthResponseDto, LoginDto>({
      query: (body) => ({
        url: AUTH_API_ROUTE.login,
        method: 'POST',
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch {
          // Handle error
        }
      },
    }),
    refresh: builder.mutation<AuthResponseDto, undefined>({
      query: () => ({
        url: AUTH_API_ROUTE.refresh,
        method: 'POST',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch {
          dispatch(logout());
        }
      },
    }),
    logout: builder.mutation<unknown, unknown>({
      query: () => ({
        url: AUTH_API_ROUTE.logout,
        method: 'POST',
      }),
      async onQueryStarted(_arg, { dispatch }) {
        dispatch(logout());
      },
    }),
    getProfile: builder.query<UserEntity, unknown>({
      query: () => AUTH_API_ROUTE.profile,
      providesTags: ['User'],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
} = authApi;
