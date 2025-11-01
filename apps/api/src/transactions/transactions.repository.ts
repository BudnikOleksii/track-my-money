import { Injectable, NotFoundException } from '@nestjs/common';

import {
  Transaction,
  TransactionType,
  Prisma,
  Currency,
} from '@track-my-money/database';

import { PrismaService } from '../prisma/prisma.service';

export interface TransactionQuery {
  type?: TransactionType;
  categoryId?: string;
  subcategoryId?: string;
  startDate?: string;
  endDate?: string;
  currency?: Currency;
}

@Injectable()
export class TransactionsRepository {
  constructor(private prisma: PrismaService) {}

  async findTransactionsByUserId(
    userId: string,
    query: TransactionQuery & {
      skip: number;
      take: number;
      orderBy: Prisma.TransactionOrderByWithRelationInput;
    },
  ): Promise<Transaction[]> {
    const { skip, take, orderBy, ...filters } = query;
    const where = this.buildWhereClause(userId, filters);

    return this.prisma.client.transaction.findMany({
      where,
      skip,
      take,
      orderBy,
    });
  }

  async countTransactionsByUserId(
    userId: string,
    query: TransactionQuery,
  ): Promise<number> {
    const where = this.buildWhereClause(userId, query);

    return this.prisma.client.transaction.count({ where });
  }

  async findTransactionById(
    id: string,
    userId: string,
  ): Promise<Transaction | null> {
    return this.prisma.client.transaction.findFirst({
      where: { id, userId },
    });
  }

  async createTransaction(
    data: Prisma.TransactionCreateInput,
  ): Promise<Transaction> {
    return this.prisma.client.transaction.create({
      data,
    });
  }

  async updateTransaction(
    id: string,
    userId: string,
    data: Prisma.TransactionUpdateInput,
  ): Promise<Transaction> {
    const existing = await this.findTransactionById(id, userId);

    if (!existing) {
      throw new NotFoundException('Transaction not found');
    }

    return this.prisma.client.transaction.update({
      where: { id },
      data,
    });
  }

  async deleteTransaction(id: string, userId: string): Promise<Transaction> {
    const existing = await this.findTransactionById(id, userId);

    if (!existing) {
      throw new NotFoundException('Transaction not found');
    }

    return this.prisma.client.transaction.delete({
      where: { id },
    });
  }

  async calculateBalance(
    userId: string,
    query?: TransactionQuery,
  ): Promise<{
    income: Prisma.Decimal;
    expenses: Prisma.Decimal;
    balance: Prisma.Decimal;
    count: number;
    currency: Currency;
  }> {
    const where = this.buildWhereClause(userId, query || {});

    const firstTransaction = await this.prisma.client.transaction.findFirst({
      where,
      select: { currency: true },
    });

    const currency = (firstTransaction?.currency as Currency) || Currency.USD;

    const incomeResult = await this.prisma.client.transaction.aggregate({
      where: { ...where, type: TransactionType.INCOME },
      _sum: { amount: true },
      _count: true,
    });

    const expensesResult = await this.prisma.client.transaction.aggregate({
      where: { ...where, type: TransactionType.EXPENSE },
      _sum: { amount: true },
      _count: true,
    });

    const income = incomeResult._sum.amount || new Prisma.Decimal(0);
    const expenses = expensesResult._sum.amount || new Prisma.Decimal(0);
    const balance = income.minus(expenses);
    const count = (incomeResult._count || 0) + (expensesResult._count || 0);

    return { income, expenses, balance, count, currency };
  }

  async validateCategory(
    categoryId: string,
    userId: string,
    type: TransactionType,
  ): Promise<{ id: string; type: TransactionType }> {
    const category = await this.prisma.client.category.findFirst({
      where: { id: categoryId, userId },
      select: { id: true, type: true },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.type !== type) {
      throw new Error(
        `Category type mismatch: transaction is ${type} but category is ${category.type}`,
      );
    }

    return category;
  }

  async validateSubcategory(
    subcategoryId: string,
    categoryId: string,
    userId: string,
  ): Promise<void> {
    const subcategory = await this.prisma.client.category.findFirst({
      where: {
        id: subcategoryId,
        userId,
        parentCategoryId: categoryId,
      },
      select: { id: true },
    });

    if (!subcategory) {
      throw new NotFoundException(
        'Subcategory not found or does not belong to the specified category',
      );
    }
  }

  private buildWhereClause(
    userId: string,
    query: TransactionQuery,
  ): Prisma.TransactionWhereInput {
    const where: Prisma.TransactionWhereInput = { userId };

    if (query.type) {
      where.type = query.type;
    }

    if (query.categoryId) {
      where.categoryId = query.categoryId;
    }

    if (query.subcategoryId) {
      where.subcategoryId = query.subcategoryId;
    }

    if (query.startDate || query.endDate) {
      where.date = {};
      if (query.startDate) {
        where.date.gte = new Date(query.startDate);
      }
      if (query.endDate) {
        where.date.lte = new Date(query.endDate);
      }
    }

    if (query.currency) {
      where.currency = query.currency;
    }

    return where;
  }
}
