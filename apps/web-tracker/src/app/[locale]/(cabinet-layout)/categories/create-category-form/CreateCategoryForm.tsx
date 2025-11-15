'use client';

import { type FC, useState } from 'react';
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

import { TransactionType } from '@/src/constants/transaction-type';
import type {
  CreateCategoryDto,
  CreateCategoryDtoTypeEnum,
} from '@/src/api/generated/Api';
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} from '@/src/store/api/categories-api';
import { I18N_NAMESPACE } from '@/src/i18n/constants/i18n-namespace';

import {
  createCategorySchema,
  CreateCategoryFormData,
} from './create-category-form.schema';

import styles from './CreateCategoryForm.module.scss';

export const CreateCategoryForm: FC = () => {
  const t = useTranslations(`${I18N_NAMESPACE.categoriesPage}.content`);
  const tShared = useTranslations(`${I18N_NAMESPACE.all}.common`);
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const { data: categories } = useGetCategoriesQuery(undefined);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createCategorySchema(t, tShared)),
    defaultValues: {
      name: '',
      type: TransactionType.INCOME,
      parentCategoryId: undefined,
    },
  });

  const onSubmit = async (data: CreateCategoryFormData) => {
    try {
      setErrorMessage('');
      setSuccessMessage('');

      const submitData: CreateCategoryDto = {
        name: data.name,
        type: data.type as CreateCategoryDtoTypeEnum,
        ...(data.parentCategoryId
          ? { parentCategoryId: data.parentCategoryId }
          : {}),
      };

      await createCategory(submitData).unwrap();
      setSuccessMessage(t('createSuccess'));
      reset();
    } catch {
      setErrorMessage(t('createError'));
    }
  };

  const topLevelCategories =
    categories?.filter((cat) => !cat.parentCategoryId) || [];

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

      <div className={styles.field}>
        <Label htmlFor="parentCategoryId">{t('parentCategoryLabel')}</Label>
        <Controller
          name="parentCategoryId"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value ?? ''}
              onValueChange={(value) =>
                field.onChange(value === '' ? undefined : value)
              }
            >
              <SelectTrigger id="parentCategoryId">
                <SelectValue placeholder={t('parentCategoryPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">
                  {t('parentCategoryPlaceholder')}
                </SelectItem>
                {topLevelCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.parentCategoryId && (
          <span className={styles.errorText}>
            {errors.parentCategoryId.message}
          </span>
        )}
      </div>

      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
      {successMessage && <div className={styles.success}>{successMessage}</div>}

      <Button
        type="submit"
        disabled={isLoading}
        className={styles.submitButton}
      >
        {isLoading ? <Loader size="sm" /> : t('createButton')}
      </Button>
    </form>
  );
};
