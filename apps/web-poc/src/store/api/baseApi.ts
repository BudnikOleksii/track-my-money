import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../index';

export const baseQuery = fetchBaseQuery({
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
