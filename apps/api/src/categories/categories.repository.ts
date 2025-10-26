import { Injectable, NotFoundException } from '@nestjs/common';

import { Category, TransactionType, Prisma } from '@track-my-money/database';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async findCategoriesByUserId(
    userId: string,
    type?: TransactionType,
  ): Promise<Category[]> {
    const where: Prisma.CategoryWhereInput = { userId };

    if (type) {
      where.type = type;
    }

    return this.prisma.client.category.findMany({
      where,
      orderBy: { name: 'asc' },
    });
  }

  async findCategoryById(id: string, userId: string): Promise<Category | null> {
    return this.prisma.client.category.findFirst({
      where: { id, userId },
    });
  }

  async findCategoryWithSubcategories(
    id: string,
    userId: string,
  ): Promise<(Category & { subcategories: Category[] }) | null> {
    return this.prisma.client.category.findFirst({
      where: { id, userId },
      include: { subcategories: true },
    });
  }

  async createCategory(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.client.category.create({
      data,
    });
  }

  async updateCategory(
    id: string,
    userId: string,
    data: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    const existing = await this.findCategoryById(id, userId);

    if (!existing) {
      throw new NotFoundException('Category not found');
    }

    return this.prisma.client.category.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: string, userId: string): Promise<Category> {
    const existing = await this.findCategoryById(id, userId);

    if (!existing) {
      throw new NotFoundException('Category not found');
    }

    return this.prisma.client.category.delete({
      where: { id },
    });
  }

  async hasTransactions(categoryId: string): Promise<boolean> {
    const count = await this.prisma.client.transaction.count({
      where: {
        OR: [{ categoryId }, { subcategoryId: categoryId }],
      },
    });

    return count > 0;
  }

  async validateParentCategory(
    parentId: string,
    userId: string,
    type: TransactionType,
  ): Promise<Category> {
    const parent = await this.findCategoryById(parentId, userId);

    if (!parent) {
      throw new NotFoundException('Parent category not found');
    }

    if (parent.type !== type) {
      throw new Error('Parent category type must match subcategory type');
    }

    if (parent.parentCategoryId) {
      throw new Error('Cannot create subcategory of a subcategory');
    }

    return parent;
  }

  async findCategoryByNameAndType(
    name: string,
    type: TransactionType,
    userId: string,
  ): Promise<Category | null> {
    return this.prisma.client.category.findFirst({
      where: {
        name,
        type,
        userId,
      },
    });
  }
}
