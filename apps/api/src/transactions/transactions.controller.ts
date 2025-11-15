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
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

import {
  CreateTransactionDto,
  UpdateTransactionDto,
  TransactionResponseDto,
  TransactionQueryDto,
  TransactionListResponseDto,
  BalanceResponseDto,
} from './dto';
import { UserEntity } from '../auth/entities/user.entity';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('transactions')
@ApiBearerAuth('JWT-auth')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({
    status: 200,
    description: 'List of transactions',
    type: TransactionListResponseDto,
  })
  async getTransactions(
    @CurrentUser() user: UserEntity,
    @Query() query: TransactionQueryDto,
  ): Promise<TransactionListResponseDto> {
    return this.transactionsService.getTransactions(user.id, query);
  }

  @Get('balance')
  @ApiOperation({ summary: 'Get balance summary' })
  @ApiResponse({
    status: 200,
    description: 'Balance summary',
    type: BalanceResponseDto,
  })
  async getBalance(
    @CurrentUser() user: UserEntity,
    @Query() query?: TransactionQueryDto,
  ): Promise<BalanceResponseDto> {
    return this.transactionsService.getBalance(user.id, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction by ID' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  @ApiResponse({
    status: 200,
    description: 'Transaction details',
    type: TransactionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  async getTransactionById(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
  ): Promise<TransactionResponseDto> {
    return this.transactionsService.getTransactionById(id, user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiBody({ type: CreateTransactionDto })
  @ApiResponse({
    status: 201,
    description: 'Transaction successfully created',
    type: TransactionResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid transaction data' })
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
  @ApiOperation({ summary: 'Update transaction' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  @ApiBody({ type: UpdateTransactionDto })
  @ApiResponse({
    status: 200,
    description: 'Transaction successfully updated',
    type: TransactionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  @ApiResponse({ status: 400, description: 'Invalid update request' })
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
  @ApiOperation({ summary: 'Delete transaction' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  @ApiResponse({ status: 204, description: 'Transaction successfully deleted' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  async deleteTransaction(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
  ): Promise<void> {
    return this.transactionsService.deleteTransaction(id, user.id);
  }
}
