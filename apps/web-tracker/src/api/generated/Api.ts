/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface SignupDto {
  /**
   * User email address
   * @example "user@example.com"
   */
  email: string;
  /**
   * User password (minimum 8 characters)
   * @minLength 8
   * @example "password123"
   */
  password: string;
  /**
   * User full name
   * @example "John Doe"
   */
  name: string;
}

export interface UserEntity {
  id: string;
  email: string;
  name: string;
  role: string;
  isEmailVerified: boolean;
  country: object | null;
  baseCurrency: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface AuthResponseDto {
  /**
   * JWT access token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  accessToken: string;
  /** User information */
  user: UserEntity;
}

export interface LoginDto {
  /**
   * User email address
   * @example "user@example.com"
   */
  email: string;
  /**
   * User password
   * @example "password123"
   */
  password: string;
}

export interface SubcategoryResponse {
  id: string;
  name: string;
  type: string;
  userId: string;
  parentCategoryId: string;
  /** @example [] */
  subcategories: string[];
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface CategoryResponseDto {
  id: string;
  name: string;
  type: CategoryResponseDtoTypeEnum;
  userId: string;
  parentCategoryId?: object;
  subcategories: SubcategoryResponse[];
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface CreateCategoryDto {
  /**
   * Category name
   * @example "Food"
   */
  name: string;
  /**
   * Transaction type
   * @example "EXPENSE"
   */
  type: CreateCategoryDtoTypeEnum;
  /**
   * Parent category ID (for subcategories)
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  parentCategoryId?: string;
}

export interface UpdateCategoryDto {
  /**
   * Category name
   * @example "Food & Dining"
   */
  name?: string;
  /**
   * Transaction type
   * @example "EXPENSE"
   */
  type?: UpdateCategoryDtoTypeEnum;
}

export interface TransactionResponseDto {
  id: string;
  amount: string;
  /** @format date-time */
  date: string;
  description: string;
  note?: object;
  currency: TransactionResponseDtoCurrencyEnum;
  type: TransactionResponseDtoTypeEnum;
  categoryId: string;
  subcategoryId?: object;
  userId: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface PaginationDto {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface TransactionListResponseDto {
  data: TransactionResponseDto[];
  pagination: PaginationDto;
}

export interface BalanceResponseDto {
  balance: string;
  income: string;
  expenses: string;
  currency: BalanceResponseDtoCurrencyEnum;
  transactionCount: number;
}

export interface CreateTransactionDto {
  /**
   * Transaction amount
   * @example 100.5
   */
  amount: number;
  /**
   * Transaction date
   * @format date-time
   * @example "2024-01-15T00:00:00.000Z"
   */
  date: string;
  /**
   * Transaction description
   * @example "Grocery shopping"
   */
  description: string;
  /**
   * Additional notes
   * @example "Weekly groceries"
   */
  note?: string;
  /**
   * Transaction currency
   * @example "USD"
   */
  currency?: CreateTransactionDtoCurrencyEnum;
  /**
   * Transaction type
   * @example "EXPENSE"
   */
  type: CreateTransactionDtoTypeEnum;
  /**
   * Category ID
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  categoryId: string;
  /**
   * Subcategory ID
   * @example "123e4567-e89b-12d3-a456-426614174001"
   */
  subcategoryId?: string;
}

export interface UpdateTransactionDto {
  /**
   * Transaction amount
   * @example 150.75
   */
  amount?: number;
  /**
   * Transaction date
   * @format date-time
   * @example "2024-01-20T00:00:00.000Z"
   */
  date?: string;
  /**
   * Transaction description
   * @example "Updated description"
   */
  description?: string;
  /**
   * Additional notes
   * @example "Updated notes"
   */
  note?: string;
  /**
   * Transaction currency
   * @example "USD"
   */
  currency?: UpdateTransactionDtoCurrencyEnum;
  /**
   * Transaction type
   * @example "EXPENSE"
   */
  type?: UpdateTransactionDtoTypeEnum;
  /**
   * Category ID
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  categoryId?: string;
  /**
   * Subcategory ID
   * @example "123e4567-e89b-12d3-a456-426614174001"
   */
  subcategoryId?: string;
}

export type CategoryResponseDtoTypeEnum = 'INCOME' | 'EXPENSE';

/**
 * Transaction type
 * @example "EXPENSE"
 */
export type CreateCategoryDtoTypeEnum = 'INCOME' | 'EXPENSE';

/**
 * Transaction type
 * @example "EXPENSE"
 */
export type UpdateCategoryDtoTypeEnum = 'INCOME' | 'EXPENSE';

export type TransactionResponseDtoCurrencyEnum =
  | 'UAH'
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'JPY'
  | 'CAD'
  | 'AUD'
  | 'CHF'
  | 'CNY'
  | 'SEK'
  | 'NOK'
  | 'DKK'
  | 'PLN'
  | 'CZK'
  | 'HUF'
  | 'RON'
  | 'BGN'
  | 'HRK'
  | 'RUB'
  | 'BRL'
  | 'MXN'
  | 'INR'
  | 'KRW'
  | 'SGD'
  | 'HKD'
  | 'NZD'
  | 'ZAR'
  | 'TRY'
  | 'ILS'
  | 'AED'
  | 'SAR'
  | 'QAR'
  | 'KWD'
  | 'BHD'
  | 'OMR'
  | 'JOD'
  | 'LBP'
  | 'EGP'
  | 'MAD'
  | 'TND'
  | 'DZD'
  | 'LYD'
  | 'SDG'
  | 'ETB'
  | 'KES'
  | 'UGX'
  | 'TZS'
  | 'ZMW'
  | 'BWP'
  | 'SZL'
  | 'LSL'
  | 'NAD'
  | 'MUR'
  | 'SCR'
  | 'KMF'
  | 'DJF'
  | 'ERN'
  | 'SOS'
  | 'SSP';

export type TransactionResponseDtoTypeEnum = 'INCOME' | 'EXPENSE';

export type BalanceResponseDtoCurrencyEnum =
  | 'UAH'
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'JPY'
  | 'CAD'
  | 'AUD'
  | 'CHF'
  | 'CNY'
  | 'SEK'
  | 'NOK'
  | 'DKK'
  | 'PLN'
  | 'CZK'
  | 'HUF'
  | 'RON'
  | 'BGN'
  | 'HRK'
  | 'RUB'
  | 'BRL'
  | 'MXN'
  | 'INR'
  | 'KRW'
  | 'SGD'
  | 'HKD'
  | 'NZD'
  | 'ZAR'
  | 'TRY'
  | 'ILS'
  | 'AED'
  | 'SAR'
  | 'QAR'
  | 'KWD'
  | 'BHD'
  | 'OMR'
  | 'JOD'
  | 'LBP'
  | 'EGP'
  | 'MAD'
  | 'TND'
  | 'DZD'
  | 'LYD'
  | 'SDG'
  | 'ETB'
  | 'KES'
  | 'UGX'
  | 'TZS'
  | 'ZMW'
  | 'BWP'
  | 'SZL'
  | 'LSL'
  | 'NAD'
  | 'MUR'
  | 'SCR'
  | 'KMF'
  | 'DJF'
  | 'ERN'
  | 'SOS'
  | 'SSP';

/**
 * Transaction currency
 * @example "USD"
 */
export type CreateTransactionDtoCurrencyEnum =
  | 'UAH'
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'JPY'
  | 'CAD'
  | 'AUD'
  | 'CHF'
  | 'CNY'
  | 'SEK'
  | 'NOK'
  | 'DKK'
  | 'PLN'
  | 'CZK'
  | 'HUF'
  | 'RON'
  | 'BGN'
  | 'HRK'
  | 'RUB'
  | 'BRL'
  | 'MXN'
  | 'INR'
  | 'KRW'
  | 'SGD'
  | 'HKD'
  | 'NZD'
  | 'ZAR'
  | 'TRY'
  | 'ILS'
  | 'AED'
  | 'SAR'
  | 'QAR'
  | 'KWD'
  | 'BHD'
  | 'OMR'
  | 'JOD'
  | 'LBP'
  | 'EGP'
  | 'MAD'
  | 'TND'
  | 'DZD'
  | 'LYD'
  | 'SDG'
  | 'ETB'
  | 'KES'
  | 'UGX'
  | 'TZS'
  | 'ZMW'
  | 'BWP'
  | 'SZL'
  | 'LSL'
  | 'NAD'
  | 'MUR'
  | 'SCR'
  | 'KMF'
  | 'DJF'
  | 'ERN'
  | 'SOS'
  | 'SSP';

/**
 * Transaction type
 * @example "EXPENSE"
 */
export type CreateTransactionDtoTypeEnum = 'INCOME' | 'EXPENSE';

/**
 * Transaction currency
 * @example "USD"
 */
export type UpdateTransactionDtoCurrencyEnum =
  | 'UAH'
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'JPY'
  | 'CAD'
  | 'AUD'
  | 'CHF'
  | 'CNY'
  | 'SEK'
  | 'NOK'
  | 'DKK'
  | 'PLN'
  | 'CZK'
  | 'HUF'
  | 'RON'
  | 'BGN'
  | 'HRK'
  | 'RUB'
  | 'BRL'
  | 'MXN'
  | 'INR'
  | 'KRW'
  | 'SGD'
  | 'HKD'
  | 'NZD'
  | 'ZAR'
  | 'TRY'
  | 'ILS'
  | 'AED'
  | 'SAR'
  | 'QAR'
  | 'KWD'
  | 'BHD'
  | 'OMR'
  | 'JOD'
  | 'LBP'
  | 'EGP'
  | 'MAD'
  | 'TND'
  | 'DZD'
  | 'LYD'
  | 'SDG'
  | 'ETB'
  | 'KES'
  | 'UGX'
  | 'TZS'
  | 'ZMW'
  | 'BWP'
  | 'SZL'
  | 'LSL'
  | 'NAD'
  | 'MUR'
  | 'SCR'
  | 'KMF'
  | 'DJF'
  | 'ERN'
  | 'SOS'
  | 'SSP';

/**
 * Transaction type
 * @example "EXPENSE"
 */
export type UpdateTransactionDtoTypeEnum = 'INCOME' | 'EXPENSE';

export interface AuthControllerVerifyEmailParams {
  /** Activation link ID */
  activationLinkId: string;
}

export interface CategoriesControllerGetCategoriesParams {
  /** Filter by transaction type */
  type?: TypeEnum;
}

/** Filter by transaction type */
export type TypeEnum = 'INCOME' | 'EXPENSE';

/** Filter by transaction type */
export type CategoriesControllerGetCategoriesParams1TypeEnum =
  | 'INCOME'
  | 'EXPENSE';

export interface CategoriesControllerGetCategoryByIdParams {
  /** Category ID */
  id: string;
}

export interface CategoriesControllerUpdateCategoryParams {
  /** Category ID */
  id: string;
}

export interface CategoriesControllerDeleteCategoryParams {
  /** Category ID */
  id: string;
}

export interface TransactionsControllerGetTransactionsParams {
  /**
   * Page number
   * @min 1
   * @example 1
   */
  page?: number;
  /**
   * Items per page
   * @min 1
   * @max 100
   * @example 10
   */
  limit?: number;
  /**
   * Sort field
   * @example "date"
   */
  sortBy?: SortByEnum;
  /**
   * Sort order
   * @example "desc"
   */
  sortOrder?: SortOrderEnum;
  /**
   * Filter by transaction type
   * @example "EXPENSE"
   */
  type?: TypeEnum1;
  /**
   * Filter by category ID
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  categoryId?: string;
  /**
   * Filter by subcategory ID
   * @example "123e4567-e89b-12d3-a456-426614174001"
   */
  subcategoryId?: string;
  /**
   * Start date filter (ISO date string)
   * @example "2024-01-01"
   */
  startDate?: string;
  /**
   * End date filter (ISO date string)
   * @example "2024-01-31"
   */
  endDate?: string;
  /**
   * Filter by currency
   * @example "USD"
   */
  currency?: CurrencyEnum;
}

/**
 * Sort field
 * @example "date"
 */
export type SortByEnum = 'date' | 'amount' | 'createdAt';

/**
 * Sort order
 * @example "desc"
 */
export type SortOrderEnum = 'asc' | 'desc';

/**
 * Filter by transaction type
 * @example "EXPENSE"
 */
export type TypeEnum1 = 'INCOME' | 'EXPENSE';

/**
 * Filter by currency
 * @example "USD"
 */
export type CurrencyEnum =
  | 'UAH'
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'JPY'
  | 'CAD'
  | 'AUD'
  | 'CHF'
  | 'CNY'
  | 'SEK'
  | 'NOK'
  | 'DKK'
  | 'PLN'
  | 'CZK'
  | 'HUF'
  | 'RON'
  | 'BGN'
  | 'HRK'
  | 'RUB'
  | 'BRL'
  | 'MXN'
  | 'INR'
  | 'KRW'
  | 'SGD'
  | 'HKD'
  | 'NZD'
  | 'ZAR'
  | 'TRY'
  | 'ILS'
  | 'AED'
  | 'SAR'
  | 'QAR'
  | 'KWD'
  | 'BHD'
  | 'OMR'
  | 'JOD'
  | 'LBP'
  | 'EGP'
  | 'MAD'
  | 'TND'
  | 'DZD'
  | 'LYD'
  | 'SDG'
  | 'ETB'
  | 'KES'
  | 'UGX'
  | 'TZS'
  | 'ZMW'
  | 'BWP'
  | 'SZL'
  | 'LSL'
  | 'NAD'
  | 'MUR'
  | 'SCR'
  | 'KMF'
  | 'DJF'
  | 'ERN'
  | 'SOS'
  | 'SSP';

/**
 * Sort field
 * @example "date"
 */
export type TransactionsControllerGetTransactionsParams1SortByEnum =
  | 'date'
  | 'amount'
  | 'createdAt';

/**
 * Sort order
 * @example "desc"
 */
export type TransactionsControllerGetTransactionsParams1SortOrderEnum =
  | 'asc'
  | 'desc';

/**
 * Filter by transaction type
 * @example "EXPENSE"
 */
export type TransactionsControllerGetTransactionsParams1TypeEnum =
  | 'INCOME'
  | 'EXPENSE';

/**
 * Filter by currency
 * @example "USD"
 */
export type TransactionsControllerGetTransactionsParams1CurrencyEnum =
  | 'UAH'
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'JPY'
  | 'CAD'
  | 'AUD'
  | 'CHF'
  | 'CNY'
  | 'SEK'
  | 'NOK'
  | 'DKK'
  | 'PLN'
  | 'CZK'
  | 'HUF'
  | 'RON'
  | 'BGN'
  | 'HRK'
  | 'RUB'
  | 'BRL'
  | 'MXN'
  | 'INR'
  | 'KRW'
  | 'SGD'
  | 'HKD'
  | 'NZD'
  | 'ZAR'
  | 'TRY'
  | 'ILS'
  | 'AED'
  | 'SAR'
  | 'QAR'
  | 'KWD'
  | 'BHD'
  | 'OMR'
  | 'JOD'
  | 'LBP'
  | 'EGP'
  | 'MAD'
  | 'TND'
  | 'DZD'
  | 'LYD'
  | 'SDG'
  | 'ETB'
  | 'KES'
  | 'UGX'
  | 'TZS'
  | 'ZMW'
  | 'BWP'
  | 'SZL'
  | 'LSL'
  | 'NAD'
  | 'MUR'
  | 'SCR'
  | 'KMF'
  | 'DJF'
  | 'ERN'
  | 'SOS'
  | 'SSP';

export interface TransactionsControllerGetBalanceParams {
  /**
   * Page number
   * @min 1
   * @example 1
   */
  page?: number;
  /**
   * Items per page
   * @min 1
   * @max 100
   * @example 10
   */
  limit?: number;
  /**
   * Sort field
   * @example "date"
   */
  sortBy?: SortByEnum1;
  /**
   * Sort order
   * @example "desc"
   */
  sortOrder?: SortOrderEnum1;
  /**
   * Filter by transaction type
   * @example "EXPENSE"
   */
  type?: TypeEnum2;
  /**
   * Filter by category ID
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  categoryId?: string;
  /**
   * Filter by subcategory ID
   * @example "123e4567-e89b-12d3-a456-426614174001"
   */
  subcategoryId?: string;
  /**
   * Start date filter (ISO date string)
   * @example "2024-01-01"
   */
  startDate?: string;
  /**
   * End date filter (ISO date string)
   * @example "2024-01-31"
   */
  endDate?: string;
  /**
   * Filter by currency
   * @example "USD"
   */
  currency?: CurrencyEnum1;
}

/**
 * Sort field
 * @example "date"
 */
export type SortByEnum1 = 'date' | 'amount' | 'createdAt';

/**
 * Sort order
 * @example "desc"
 */
export type SortOrderEnum1 = 'asc' | 'desc';

/**
 * Filter by transaction type
 * @example "EXPENSE"
 */
export type TypeEnum2 = 'INCOME' | 'EXPENSE';

/**
 * Filter by currency
 * @example "USD"
 */
export type CurrencyEnum1 =
  | 'UAH'
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'JPY'
  | 'CAD'
  | 'AUD'
  | 'CHF'
  | 'CNY'
  | 'SEK'
  | 'NOK'
  | 'DKK'
  | 'PLN'
  | 'CZK'
  | 'HUF'
  | 'RON'
  | 'BGN'
  | 'HRK'
  | 'RUB'
  | 'BRL'
  | 'MXN'
  | 'INR'
  | 'KRW'
  | 'SGD'
  | 'HKD'
  | 'NZD'
  | 'ZAR'
  | 'TRY'
  | 'ILS'
  | 'AED'
  | 'SAR'
  | 'QAR'
  | 'KWD'
  | 'BHD'
  | 'OMR'
  | 'JOD'
  | 'LBP'
  | 'EGP'
  | 'MAD'
  | 'TND'
  | 'DZD'
  | 'LYD'
  | 'SDG'
  | 'ETB'
  | 'KES'
  | 'UGX'
  | 'TZS'
  | 'ZMW'
  | 'BWP'
  | 'SZL'
  | 'LSL'
  | 'NAD'
  | 'MUR'
  | 'SCR'
  | 'KMF'
  | 'DJF'
  | 'ERN'
  | 'SOS'
  | 'SSP';

/**
 * Sort field
 * @example "date"
 */
export type TransactionsControllerGetBalanceParams1SortByEnum =
  | 'date'
  | 'amount'
  | 'createdAt';

/**
 * Sort order
 * @example "desc"
 */
export type TransactionsControllerGetBalanceParams1SortOrderEnum =
  | 'asc'
  | 'desc';

/**
 * Filter by transaction type
 * @example "EXPENSE"
 */
export type TransactionsControllerGetBalanceParams1TypeEnum =
  | 'INCOME'
  | 'EXPENSE';

/**
 * Filter by currency
 * @example "USD"
 */
export type TransactionsControllerGetBalanceParams1CurrencyEnum =
  | 'UAH'
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'JPY'
  | 'CAD'
  | 'AUD'
  | 'CHF'
  | 'CNY'
  | 'SEK'
  | 'NOK'
  | 'DKK'
  | 'PLN'
  | 'CZK'
  | 'HUF'
  | 'RON'
  | 'BGN'
  | 'HRK'
  | 'RUB'
  | 'BRL'
  | 'MXN'
  | 'INR'
  | 'KRW'
  | 'SGD'
  | 'HKD'
  | 'NZD'
  | 'ZAR'
  | 'TRY'
  | 'ILS'
  | 'AED'
  | 'SAR'
  | 'QAR'
  | 'KWD'
  | 'BHD'
  | 'OMR'
  | 'JOD'
  | 'LBP'
  | 'EGP'
  | 'MAD'
  | 'TND'
  | 'DZD'
  | 'LYD'
  | 'SDG'
  | 'ETB'
  | 'KES'
  | 'UGX'
  | 'TZS'
  | 'ZMW'
  | 'BWP'
  | 'SZL'
  | 'LSL'
  | 'NAD'
  | 'MUR'
  | 'SCR'
  | 'KMF'
  | 'DJF'
  | 'ERN'
  | 'SOS'
  | 'SSP';

export interface TransactionsControllerGetTransactionByIdParams {
  /** Transaction ID */
  id: string;
}

export interface TransactionsControllerUpdateTransactionParams {
  /** Transaction ID */
  id: string;
}

export interface TransactionsControllerDeleteTransactionParams {
  /** Transaction ID */
  id: string;
}

export namespace Auth {
  /**
   * No description
   * @tags auth
   * @name AuthControllerSignup
   * @summary Register a new user
   * @request POST:/auth/signup
   * @response `201` `AuthResponseDto` User successfully registered
   * @response `409` `void` User with this email already exists
   */
  export namespace AuthControllerSignup {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SignupDto;
    export type RequestHeaders = {};
    export type ResponseBody = AuthResponseDto;
  }

  /**
   * No description
   * @tags auth
   * @name AuthControllerLogin
   * @summary Login user
   * @request POST:/auth/login
   * @response `200` `AuthResponseDto` User successfully logged in
   * @response `401` `void` Invalid credentials
   */
  export namespace AuthControllerLogin {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LoginDto;
    export type RequestHeaders = {};
    export type ResponseBody = AuthResponseDto;
  }

  /**
   * No description
   * @tags auth
   * @name AuthControllerRefresh
   * @summary Refresh access token
   * @request POST:/auth/refresh
   * @response `200` `AuthResponseDto` Token successfully refreshed
   * @response `400` `void` Refresh token not provided
   * @response `401` `void` Invalid refresh token
   */
  export namespace AuthControllerRefresh {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AuthResponseDto;
  }

  /**
   * No description
   * @tags auth
   * @name AuthControllerLogout
   * @summary Logout user
   * @request POST:/auth/logout
   * @secure
   * @response `200` `void` User successfully logged out
   */
  export namespace AuthControllerLogout {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags auth
   * @name AuthControllerLogoutAll
   * @summary Logout user from all devices
   * @request POST:/auth/logout-all
   * @secure
   * @response `200` `void` User successfully logged out from all devices
   */
  export namespace AuthControllerLogoutAll {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags auth
   * @name AuthControllerGetProfile
   * @summary Get current user profile
   * @request GET:/auth/profile
   * @secure
   * @response `200` `UserEntity` User profile
   */
  export namespace AuthControllerGetProfile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UserEntity;
  }

  /**
   * No description
   * @tags auth
   * @name AuthControllerVerifyEmail
   * @summary Verify user email
   * @request GET:/auth/verify-email/{activationLinkId}
   * @response `200` `void` Email successfully verified
   * @response `400` `void` Invalid or expired activation link
   */
  export namespace AuthControllerVerifyEmail {
    export type RequestParams = {
      /** Activation link ID */
      activationLinkId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags auth
   * @name AuthControllerResendActivation
   * @summary Resend activation email
   * @request POST:/auth/resend-activation
   * @secure
   * @response `200` `void` Activation link sent successfully
   * @response `400` `void` Email is already verified
   */
  export namespace AuthControllerResendActivation {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}

export namespace Categories {
  /**
   * No description
   * @tags categories
   * @name CategoriesControllerGetCategories
   * @summary Get all categories
   * @request GET:/categories
   * @secure
   * @response `200` `(CategoryResponseDto)[]` List of categories
   */
  export namespace CategoriesControllerGetCategories {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Filter by transaction type */
      type?: CategoriesControllerGetCategoriesParams1TypeEnum;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CategoryResponseDto[];
  }

  /**
   * No description
   * @tags categories
   * @name CategoriesControllerCreateCategory
   * @summary Create a new category
   * @request POST:/categories
   * @secure
   * @response `201` `CategoryResponseDto` Category successfully created
   * @response `409` `void` Category with this name already exists
   */
  export namespace CategoriesControllerCreateCategory {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateCategoryDto;
    export type RequestHeaders = {};
    export type ResponseBody = CategoryResponseDto;
  }

  /**
   * No description
   * @tags categories
   * @name CategoriesControllerGetCategoryById
   * @summary Get category by ID
   * @request GET:/categories/{id}
   * @secure
   * @response `200` `CategoryResponseDto` Category details
   * @response `404` `void` Category not found
   */
  export namespace CategoriesControllerGetCategoryById {
    export type RequestParams = {
      /** Category ID */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CategoryResponseDto;
  }

  /**
   * No description
   * @tags categories
   * @name CategoriesControllerUpdateCategory
   * @summary Update category
   * @request PATCH:/categories/{id}
   * @secure
   * @response `200` `CategoryResponseDto` Category successfully updated
   * @response `400` `void` Invalid update request
   * @response `404` `void` Category not found
   */
  export namespace CategoriesControllerUpdateCategory {
    export type RequestParams = {
      /** Category ID */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateCategoryDto;
    export type RequestHeaders = {};
    export type ResponseBody = CategoryResponseDto;
  }

  /**
   * No description
   * @tags categories
   * @name CategoriesControllerDeleteCategory
   * @summary Delete category
   * @request DELETE:/categories/{id}
   * @secure
   * @response `204` `void` Category successfully deleted
   * @response `400` `void` Cannot delete category with associated transactions
   * @response `404` `void` Category not found
   */
  export namespace CategoriesControllerDeleteCategory {
    export type RequestParams = {
      /** Category ID */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}

export namespace Transactions {
  /**
   * No description
   * @tags transactions
   * @name TransactionsControllerGetTransactions
   * @summary Get all transactions
   * @request GET:/transactions
   * @secure
   * @response `200` `TransactionListResponseDto` List of transactions
   */
  export namespace TransactionsControllerGetTransactions {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Page number
       * @min 1
       * @example 1
       */
      page?: number;
      /**
       * Items per page
       * @min 1
       * @max 100
       * @example 10
       */
      limit?: number;
      /**
       * Sort field
       * @example "date"
       */
      sortBy?: TransactionsControllerGetTransactionsParams1SortByEnum;
      /**
       * Sort order
       * @example "desc"
       */
      sortOrder?: TransactionsControllerGetTransactionsParams1SortOrderEnum;
      /**
       * Filter by transaction type
       * @example "EXPENSE"
       */
      type?: TransactionsControllerGetTransactionsParams1TypeEnum;
      /**
       * Filter by category ID
       * @example "123e4567-e89b-12d3-a456-426614174000"
       */
      categoryId?: string;
      /**
       * Filter by subcategory ID
       * @example "123e4567-e89b-12d3-a456-426614174001"
       */
      subcategoryId?: string;
      /**
       * Start date filter (ISO date string)
       * @example "2024-01-01"
       */
      startDate?: string;
      /**
       * End date filter (ISO date string)
       * @example "2024-01-31"
       */
      endDate?: string;
      /**
       * Filter by currency
       * @example "USD"
       */
      currency?: TransactionsControllerGetTransactionsParams1CurrencyEnum;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TransactionListResponseDto;
  }

  /**
   * No description
   * @tags transactions
   * @name TransactionsControllerCreateTransaction
   * @summary Create a new transaction
   * @request POST:/transactions
   * @secure
   * @response `201` `TransactionResponseDto` Transaction successfully created
   * @response `400` `void` Invalid transaction data
   */
  export namespace TransactionsControllerCreateTransaction {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateTransactionDto;
    export type RequestHeaders = {};
    export type ResponseBody = TransactionResponseDto;
  }

  /**
   * No description
   * @tags transactions
   * @name TransactionsControllerGetBalance
   * @summary Get balance summary
   * @request GET:/transactions/balance
   * @secure
   * @response `200` `BalanceResponseDto` Balance summary
   */
  export namespace TransactionsControllerGetBalance {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Page number
       * @min 1
       * @example 1
       */
      page?: number;
      /**
       * Items per page
       * @min 1
       * @max 100
       * @example 10
       */
      limit?: number;
      /**
       * Sort field
       * @example "date"
       */
      sortBy?: TransactionsControllerGetBalanceParams1SortByEnum;
      /**
       * Sort order
       * @example "desc"
       */
      sortOrder?: TransactionsControllerGetBalanceParams1SortOrderEnum;
      /**
       * Filter by transaction type
       * @example "EXPENSE"
       */
      type?: TransactionsControllerGetBalanceParams1TypeEnum;
      /**
       * Filter by category ID
       * @example "123e4567-e89b-12d3-a456-426614174000"
       */
      categoryId?: string;
      /**
       * Filter by subcategory ID
       * @example "123e4567-e89b-12d3-a456-426614174001"
       */
      subcategoryId?: string;
      /**
       * Start date filter (ISO date string)
       * @example "2024-01-01"
       */
      startDate?: string;
      /**
       * End date filter (ISO date string)
       * @example "2024-01-31"
       */
      endDate?: string;
      /**
       * Filter by currency
       * @example "USD"
       */
      currency?: TransactionsControllerGetBalanceParams1CurrencyEnum;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BalanceResponseDto;
  }

  /**
   * No description
   * @tags transactions
   * @name TransactionsControllerGetTransactionById
   * @summary Get transaction by ID
   * @request GET:/transactions/{id}
   * @secure
   * @response `200` `TransactionResponseDto` Transaction details
   * @response `404` `void` Transaction not found
   */
  export namespace TransactionsControllerGetTransactionById {
    export type RequestParams = {
      /** Transaction ID */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TransactionResponseDto;
  }

  /**
   * No description
   * @tags transactions
   * @name TransactionsControllerUpdateTransaction
   * @summary Update transaction
   * @request PATCH:/transactions/{id}
   * @secure
   * @response `200` `TransactionResponseDto` Transaction successfully updated
   * @response `400` `void` Invalid update request
   * @response `404` `void` Transaction not found
   */
  export namespace TransactionsControllerUpdateTransaction {
    export type RequestParams = {
      /** Transaction ID */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateTransactionDto;
    export type RequestHeaders = {};
    export type ResponseBody = TransactionResponseDto;
  }

  /**
   * No description
   * @tags transactions
   * @name TransactionsControllerDeleteTransaction
   * @summary Delete transaction
   * @request DELETE:/transactions/{id}
   * @secure
   * @response `204` `void` Transaction successfully deleted
   * @response `404` `void` Transaction not found
   */
  export namespace TransactionsControllerDeleteTransaction {
    export type RequestParams = {
      /** Transaction ID */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  JsonApi = 'application/vnd.api+json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => 'undefined' !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string'
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === 'undefined' || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Track My Money API
 * @version 1.0
 * @contact
 *
 * API documentation for Track My Money application
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags app
   * @name AppControllerGetHello
   * @summary Health check endpoint
   * @request GET:/
   * @response `200` `void` API is running
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/`,
      method: 'GET',
      ...params,
    });

  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerSignup
     * @summary Register a new user
     * @request POST:/auth/signup
     * @response `201` `AuthResponseDto` User successfully registered
     * @response `409` `void` User with this email already exists
     */
    authControllerSignup: (data: SignupDto, params: RequestParams = {}) =>
      this.http.request<AuthResponseDto, void>({
        path: `/auth/signup`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLogin
     * @summary Login user
     * @request POST:/auth/login
     * @response `200` `AuthResponseDto` User successfully logged in
     * @response `401` `void` Invalid credentials
     */
    authControllerLogin: (data: LoginDto, params: RequestParams = {}) =>
      this.http.request<AuthResponseDto, void>({
        path: `/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerRefresh
     * @summary Refresh access token
     * @request POST:/auth/refresh
     * @response `200` `AuthResponseDto` Token successfully refreshed
     * @response `400` `void` Refresh token not provided
     * @response `401` `void` Invalid refresh token
     */
    authControllerRefresh: (params: RequestParams = {}) =>
      this.http.request<AuthResponseDto, void>({
        path: `/auth/refresh`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLogout
     * @summary Logout user
     * @request POST:/auth/logout
     * @secure
     * @response `200` `void` User successfully logged out
     */
    authControllerLogout: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/auth/logout`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLogoutAll
     * @summary Logout user from all devices
     * @request POST:/auth/logout-all
     * @secure
     * @response `200` `void` User successfully logged out from all devices
     */
    authControllerLogoutAll: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/auth/logout-all`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerGetProfile
     * @summary Get current user profile
     * @request GET:/auth/profile
     * @secure
     * @response `200` `UserEntity` User profile
     */
    authControllerGetProfile: (params: RequestParams = {}) =>
      this.http.request<UserEntity, any>({
        path: `/auth/profile`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerVerifyEmail
     * @summary Verify user email
     * @request GET:/auth/verify-email/{activationLinkId}
     * @response `200` `void` Email successfully verified
     * @response `400` `void` Invalid or expired activation link
     */
    authControllerVerifyEmail: (
      { activationLinkId, ...query }: AuthControllerVerifyEmailParams,
      params: RequestParams = {},
    ) =>
      this.http.request<void, void>({
        path: `/auth/verify-email/${activationLinkId}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerResendActivation
     * @summary Resend activation email
     * @request POST:/auth/resend-activation
     * @secure
     * @response `200` `void` Activation link sent successfully
     * @response `400` `void` Email is already verified
     */
    authControllerResendActivation: (params: RequestParams = {}) =>
      this.http.request<void, void>({
        path: `/auth/resend-activation`,
        method: 'POST',
        secure: true,
        ...params,
      }),
  };
  categories = {
    /**
     * No description
     *
     * @tags categories
     * @name CategoriesControllerGetCategories
     * @summary Get all categories
     * @request GET:/categories
     * @secure
     * @response `200` `(CategoryResponseDto)[]` List of categories
     */
    categoriesControllerGetCategories: (
      query: CategoriesControllerGetCategoriesParams,
      params: RequestParams = {},
    ) =>
      this.http.request<CategoryResponseDto[], any>({
        path: `/categories`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name CategoriesControllerCreateCategory
     * @summary Create a new category
     * @request POST:/categories
     * @secure
     * @response `201` `CategoryResponseDto` Category successfully created
     * @response `409` `void` Category with this name already exists
     */
    categoriesControllerCreateCategory: (
      data: CreateCategoryDto,
      params: RequestParams = {},
    ) =>
      this.http.request<CategoryResponseDto, void>({
        path: `/categories`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name CategoriesControllerGetCategoryById
     * @summary Get category by ID
     * @request GET:/categories/{id}
     * @secure
     * @response `200` `CategoryResponseDto` Category details
     * @response `404` `void` Category not found
     */
    categoriesControllerGetCategoryById: (
      { id, ...query }: CategoriesControllerGetCategoryByIdParams,
      params: RequestParams = {},
    ) =>
      this.http.request<CategoryResponseDto, void>({
        path: `/categories/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name CategoriesControllerUpdateCategory
     * @summary Update category
     * @request PATCH:/categories/{id}
     * @secure
     * @response `200` `CategoryResponseDto` Category successfully updated
     * @response `400` `void` Invalid update request
     * @response `404` `void` Category not found
     */
    categoriesControllerUpdateCategory: (
      { id, ...query }: CategoriesControllerUpdateCategoryParams,
      data: UpdateCategoryDto,
      params: RequestParams = {},
    ) =>
      this.http.request<CategoryResponseDto, void>({
        path: `/categories/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name CategoriesControllerDeleteCategory
     * @summary Delete category
     * @request DELETE:/categories/{id}
     * @secure
     * @response `204` `void` Category successfully deleted
     * @response `400` `void` Cannot delete category with associated transactions
     * @response `404` `void` Category not found
     */
    categoriesControllerDeleteCategory: (
      { id, ...query }: CategoriesControllerDeleteCategoryParams,
      params: RequestParams = {},
    ) =>
      this.http.request<void, void>({
        path: `/categories/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
  transactions = {
    /**
     * No description
     *
     * @tags transactions
     * @name TransactionsControllerGetTransactions
     * @summary Get all transactions
     * @request GET:/transactions
     * @secure
     * @response `200` `TransactionListResponseDto` List of transactions
     */
    transactionsControllerGetTransactions: (
      query: TransactionsControllerGetTransactionsParams,
      params: RequestParams = {},
    ) =>
      this.http.request<TransactionListResponseDto, any>({
        path: `/transactions`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags transactions
     * @name TransactionsControllerCreateTransaction
     * @summary Create a new transaction
     * @request POST:/transactions
     * @secure
     * @response `201` `TransactionResponseDto` Transaction successfully created
     * @response `400` `void` Invalid transaction data
     */
    transactionsControllerCreateTransaction: (
      data: CreateTransactionDto,
      params: RequestParams = {},
    ) =>
      this.http.request<TransactionResponseDto, void>({
        path: `/transactions`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags transactions
     * @name TransactionsControllerGetBalance
     * @summary Get balance summary
     * @request GET:/transactions/balance
     * @secure
     * @response `200` `BalanceResponseDto` Balance summary
     */
    transactionsControllerGetBalance: (
      query: TransactionsControllerGetBalanceParams,
      params: RequestParams = {},
    ) =>
      this.http.request<BalanceResponseDto, any>({
        path: `/transactions/balance`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags transactions
     * @name TransactionsControllerGetTransactionById
     * @summary Get transaction by ID
     * @request GET:/transactions/{id}
     * @secure
     * @response `200` `TransactionResponseDto` Transaction details
     * @response `404` `void` Transaction not found
     */
    transactionsControllerGetTransactionById: (
      { id, ...query }: TransactionsControllerGetTransactionByIdParams,
      params: RequestParams = {},
    ) =>
      this.http.request<TransactionResponseDto, void>({
        path: `/transactions/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags transactions
     * @name TransactionsControllerUpdateTransaction
     * @summary Update transaction
     * @request PATCH:/transactions/{id}
     * @secure
     * @response `200` `TransactionResponseDto` Transaction successfully updated
     * @response `400` `void` Invalid update request
     * @response `404` `void` Transaction not found
     */
    transactionsControllerUpdateTransaction: (
      { id, ...query }: TransactionsControllerUpdateTransactionParams,
      data: UpdateTransactionDto,
      params: RequestParams = {},
    ) =>
      this.http.request<TransactionResponseDto, void>({
        path: `/transactions/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags transactions
     * @name TransactionsControllerDeleteTransaction
     * @summary Delete transaction
     * @request DELETE:/transactions/{id}
     * @secure
     * @response `204` `void` Transaction successfully deleted
     * @response `404` `void` Transaction not found
     */
    transactionsControllerDeleteTransaction: (
      { id, ...query }: TransactionsControllerDeleteTransactionParams,
      params: RequestParams = {},
    ) =>
      this.http.request<void, void>({
        path: `/transactions/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
}
