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
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryResponseDto,
  UserEntity,
  TransactionType,
} from '@track-my-money/api-shared';

import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async getCategories(
    @CurrentUser() user: UserEntity,
    @Query('type') type?: TransactionType,
  ): Promise<CategoryResponseDto[]> {
    return this.categoriesService.getCategories(user.id, type);
  }

  @Get(':id')
  async getCategoryById(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
  ): Promise<CategoryResponseDto> {
    return this.categoriesService.getCategoryById(id, user.id);
  }

  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser() user: UserEntity,
  ): Promise<CategoryResponseDto> {
    return this.categoriesService.createCategory(user.id, createCategoryDto);
  }

  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @CurrentUser() user: UserEntity,
  ): Promise<CategoryResponseDto> {
    return this.categoriesService.updateCategory(
      id,
      user.id,
      updateCategoryDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCategory(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
  ): Promise<void> {
    return this.categoriesService.deleteCategory(id, user.id);
  }
}
