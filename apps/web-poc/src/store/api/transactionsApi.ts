import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';
import type {
  TransactionResponseDto,
  CreateTransactionDto,
  UpdateTransactionDto,
  TransactionQueryDto,
  TransactionListResponseDto,
  BalanceResponseDto,
} from '@track-my-money/api-shared';

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery,
  tagTypes: ['Transaction'],
  endpoints: (builder) => ({
    getTransactions: builder.query<
      TransactionListResponseDto,
      TransactionQueryDto
    >({
      query: (params) => ({
        url: '/transactions',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: 'Transaction' as const,
                id,
              })),
              { type: 'Transaction', id: 'LIST' },
            ]
          : [{ type: 'Transaction', id: 'LIST' }],
    }),
    getTransactionById: builder.query<TransactionResponseDto, string>({
      query: (id) => `/transactions/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Transaction', id }],
    }),
    getBalance: builder.query<BalanceResponseDto, void>({
      query: () => '/transactions/balance',
      providesTags: [{ type: 'Transaction', id: 'BALANCE' }],
    }),
    createTransaction: builder.mutation<
      TransactionResponseDto,
      CreateTransactionDto
    >({
      query: (body) => ({
        url: '/transactions',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'Transaction', id: 'LIST' },
        { type: 'Transaction', id: 'BALANCE' },
      ],
    }),
    updateTransaction: builder.mutation<
      TransactionResponseDto,
      { id: string; data: UpdateTransactionDto }
    >({
      query: ({ id, data }) => ({
        url: `/transactions/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Transaction', id },
        { type: 'Transaction', id: 'LIST' },
        { type: 'Transaction', id: 'BALANCE' },
      ],
    }),
    deleteTransaction: builder.mutation<void, string>({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Transaction', id },
        { type: 'Transaction', id: 'LIST' },
        { type: 'Transaction', id: 'BALANCE' },
      ],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useGetBalanceQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi;
