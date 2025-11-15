'use client';

import { type FC, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@track-my-money/ui/src/components/atoms/button/Button';
import { Loader } from '@track-my-money/ui/src/components/atoms/loader/Loader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@track-my-money/ui/src/components/molecules/select/Select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@track-my-money/ui/src/components/molecules/dialog/Dialog';
import { TransactionType } from '@track-my-money/api-shared';
import type { CategoryResponseDto } from '@track-my-money/api-shared';

import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from '@/src/store/api/categories-api';
import { I18N_NAMESPACE } from '@/src/i18n/constants/i18n-namespace';

import { EditCategoryForm } from '../edit-category-form/EditCategoryForm';

import styles from './CategoryList.module.scss';

export const CategoryList: FC = () => {
  const t = useTranslations(`${I18N_NAMESPACE.categoriesPage}.content`);
  const [selectedType, setSelectedType] = useState<TransactionType | undefined>(
    undefined,
  );
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null,
  );
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(
    null,
  );
  const { data: categories, isLoading } = useGetCategoriesQuery(selectedType);
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      setDeletingCategoryId(null);
    } catch {
      // Error handling is done by the mutation
    }
  };

  const handleEditSuccess = () => {
    setEditingCategoryId(null);
  };

  const renderSubcategories = (
    subcategories: CategoryResponseDto['subcategories'],
  ) => {
    if (!subcategories || subcategories.length === 0) {
      return (
        <div className={styles.noSubcategories}>{t('noSubcategories')}</div>
      );
    }

    return (
      <ul className={styles.subcategoriesList}>
        {subcategories.map((subcategory) => (
          <li key={subcategory.id} className={styles.subcategoryItem}>
            {subcategory.name}
          </li>
        ))}
      </ul>
    );
  };

  if (isLoading) {
    return <Loader size="md" />;
  }

  if (!categories || categories.length === 0) {
    return <div className={styles.noCategories}>{t('noCategories')}</div>;
  }

  const topLevelCategories = categories.filter((cat) => !cat.parentCategoryId);

  return (
    <div className={styles.categoryList}>
      <div className={styles.filters}>
        <div className={styles.filterField}>
          <label htmlFor="typeFilter">{t('filterByType')}</label>
          <Select
            value={selectedType || 'all'}
            onValueChange={(value) =>
              setSelectedType(
                value === 'all' ? undefined : (value as TransactionType),
              )
            }
          >
            <SelectTrigger id="typeFilter">
              <SelectValue placeholder={t('filterByType')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allTypes')}</SelectItem>
              <SelectItem value={TransactionType.INCOME}>
                {t('incomeType')}
              </SelectItem>
              <SelectItem value={TransactionType.EXPENSE}>
                {t('expenseType')}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ul className={styles.categories}>
        {topLevelCategories.map((category) => (
          <li key={category.id} className={styles.categoryItem}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryInfo}>
                <h3 className={styles.categoryName}>{category.name}</h3>
                <span className={styles.categoryType}>
                  {category.type === TransactionType.INCOME
                    ? t('incomeType')
                    : t('expenseType')}
                </span>
              </div>
              <div className={styles.categoryActions}>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setEditingCategoryId(category.id)}
                >
                  {t('editButton')}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setDeletingCategoryId(category.id)}
                  disabled={isDeleting}
                >
                  {t('deleteButton')}
                </Button>
              </div>
            </div>
            {category.subcategories && category.subcategories.length > 0 && (
              <div className={styles.subcategories}>
                <h4 className={styles.subcategoriesTitle}>
                  {t('subcategories')}
                </h4>
                {renderSubcategories(category.subcategories)}
              </div>
            )}
          </li>
        ))}
      </ul>

      {editingCategoryId && (
        <Dialog
          open={!!editingCategoryId}
          onOpenChange={(open) => !open && setEditingCategoryId(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('editButton')}</DialogTitle>
            </DialogHeader>
            <EditCategoryForm
              categoryId={editingCategoryId}
              onSuccess={handleEditSuccess}
              onCancel={() => setEditingCategoryId(null)}
            />
          </DialogContent>
        </Dialog>
      )}

      {deletingCategoryId && (
        <Dialog
          open={!!deletingCategoryId}
          onOpenChange={(open) => !open && setDeletingCategoryId(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('deleteButton')}</DialogTitle>
            </DialogHeader>
            <div className={styles.deleteConfirm}>
              <p>{t('deleteConfirm')}</p>
              <div className={styles.deleteActions}>
                <Button
                  variant="secondary"
                  onClick={() => setDeletingCategoryId(null)}
                >
                  {t('cancel')}
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleDelete(deletingCategoryId)}
                  disabled={isDeleting}
                >
                  {isDeleting ? <Loader size="sm" /> : t('deleteButton')}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
