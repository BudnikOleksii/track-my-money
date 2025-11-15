import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { TransactionType } from '@track-my-money/database';

export class SubcategoryResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  parentCategoryId: string;

  @ApiProperty({ type: [String], example: [] })
  subcategories: never[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class CategoryResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: TransactionType })
  type: TransactionType;

  @ApiProperty()
  userId: string;

  @ApiPropertyOptional()
  parentCategoryId: string | null;

  @ApiProperty({ type: [SubcategoryResponse] })
  subcategories: SubcategoryResponse[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
