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

export enum TransactionStatisticsGroupBy {
  Category = 'category',
  Currency = 'currency',
  Month = 'month',
  Year = 'year',
}

/** Transaction type */
export enum TransactionType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
}

/** User role */
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

/** Base currency code */
export enum CurrencyCode {
  AED = 'AED',
  AFN = 'AFN',
  ALL = 'ALL',
  AMD = 'AMD',
  ANG = 'ANG',
  AOA = 'AOA',
  ARS = 'ARS',
  AUD = 'AUD',
  AWG = 'AWG',
  AZN = 'AZN',
  BAM = 'BAM',
  BBD = 'BBD',
  BDT = 'BDT',
  BGN = 'BGN',
  BHD = 'BHD',
  BIF = 'BIF',
  BMD = 'BMD',
  BND = 'BND',
  BOB = 'BOB',
  BRL = 'BRL',
  BSD = 'BSD',
  BTN = 'BTN',
  BWP = 'BWP',
  BYN = 'BYN',
  BZD = 'BZD',
  CAD = 'CAD',
  CDF = 'CDF',
  CHF = 'CHF',
  CLP = 'CLP',
  CNY = 'CNY',
  COP = 'COP',
  CRC = 'CRC',
  CUP = 'CUP',
  CVE = 'CVE',
  CZK = 'CZK',
  DJF = 'DJF',
  DKK = 'DKK',
  DOP = 'DOP',
  DZD = 'DZD',
  EGP = 'EGP',
  ERN = 'ERN',
  ETB = 'ETB',
  EUR = 'EUR',
  FJD = 'FJD',
  FKP = 'FKP',
  GBP = 'GBP',
  GEL = 'GEL',
  GHS = 'GHS',
  GIP = 'GIP',
  GMD = 'GMD',
  GNF = 'GNF',
  GTQ = 'GTQ',
  GYD = 'GYD',
  HKD = 'HKD',
  HNL = 'HNL',
  HRK = 'HRK',
  HTG = 'HTG',
  HUF = 'HUF',
  IDR = 'IDR',
  ILS = 'ILS',
  INR = 'INR',
  IQD = 'IQD',
  IRR = 'IRR',
  ISK = 'ISK',
  JMD = 'JMD',
  JOD = 'JOD',
  JPY = 'JPY',
  KES = 'KES',
  KGS = 'KGS',
  KHR = 'KHR',
  KMF = 'KMF',
  KPW = 'KPW',
  KRW = 'KRW',
  KWD = 'KWD',
  KYD = 'KYD',
  KZT = 'KZT',
  LAK = 'LAK',
  LBP = 'LBP',
  LKR = 'LKR',
  LRD = 'LRD',
  LSL = 'LSL',
  LYD = 'LYD',
  MAD = 'MAD',
  MDL = 'MDL',
  MGA = 'MGA',
  MKD = 'MKD',
  MMK = 'MMK',
  MNT = 'MNT',
  MOP = 'MOP',
  MRU = 'MRU',
  MUR = 'MUR',
  MVR = 'MVR',
  MWK = 'MWK',
  MXN = 'MXN',
  MYR = 'MYR',
  MZN = 'MZN',
  NAD = 'NAD',
  NGN = 'NGN',
  NIO = 'NIO',
  NOK = 'NOK',
  NPR = 'NPR',
  NZD = 'NZD',
  OMR = 'OMR',
  PAB = 'PAB',
  PEN = 'PEN',
  PGK = 'PGK',
  PHP = 'PHP',
  PKR = 'PKR',
  PLN = 'PLN',
  PYG = 'PYG',
  QAR = 'QAR',
  RON = 'RON',
  RSD = 'RSD',
  RUB = 'RUB',
  RWF = 'RWF',
  SAR = 'SAR',
  SBD = 'SBD',
  SCR = 'SCR',
  SDG = 'SDG',
  SEK = 'SEK',
  SGD = 'SGD',
  SHP = 'SHP',
  SLE = 'SLE',
  SLL = 'SLL',
  SOS = 'SOS',
  SRD = 'SRD',
  SSP = 'SSP',
  STN = 'STN',
  SYP = 'SYP',
  SZL = 'SZL',
  THB = 'THB',
  TJS = 'TJS',
  TMT = 'TMT',
  TND = 'TND',
  TOP = 'TOP',
  TRY = 'TRY',
  TTD = 'TTD',
  TWD = 'TWD',
  TZS = 'TZS',
  UAH = 'UAH',
  UGX = 'UGX',
  USD = 'USD',
  UYU = 'UYU',
  UZS = 'UZS',
  VES = 'VES',
  VND = 'VND',
  VUV = 'VUV',
  WST = 'WST',
  XAF = 'XAF',
  XCD = 'XCD',
  XDR = 'XDR',
  XOF = 'XOF',
  XPF = 'XPF',
  YER = 'YER',
  ZAR = 'ZAR',
  ZMW = 'ZMW',
  ZWL = 'ZWL',
}

/** Country code */
export enum CountryCode {
  AD = 'AD',
  AE = 'AE',
  AF = 'AF',
  AG = 'AG',
  AI = 'AI',
  AL = 'AL',
  AM = 'AM',
  AO = 'AO',
  AQ = 'AQ',
  AR = 'AR',
  AS = 'AS',
  AT = 'AT',
  AU = 'AU',
  AW = 'AW',
  AX = 'AX',
  AZ = 'AZ',
  BA = 'BA',
  BB = 'BB',
  BD = 'BD',
  BE = 'BE',
  BF = 'BF',
  BG = 'BG',
  BH = 'BH',
  BI = 'BI',
  BJ = 'BJ',
  BL = 'BL',
  BM = 'BM',
  BN = 'BN',
  BO = 'BO',
  BQ = 'BQ',
  BR = 'BR',
  BS = 'BS',
  BT = 'BT',
  BV = 'BV',
  BW = 'BW',
  BY = 'BY',
  BZ = 'BZ',
  CA = 'CA',
  CC = 'CC',
  CD = 'CD',
  CF = 'CF',
  CG = 'CG',
  CH = 'CH',
  CI = 'CI',
  CK = 'CK',
  CL = 'CL',
  CM = 'CM',
  CN = 'CN',
  CO = 'CO',
  CR = 'CR',
  CU = 'CU',
  CV = 'CV',
  CW = 'CW',
  CX = 'CX',
  CY = 'CY',
  CZ = 'CZ',
  DE = 'DE',
  DJ = 'DJ',
  DK = 'DK',
  DM = 'DM',
  DO = 'DO',
  DZ = 'DZ',
  EC = 'EC',
  EE = 'EE',
  EG = 'EG',
  EH = 'EH',
  ER = 'ER',
  ES = 'ES',
  ET = 'ET',
  FI = 'FI',
  FJ = 'FJ',
  FK = 'FK',
  FM = 'FM',
  FO = 'FO',
  FR = 'FR',
  GA = 'GA',
  GB = 'GB',
  GD = 'GD',
  GE = 'GE',
  GF = 'GF',
  GG = 'GG',
  GH = 'GH',
  GI = 'GI',
  GL = 'GL',
  GM = 'GM',
  GN = 'GN',
  GP = 'GP',
  GQ = 'GQ',
  GR = 'GR',
  GS = 'GS',
  GT = 'GT',
  GU = 'GU',
  GW = 'GW',
  GY = 'GY',
  HK = 'HK',
  HM = 'HM',
  HN = 'HN',
  HR = 'HR',
  HT = 'HT',
  HU = 'HU',
  ID = 'ID',
  IE = 'IE',
  IL = 'IL',
  IM = 'IM',
  IN = 'IN',
  IO = 'IO',
  IQ = 'IQ',
  IR = 'IR',
  IS = 'IS',
  IT = 'IT',
  JE = 'JE',
  JM = 'JM',
  JO = 'JO',
  JP = 'JP',
  KE = 'KE',
  KG = 'KG',
  KH = 'KH',
  KI = 'KI',
  KM = 'KM',
  KN = 'KN',
  KP = 'KP',
  KR = 'KR',
  KW = 'KW',
  KY = 'KY',
  KZ = 'KZ',
  LA = 'LA',
  LB = 'LB',
  LC = 'LC',
  LI = 'LI',
  LK = 'LK',
  LR = 'LR',
  LS = 'LS',
  LT = 'LT',
  LU = 'LU',
  LV = 'LV',
  LY = 'LY',
  MA = 'MA',
  MC = 'MC',
  MD = 'MD',
  ME = 'ME',
  MF = 'MF',
  MG = 'MG',
  MH = 'MH',
  MK = 'MK',
  ML = 'ML',
  MM = 'MM',
  MN = 'MN',
  MO = 'MO',
  MP = 'MP',
  MQ = 'MQ',
  MR = 'MR',
  MS = 'MS',
  MT = 'MT',
  MU = 'MU',
  MV = 'MV',
  MW = 'MW',
  MX = 'MX',
  MY = 'MY',
  MZ = 'MZ',
  NA = 'NA',
  NC = 'NC',
  NE = 'NE',
  NF = 'NF',
  NG = 'NG',
  NI = 'NI',
  NL = 'NL',
  NO = 'NO',
  NP = 'NP',
  NR = 'NR',
  NU = 'NU',
  NZ = 'NZ',
  OM = 'OM',
  PA = 'PA',
  PE = 'PE',
  PF = 'PF',
  PG = 'PG',
  PH = 'PH',
  PK = 'PK',
  PL = 'PL',
  PM = 'PM',
  PN = 'PN',
  PR = 'PR',
  PS = 'PS',
  PT = 'PT',
  PW = 'PW',
  PY = 'PY',
  QA = 'QA',
  RE = 'RE',
  RO = 'RO',
  RS = 'RS',
  RU = 'RU',
  RW = 'RW',
  SA = 'SA',
  SB = 'SB',
  SC = 'SC',
  SD = 'SD',
  SE = 'SE',
  SG = 'SG',
  SH = 'SH',
  SI = 'SI',
  SJ = 'SJ',
  SK = 'SK',
  SL = 'SL',
  SM = 'SM',
  SN = 'SN',
  SO = 'SO',
  SR = 'SR',
  SS = 'SS',
  ST = 'ST',
  SV = 'SV',
  SX = 'SX',
  SY = 'SY',
  SZ = 'SZ',
  TC = 'TC',
  TD = 'TD',
  TF = 'TF',
  TG = 'TG',
  TH = 'TH',
  TJ = 'TJ',
  TK = 'TK',
  TL = 'TL',
  TM = 'TM',
  TN = 'TN',
  TO = 'TO',
  TR = 'TR',
  TT = 'TT',
  TV = 'TV',
  TW = 'TW',
  TZ = 'TZ',
  UA = 'UA',
  UG = 'UG',
  UM = 'UM',
  US = 'US',
  UY = 'UY',
  UZ = 'UZ',
  VA = 'VA',
  VC = 'VC',
  VE = 'VE',
  VG = 'VG',
  VI = 'VI',
  VN = 'VN',
  VU = 'VU',
  WF = 'WF',
  WS = 'WS',
  YE = 'YE',
  YT = 'YT',
  ZA = 'ZA',
  ZM = 'ZM',
  ZW = 'ZW',
}

export interface RegisterDto {
  /**
   * User email address
   * @example "user@example.com"
   */
  email: string;
  /**
   * User password
   * @minLength 8
   * @example "SecurePass123!"
   */
  password: string;
  /**
   * Country code
   * @example "US"
   */
  countryCode?: CountryCode;
  /**
   * Base currency code
   * @example "USD"
   */
  baseCurrencyCode?: CurrencyCode;
}

export interface UserResponseDto {
  /**
   * User ID
   * @format uuid
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  id: string;
  /**
   * User email address
   * @example "user@example.com"
   */
  email: string;
  /**
   * Whether the email is verified
   * @example true
   */
  emailVerified: boolean;
  /**
   * Country code
   * @example "US"
   */
  countryCode: CountryCode | null;
  /**
   * Base currency code
   * @example "USD"
   */
  baseCurrencyCode: CurrencyCode | null;
  /**
   * User role
   * @example "USER"
   */
  role: UserRole;
  /**
   * Creation date
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  createdAt: string;
  /**
   * Last update date
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  updatedAt: string;
}

export interface VerifyEmailDto {
  /**
   * Email verification token
   * @example "abc123def456ghi789"
   */
  token: string;
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

export interface AuthResponseDto {
  /**
   * JWT access token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
   */
  accessToken: string;
  /** User information */
  user: UserResponseDto;
}

export interface UpdateUserDto {
  /**
   * Country code
   * @example "US"
   */
  countryCode?: CountryCode;
  /**
   * Base currency code
   * @example "USD"
   */
  baseCurrencyCode?: CurrencyCode;
}

export interface UpdateRoleDto {
  /**
   * User role
   * @example "USER"
   */
  role: UserRole;
}

export interface CreateCategoryDto {
  /**
   * Category name
   * @minLength 1
   * @maxLength 100
   * @example "Groceries"
   */
  name: string;
  /**
   * Transaction type
   * @example "EXPENSE"
   */
  type: TransactionType;
  /**
   * Parent category ID (for subcategories)
   * @format uuid
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  parentCategoryId?: object;
}

export interface CategoryResponseDto {
  /**
   * Category ID
   * @format uuid
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  id: string;
  /**
   * Category name
   * @example "Groceries"
   */
  name: string;
  /**
   * Transaction type
   * @example "EXPENSE"
   */
  type: TransactionType;
  /**
   * Parent category ID
   * @format uuid
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  parentCategoryId: object | null;
  /** Parent category */
  parentCategory: CategoryResponseDto | null;
  /** Subcategories */
  subcategories: CategoryResponseDto[];
  /**
   * Creation date
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  createdAt: string;
  /**
   * Last update date
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  updatedAt: string;
}

export interface UpdateCategoryDto {
  /**
   * Category name
   * @minLength 1
   * @maxLength 100
   * @example "Groceries"
   */
  name: string;
  /**
   * Transaction type
   * @example "EXPENSE"
   */
  type: TransactionType;
  /**
   * Parent category ID (for subcategories)
   * @format uuid
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  parentCategoryId?: object;
}

export interface CreateTransactionDto {
  /**
   * Category ID
   * @format uuid
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  categoryId: string;
  /**
   * Transaction type
   * @example "EXPENSE"
   */
  type: TransactionType;
  /**
   * Transaction amount as a positive number
   * @example 100.5
   */
  amount: number;
  /**
   * Currency code
   * @example "USD"
   */
  currencyCode: CurrencyCode;
  /**
   * Transaction date
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  date: string;
  /**
   * Transaction description
   * @maxLength 500
   * @example "Grocery shopping at supermarket"
   */
  description?: object;
}

export interface TransactionResponseDto {
  /**
   * Transaction ID
   * @format uuid
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  id: string;
  /**
   * Category ID
   * @format uuid
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  categoryId: string;
  /**
   * Transaction type
   * @example "EXPENSE"
   */
  type: TransactionType;
  /**
   * Transaction amount
   * @example "100.50"
   */
  amount: string;
  /**
   * Currency code
   * @example "USD"
   */
  currencyCode: CurrencyCode;
  /**
   * Transaction date
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  date: string;
  /**
   * Transaction description
   * @example "Grocery shopping at supermarket"
   */
  description: object | null;
  /**
   * Creation date
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  createdAt: string;
  /**
   * Last update date
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  updatedAt: string;
  /** Category information */
  category: CategoryResponseDto;
}

export interface PaginatedResponseDto {
  data: any[][];
  /** Total number of items */
  total: number;
  /** Current page number */
  page: number;
  /** Items per page */
  limit: number;
}

export interface TransactionStatisticsGroupDataDto {
  /**
   * Group key (category name, currency, month, or year)
   * @example "Groceries"
   */
  key: string;
  /**
   * Total amount for this group
   * @example "1250.75"
   */
  totalAmount: string;
  /**
   * Number of transactions in this group
   * @example 45
   */
  transactionCount: number;
}

export interface TransactionStatisticsDateRangeDto {
  /**
   * Start date of the range
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  from: string | null;
  /**
   * End date of the range
   * @format date-time
   * @example "2024-12-31T23:59:59.999Z"
   */
  to: string | null;
}

export interface TransactionStatisticsResponseDto {
  /**
   * Total amount across all transactions
   * @example "12500.50"
   */
  totalAmount: string;
  /**
   * Total number of transactions
   * @example 150
   */
  transactionCount: number;
  /** Grouped statistics data */
  groupedData: TransactionStatisticsGroupDataDto[];
  /** Date range used for statistics */
  dateRange: TransactionStatisticsDateRangeDto;
}

export type UpdateTransactionDto = object;

export interface UsersControllerGetUserByIdParams {
  /** User UUID */
  id: string;
}

export interface UsersControllerUpdateUserRoleParams {
  /** User UUID */
  id: string;
}

export interface CategoriesControllerFindAllParams {
  /** Filter by transaction type */
  type?: TransactionType;
}

export interface CategoriesControllerFindOneParams {
  /** Category UUID */
  id: string;
}

export interface CategoriesControllerUpdateParams {
  /** Category UUID */
  id: string;
}

export interface CategoriesControllerRemoveParams {
  /** Category UUID */
  id: string;
}

export interface TransactionsControllerFindAllParams {
  /**
   * Start date (ISO 8601)
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  dateFrom?: string;
  /**
   * End date (ISO 8601)
   * @format date-time
   * @example "2024-12-31T23:59:59.999Z"
   */
  dateTo?: string;
  /** Filter by transaction type */
  type?: TransactionType;
  /**
   * Filter by category ID
   * @format uuid
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  categoryId?: string;
  /** Filter by currency code */
  currencyCode?: CurrencyCode;
  /**
   * Page number (default: 1)
   * @min 1
   * @example 1
   */
  page?: number;
  /**
   * Items per page (default: 10)
   * @min 1
   * @max 100
   * @example 10
   */
  limit?: number;
}

export interface TransactionsControllerGetStatisticsParams {
  /**
   * Start date (ISO 8601)
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  dateFrom?: string;
  /**
   * End date (ISO 8601)
   * @format date-time
   * @example "2024-12-31T23:59:59.999Z"
   */
  dateTo?: string;
  /** Filter by transaction type */
  type?: TransactionType;
  /** Filter by currency */
  currencyCode?: CurrencyCode;
  /** Group statistics by */
  groupBy?: TransactionStatisticsGroupBy;
}

export interface TransactionsControllerFindOneParams {
  /** Transaction UUID */
  id: string;
}

export interface TransactionsControllerUpdateParams {
  /** Transaction UUID */
  id: string;
}

export interface TransactionsControllerRemoveParams {
  /** Transaction UUID */
  id: string;
}
