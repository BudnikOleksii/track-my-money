import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { Transaction, Prisma, Currency } from '@track-my-money/database';

import {
  CreateTransactionDto,
  UpdateTransactionDto,
  TransactionResponseDto,
  TransactionQueryDto,
  TransactionListResponseDto,
  BalanceResponseDto,
} from './dto';
import { TransactionsRepository } from './transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async getTransactions(
    userId: string,
    query: TransactionQueryDto,
  ): Promise<TransactionListResponseDto> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const sortBy = query.sortBy || 'date';
    const sortOrder = query.sortOrder || 'desc';

    const orderBy: Prisma.TransactionOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const [transactions, total] = await Promise.all([
      this.transactionsRepository.findTransactionsByUserId(userId, {
        ...query,
        skip,
        take: limit,
        orderBy,
      }),
      this.transactionsRepository.countTransactionsByUserId(userId, query),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: transactions.map(this.mapToResponseDto),
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  async getTransactionById(
    id: string,
    userId: string,
  ): Promise<TransactionResponseDto> {
    const transaction = await this.transactionsRepository.findTransactionById(
      id,
      userId,
    );

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return this.mapToResponseDto(transaction);
  }

  async createTransaction(
    userId: string,
    dto: CreateTransactionDto,
  ): Promise<TransactionResponseDto> {
    const { amount, categoryId, subcategoryId, type } = dto;

    if (amount <= 0) {
      throw new BadRequestException('Amount must be a positive number');
    }

    await this.transactionsRepository.validateCategory(
      categoryId,
      userId,
      type,
    );

    if (subcategoryId) {
      await this.transactionsRepository.validateSubcategory(
        subcategoryId,
        categoryId,
        userId,
      );
    }

    const transaction = await this.transactionsRepository.createTransaction({
      amount: new Prisma.Decimal(amount),
      date: dto.date,
      description: dto.description,
      note: dto.note,
      currency: dto.currency || Currency.USD,
      type,
      user: { connect: { id: userId } },
      category: { connect: { id: categoryId } },
      ...(subcategoryId && {
        subcategory: { connect: { id: subcategoryId } },
      }),
    });

    return this.mapToResponseDto(transaction);
  }

  async updateTransaction(
    id: string,
    userId: string,
    dto: UpdateTransactionDto,
  ): Promise<TransactionResponseDto> {
    // Check if transaction exists
    const existing = await this.transactionsRepository.findTransactionById(
      id,
      userId,
    );

    if (!existing) {
      throw new NotFoundException('Transaction not found');
    }

    if (dto.amount !== undefined && dto.amount <= 0) {
      throw new BadRequestException('Amount must be a positive number');
    }

    if (dto.categoryId && dto.type) {
      await this.transactionsRepository.validateCategory(
        dto.categoryId,
        userId,
        dto.type,
      );
    } else if (dto.categoryId) {
      await this.transactionsRepository.validateCategory(
        dto.categoryId,
        userId,
        existing.type,
      );
    }

    if (dto.subcategoryId && (dto.categoryId || existing.categoryId)) {
      const categoryId = dto.categoryId || existing.categoryId;
      await this.transactionsRepository.validateSubcategory(
        dto.subcategoryId,
        categoryId,
        userId,
      );
    }

    const updateData: Prisma.TransactionUpdateInput = {};

    if (dto.amount !== undefined) {
      updateData.amount = new Prisma.Decimal(dto.amount);
    }
    if (dto.date !== undefined) {
      updateData.date = dto.date;
    }
    if (dto.description !== undefined) {
      updateData.description = dto.description;
    }
    if (dto.note !== undefined) {
      updateData.note = dto.note;
    }
    if (dto.currency !== undefined) {
      updateData.currency = dto.currency as Currency;
    }
    if (dto.type !== undefined) {
      updateData.type = dto.type;
    }
    if (dto.categoryId !== undefined) {
      updateData.category = { connect: { id: dto.categoryId } };
    }
    if (dto.subcategoryId !== undefined) {
      updateData.subcategory = dto.subcategoryId
        ? { connect: { id: dto.subcategoryId } }
        : { disconnect: true };
    }

    const updated = await this.transactionsRepository.updateTransaction(
      id,
      userId,
      updateData,
    );

    return this.mapToResponseDto(updated);
  }

  async deleteTransaction(id: string, userId: string): Promise<void> {
    await this.transactionsRepository.deleteTransaction(id, userId);
  }

  async getBalance(
    userId: string,
    query?: TransactionQueryDto,
  ): Promise<BalanceResponseDto> {
    const { income, expenses, balance, count, currency } =
      await this.transactionsRepository.calculateBalance(userId, query);

    return {
      balance: balance.toString(),
      income: income.toString(),
      expenses: expenses.toString(),
      currency,
      transactionCount: count,
    };
  }

  private mapToResponseDto(transaction: Transaction): TransactionResponseDto {
    return {
      id: transaction.id,
      amount: transaction.amount.toString(),
      date: transaction.date,
      description: transaction.description,
      note: transaction.note,
      currency: transaction.currency,
      type: transaction.type,
      categoryId: transaction.categoryId,
      subcategoryId: transaction.subcategoryId,
      userId: transaction.userId,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };
  }
}
