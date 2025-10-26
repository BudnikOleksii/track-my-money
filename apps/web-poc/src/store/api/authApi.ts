import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';
import type {
  SignupDto,
  LoginDto,
  AuthResponseDto,
  UserEntity,
} from '@track-my-money/api-shared';
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
        } catch (error) {
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
        } catch (error) {
          // Handle error
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_arg, { dispatch }) {
        dispatch(logout());
      },
    }),
    getProfile: builder.query<UserEntity, void>({
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
