import { createApi } from '@reduxjs/toolkit/query/react';

import type {
  SignupDto,
  LoginDto,
  AuthResponseDto,
  UserEntity,
} from '@track-my-money/api-shared';

import { baseQuery } from './baseApi';
import { setCredentials, logout } from '../authSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponseDto, SignupDto>({
      query: (body) => ({
        url: '/auth/signup',
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
        url: '/auth/login',
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
    logout: builder.mutation<unknown, unknown>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_arg, { dispatch }) {
        dispatch(logout());
      },
    }),
    getProfile: builder.query<UserEntity, unknown>({
      query: () => '/auth/profile',
      providesTags: ['User'],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
} = authApi;
