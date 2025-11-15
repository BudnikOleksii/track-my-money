import { ApiProperty } from '@nestjs/swagger';

import { TransactionResponseDto } from './transaction-response.dto';

class PaginationDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  hasNextPage: boolean;

  @ApiProperty()
  hasPrevPage: boolean;
}

export class TransactionListResponseDto {
  @ApiProperty({ type: [TransactionResponseDto] })
  data: TransactionResponseDto[];

  @ApiProperty({ type: PaginationDto })
  pagination: PaginationDto;
}
