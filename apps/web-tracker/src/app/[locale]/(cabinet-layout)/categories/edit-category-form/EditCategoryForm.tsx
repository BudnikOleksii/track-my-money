'use client';

import { type FC, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { TextField } from '@track-my-money/ui/src/components/molecules/text-field/TextField';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@track-my-money/ui/src/components/molecules/select/Select';
import { Button } from '@track-my-money/ui/src/components/atoms/button/Button';
import { Loader } from '@track-my-money/ui/src/components/atoms/loader/Loader';
import { Label } from '@track-my-money/ui/src/components/atoms/label/Label';
import { TransactionType } from '@track-my-money/api-shared';

import {
  useUpdateCategoryMutation,
  useGetCategoryByIdQuery,
} from '@/src/store/api/categories-api';
import { I18N_NAMESPACE } from '@/src/i18n/constants/i18n-namespace';

import {
  updateCategorySchema,
  UpdateCategoryFormData,
} from './edit-category-form.schema';

import styles from './EditCategoryForm.module.scss';

interface Props {
  categoryId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const EditCategoryForm: FC<Props> = ({
  categoryId,
  onSuccess,
  onCancel,
}) => {
  const t = useTranslations(`${I18N_NAMESPACE.categoriesPage}.content`);
  const { data: category, isLoading: isLoadingCategory } =
    useGetCategoryByIdQuery(categoryId);
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<UpdateCategoryFormData>({
    resolver: zodResolver(updateCategorySchema(t)),
  });

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        type: category.type,
      });
    }
  }, [category, reset]);

  const onSubmit = async (data: UpdateCategoryFormData) => {
    try {
      setErrorMessage('');
      setSuccessMessage('');

      await updateCategory({ id: categoryId, data }).unwrap();
      setSuccessMessage(t('updateSuccess'));
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1000);
      }
    } catch {
      setErrorMessage(t('updateError'));
    }
  };

  if (isLoadingCategory) {
    return <Loader size="md" />;
  }

  if (!category) {
    return <div>{t('createError')}</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <TextField
        label={t('nameLabel')}
        type="text"
        placeholder={t('namePlaceholder')}
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register('name')}
      />

      <div className={styles.field}>
        <Label htmlFor="type">{t('typeLabel')}</Label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="type">
                <SelectValue placeholder={t('typeLabel')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={TransactionType.INCOME}>
                  {t('incomeType')}
                </SelectItem>
                <SelectItem value={TransactionType.EXPENSE}>
                  {t('expenseType')}
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.type && (
          <span className={styles.errorText}>{errors.type.message}</span>
        )}
      </div>

      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
      {successMessage && <div className={styles.success}>{successMessage}</div>}

      <div className={styles.actions}>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            {t('cancel')}
          </Button>
        )}
        <Button
          type="submit"
          disabled={isLoading}
          className={styles.submitButton}
        >
          {isLoading ? <Loader size="sm" /> : t('editButton')}
        </Button>
      </div>
    </form>
  );
};
