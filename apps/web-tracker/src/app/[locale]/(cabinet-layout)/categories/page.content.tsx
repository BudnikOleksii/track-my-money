'use client';

import { type FC, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Typography } from '@track-my-money/ui/src/components/atoms/typography/Typography';
import { Button } from '@track-my-money/ui/src/components/atoms/button/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@track-my-money/ui/src/components/molecules/dialog/Dialog';

import { I18N_NAMESPACE } from '@/src/i18n/constants/i18n-namespace';
import { PrivateRouteWrapper } from '@/src/shared/components/private-route-wrapper/PrivateRouteWrapper';

import { CreateCategoryForm } from './create-category-form/CreateCategoryForm';
import { CategoryList } from './category-list/CategoryList';

import styles from './page.module.scss';

export const CategoriesPageContent: FC = () => {
  const t = useTranslations(`${I18N_NAMESPACE.categoriesPage}.content`);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <PrivateRouteWrapper>
      <div className={styles.container}>
        <div className={styles.content}>
          <header className={styles.header}>
            <Typography variant="title-l">{t('title')}</Typography>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              {t('createButton')}
            </Button>
          </header>

          <div className={styles.categoriesSection}>
            <CategoryList />
          </div>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('createButton')}</DialogTitle>
            </DialogHeader>
            <CreateCategoryForm />
          </DialogContent>
        </Dialog>
      </div>
    </PrivateRouteWrapper>
  );
};
