import { createApi } from '@reduxjs/toolkit/query/react';

import type {
  RegisterDto,
  LoginDto,
  AuthResponseDto,
  UserResponseDto,
  UpdateUserDto,
} from '@/src/api/generated/Api';
import { AUTH_API_ROUTE, USERS_API_ROUTE } from '@/src/constants/api-routes';

import { baseQuery } from './base-api';
import { setCredentials, logout } from '../slices/auth-slice';
import type { RootState } from '../index';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponseDto, RegisterDto>({
      query: (body) => ({
        url: AUTH_API_ROUTE.register,
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
    getProfile: builder.query<UserResponseDto, unknown>({
      query: () => USERS_API_ROUTE.me,
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation<UserResponseDto, UpdateUserDto>({
      query: (body) => ({
        url: USERS_API_ROUTE.me,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
      async onQueryStarted(_arg, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          const state = getState() as RootState;
          const currentAuth = state.auth;
          if (currentAuth?.accessToken) {
            dispatch(
              setCredentials({
                user: data,
                accessToken: currentAuth.accessToken,
              }),
            );
          }
        } catch {
          // Handle error
        }
      },
    }),
    logoutAll: builder.mutation<unknown, unknown>({
      query: () => ({
        url: AUTH_API_ROUTE.logoutAll,
        method: 'POST',
      }),
      async onQueryStarted(_arg, { dispatch }) {
        dispatch(logout());
      },
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
  useUpdateProfileMutation,
  useLogoutAllMutation,
} = authApi;
