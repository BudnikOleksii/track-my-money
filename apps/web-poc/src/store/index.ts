import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { authApi } from './api/authApi';
import { transactionsApi } from './api/transactionsApi';
import { categoriesApi } from './api/categoriesApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    })
      .concat(authApi.middleware)
      .concat(transactionsApi.middleware)
      .concat(categoriesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
