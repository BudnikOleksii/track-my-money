export interface SubcategoryResponse {
  id: string;
  name: string;
  type: string;
  userId: string;
  parentCategoryId: string;
  subcategories: never[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryResponseDto {
  id: string;
  name: string;
  type: string;
  userId: string;
  parentCategoryId: string | null;
  subcategories: SubcategoryResponse[];
  createdAt: Date;
  updatedAt: Date;
}
