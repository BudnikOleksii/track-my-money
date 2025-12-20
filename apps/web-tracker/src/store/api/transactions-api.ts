import { createApi } from '@reduxjs/toolkit/query/react';

import type {
  CreateTransactionDto,
  UpdateTransactionDto,
  TransactionResponseDto,
  TransactionStatisticsResponseDto,
  TransactionsControllerFindAllParams,
  TransactionsControllerGetStatisticsParams,
  PaginatedResponseDto,
} from '@/src/api/generated/Api';
import { TRANSACTIONS_API_ROUTE } from '@/src/constants/api-routes';

import { baseQuery } from './base-api';

type PaginatedTransactionResponse = Omit<PaginatedResponseDto, 'data'> & {
  data: TransactionResponseDto[];
};

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery,
  tagTypes: ['Transaction'],
  endpoints: (builder) => ({
    getTransactions: builder.query<
      PaginatedTransactionResponse,
      TransactionsControllerFindAllParams | undefined
    >({
      query: (params) => ({
        url: TRANSACTIONS_API_ROUTE.list,
        params,
      }),
      providesTags: ['Transaction'],
    }),
    getTransactionById: builder.query<TransactionResponseDto, string>({
      query: (id) => TRANSACTIONS_API_ROUTE.byId(id),
      providesTags: (_result, _error, id) => [{ type: 'Transaction', id }],
    }),
    createTransaction: builder.mutation<
      TransactionResponseDto,
      CreateTransactionDto
    >({
      query: (body) => ({
        url: TRANSACTIONS_API_ROUTE.list,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Transaction'],
    }),
    updateTransaction: builder.mutation<
      TransactionResponseDto,
      { id: string; data: UpdateTransactionDto }
    >({
      query: ({ id, data }) => ({
        url: TRANSACTIONS_API_ROUTE.byId(id),
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Transaction', id },
        'Transaction',
      ],
    }),
    deleteTransaction: builder.mutation<undefined, string>({
      query: (id) => ({
        url: TRANSACTIONS_API_ROUTE.byId(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Transaction'],
    }),
    getStatistics: builder.query<
      TransactionStatisticsResponseDto,
      TransactionsControllerGetStatisticsParams | undefined
    >({
      query: (params) => ({
        url: TRANSACTIONS_API_ROUTE.statistics,
        params,
      }),
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useLazyGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useLazyGetTransactionByIdQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useGetStatisticsQuery,
  useLazyGetStatisticsQuery,
} = transactionsApi;
