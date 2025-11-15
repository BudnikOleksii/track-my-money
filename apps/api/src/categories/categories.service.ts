import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

import { Category, TransactionType } from '@track-my-money/database';

import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryResponseDto,
} from './dto';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async getCategories(
    userId: string,
    type?: TransactionType,
  ): Promise<CategoryResponseDto[]> {
    const categories = await this.categoriesRepository.findCategoriesByUserId(
      userId,
      type,
    );

    return this.buildNestedStructure(categories);
  }

  async getCategoryById(
    id: string,
    userId: string,
  ): Promise<CategoryResponseDto> {
    const category =
      await this.categoriesRepository.findCategoryWithSubcategories(id, userId);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.mapToResponseDto(category);
  }

  async createCategory(
    userId: string,
    dto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const { name, type, parentCategoryId } = dto;

    const existing = await this.categoriesRepository.findCategoryByNameAndType(
      name,
      type,
      userId,
    );

    if (existing) {
      throw new ConflictException(
        `Category with name "${name}" already exists for this type`,
      );
    }

    if (parentCategoryId) {
      await this.categoriesRepository.validateParentCategory(
        parentCategoryId,
        userId,
        type,
      );
    }

    const category = await this.categoriesRepository.createCategory({
      name,
      type,
      user: { connect: { id: userId } },
      ...(parentCategoryId && {
        parentCategory: { connect: { id: parentCategoryId } },
      }),
    });

    return this.mapToResponseDto({
      ...category,
      subcategories: [],
    });
  }

  async updateCategory(
    id: string,
    userId: string,
    dto: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const { name, type } = dto;

    const existing = await this.categoriesRepository.findCategoryById(
      id,
      userId,
    );

    if (!existing) {
      throw new NotFoundException('Category not found');
    }

    if (name && name !== existing.name) {
      const duplicate =
        await this.categoriesRepository.findCategoryByNameAndType(
          name,
          type || existing.type,
          userId,
        );

      if (duplicate) {
        throw new ConflictException(
          `Category with name "${name}" already exists for this type`,
        );
      }
    }

    if (type && type !== existing.type) {
      if (existing.parentCategoryId) {
        throw new BadRequestException('Cannot change type of a subcategory');
      }

      const categoryWithSubs =
        await this.categoriesRepository.findCategoryWithSubcategories(
          id,
          userId,
        );

      if (categoryWithSubs && categoryWithSubs.subcategories.length > 0) {
        throw new BadRequestException(
          'Cannot change type of category with subcategories',
        );
      }
    }

    const updated = await this.categoriesRepository.updateCategory(id, userId, {
      name,
      type,
    });

    return this.mapToResponseDto({
      ...updated,
      subcategories: [],
    });
  }

  async deleteCategory(id: string, userId: string): Promise<void> {
    const existing = await this.categoriesRepository.findCategoryById(
      id,
      userId,
    );

    if (!existing) {
      throw new NotFoundException('Category not found');
    }

    const hasTransactions = await this.categoriesRepository.hasTransactions(id);

    if (hasTransactions) {
      throw new BadRequestException(
        'Cannot delete category with associated transactions',
      );
    }

    const categoryWithSubs =
      await this.categoriesRepository.findCategoryWithSubcategories(id, userId);

    if (categoryWithSubs && categoryWithSubs.subcategories.length > 0) {
      for (const subcategory of categoryWithSubs.subcategories) {
        const subHasTransactions =
          await this.categoriesRepository.hasTransactions(subcategory.id);
        if (subHasTransactions) {
          throw new BadRequestException(
            'Cannot delete category with subcategories that have associated transactions',
          );
        }
      }
    }

    await this.categoriesRepository.deleteCategory(id, userId);
  }

  private buildNestedStructure(categories: Category[]): CategoryResponseDto[] {
    const categoryMap = new Map<string, CategoryResponseDto>();
    const rootCategories: CategoryResponseDto[] = [];

    for (const category of categories) {
      const dto: CategoryResponseDto = {
        id: category.id,
        name: category.name,
        type: category.type,
        userId: category.userId,
        parentCategoryId: category.parentCategoryId,
        subcategories: [],
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      };

      categoryMap.set(category.id, dto);
    }

    for (const category of categories) {
      const dto = categoryMap.get(category.id);
      if (!dto) {
        continue;
      }

      if (category.parentCategoryId) {
        const parent = categoryMap.get(category.parentCategoryId);
        if (parent) {
          const subcategory: (typeof parent.subcategories)[number] = {
            id: dto.id,
            name: dto.name,
            type: dto.type,
            userId: dto.userId,
            parentCategoryId: category.parentCategoryId,
            subcategories: [],
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
          };
          parent.subcategories.push(subcategory);
        }
      } else {
        rootCategories.push(dto);
      }
    }

    return rootCategories;
  }

  private mapToResponseDto(
    category: Category & { subcategories: Category[] },
  ): CategoryResponseDto {
    return {
      id: category.id,
      name: category.name,
      type: category.type,
      userId: category.userId,
      parentCategoryId: category.parentCategoryId,
      subcategories: category.subcategories.map((sub) => ({
        id: sub.id,
        name: sub.name,
        type: sub.type,
        userId: sub.userId,
        parentCategoryId: sub.parentCategoryId ?? '',
        subcategories: [],
        createdAt: sub.createdAt,
        updatedAt: sub.updatedAt,
      })),
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}
