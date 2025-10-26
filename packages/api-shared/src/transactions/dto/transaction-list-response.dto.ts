import { TransactionResponseDto } from './transaction-response.dto';

export interface TransactionListResponseDto {
  data: TransactionResponseDto[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
