import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import {
  CreateTransactionDto,
  UpdateTransactionDto,
  TransactionResponseDto,
  TransactionQueryDto,
  TransactionListResponseDto,
  BalanceResponseDto,
  UserEntity,
} from '@track-my-money/api-shared';

import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get()
  async getTransactions(
    @CurrentUser() user: UserEntity,
    @Query() query: TransactionQueryDto,
  ): Promise<TransactionListResponseDto> {
    return this.transactionsService.getTransactions(user.id, query);
  }

  @Get('balance')
  async getBalance(
    @CurrentUser() user: UserEntity,
    @Query() query?: TransactionQueryDto,
  ): Promise<BalanceResponseDto> {
    return this.transactionsService.getBalance(user.id, query);
  }

  @Get(':id')
  async getTransactionById(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
  ): Promise<TransactionResponseDto> {
    return this.transactionsService.getTransactionById(id, user.id);
  }

  @Post()
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
    @CurrentUser() user: UserEntity,
  ): Promise<TransactionResponseDto> {
    return this.transactionsService.createTransaction(
      user.id,
      createTransactionDto,
    );
  }

  @Patch(':id')
  async updateTransaction(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @CurrentUser() user: UserEntity,
  ): Promise<TransactionResponseDto> {
    return this.transactionsService.updateTransaction(
      id,
      user.id,
      updateTransactionDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTransaction(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
  ): Promise<void> {
    return this.transactionsService.deleteTransaction(id, user.id);
  }
}
