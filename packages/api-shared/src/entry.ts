// Re-export database types and enums
export {
  UserRole,
  Currency,
  CountryCode,
  TransactionType,
} from '@track-my-money/database';

// Auth exports
export type { UserEntity } from './auth/entities/user.entity';
export { SignupDto } from './auth/dto/signup.dto';
export { LoginDto } from './auth/dto/login.dto';
export { RefreshTokenDto } from './auth/dto/refresh-token.dto';
export { AuthResponseDto } from './auth/dto/auth-response.dto';

// Categories exports
export type { CategoryEntity } from './categories/entities/category.entity';
export { CreateCategoryDto } from './categories/dto/create-category.dto';
export { UpdateCategoryDto } from './categories/dto/update-category.dto';
export type { CategoryResponseDto } from './categories/dto/category-response.dto';

// Transactions exports
export type { TransactionEntity } from './transactions/entities/transaction.entity';
export { CreateTransactionDto } from './transactions/dto/create-transaction.dto';
export { UpdateTransactionDto } from './transactions/dto/update-transaction.dto';
export { TransactionQueryDto } from './transactions/dto/transaction-query.dto';
export type { TransactionResponseDto } from './transactions/dto/transaction-response.dto';
export type { TransactionListResponseDto } from './transactions/dto/transaction-list-response.dto';
export type { BalanceResponseDto } from './transactions/dto/balance-response.dto';
