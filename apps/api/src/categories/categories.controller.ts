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
  ApiQuery,
} from '@nestjs/swagger';

import { TransactionType } from '@track-my-money/database';

import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryResponseDto,
} from './dto';
import { UserEntity } from '../auth/entities/user.entity';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('categories')
@ApiBearerAuth('JWT-auth')
@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiQuery({
    name: 'type',
    required: false,
    enum: TransactionType,
    description: 'Filter by transaction type',
  })
  @ApiResponse({
    status: 200,
    description: 'List of categories',
    type: [CategoryResponseDto],
  })
  async getCategories(
    @CurrentUser() user: UserEntity,
    @Query('type') type?: TransactionType,
  ): Promise<CategoryResponseDto[]> {
    return this.categoriesService.getCategories(user.id, type);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({
    status: 200,
    description: 'Category details',
    type: CategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async getCategoryById(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
  ): Promise<CategoryResponseDto> {
    return this.categoriesService.getCategoryById(id, user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: 201,
    description: 'Category successfully created',
    type: CategoryResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Category with this name already exists',
  })
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser() user: UserEntity,
  ): Promise<CategoryResponseDto> {
    return this.categoriesService.createCategory(user.id, createCategoryDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update category' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({
    status: 200,
    description: 'Category successfully updated',
    type: CategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({ status: 400, description: 'Invalid update request' })
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
  @ApiOperation({ summary: 'Delete category' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({ status: 204, description: 'Category successfully deleted' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({
    status: 400,
    description: 'Cannot delete category with associated transactions',
  })
  async deleteCategory(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
  ): Promise<void> {
    return this.categoriesService.deleteCategory(id, user.id);
  }
}
