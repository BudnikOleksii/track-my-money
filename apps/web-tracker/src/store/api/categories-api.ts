import { createApi } from '@reduxjs/toolkit/query/react';

import type {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryResponseDto,
  TransactionType,
} from '@track-my-money/api-shared';

import { CATEGORIES_API_ROUTE } from '@/src/constants/api-routes';

import { baseQuery } from './base-api';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery,
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getCategories: builder.query<
      CategoryResponseDto[],
      TransactionType | undefined
    >({
      query: (type) => ({
        url: CATEGORIES_API_ROUTE.list,
        params: type ? { type } : undefined,
      }),
      providesTags: ['Category'],
    }),
    getCategoryById: builder.query<CategoryResponseDto, string>({
      query: (id) => `${CATEGORIES_API_ROUTE.list}/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Category', id }],
    }),
    createCategory: builder.mutation<CategoryResponseDto, CreateCategoryDto>({
      query: (body) => ({
        url: CATEGORIES_API_ROUTE.list,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation<
      CategoryResponseDto,
      { id: string; data: UpdateCategoryDto }
    >({
      query: ({ id, data }) => ({
        url: `${CATEGORIES_API_ROUTE.list}/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Category', id },
        'Category',
      ],
    }),
    deleteCategory: builder.mutation<undefined, string>({
      query: (id) => ({
        url: `${CATEGORIES_API_ROUTE.list}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useLazyGetCategoriesQuery,
  useLazyGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
