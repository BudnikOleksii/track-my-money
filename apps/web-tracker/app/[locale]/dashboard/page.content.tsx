'use client';

import { type FC } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Typography } from '@track-my-money/ui/src/components/atoms/typography/Typography';
import { Button } from '@track-my-money/ui/src/components/atoms/button/Button';

import { PrivateRouteWrapper } from '@/app/shared/components/private-route-wrapper';
import { useAuth } from '@/app/shared/hooks/use-auth';
import { ROUTES } from '@/app/shared/constants/routes';
import { I18N_NAMESPACE } from '@/app/i18n/constants/i18n-namespace';

import styles from './page.module.scss';

export const DashboardPageContent: FC = () => {
  const t = useTranslations(`${I18N_NAMESPACE.dashboardPage}.content`);
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout({});
      router.push(ROUTES.signIn);
    } catch {
      router.push(ROUTES.signIn);
    }
  };

  return (
    <PrivateRouteWrapper>
      <div className={styles.container}>
        <div className={styles.content}>
          <header className={styles.header}>
            <Typography variant="title-l">{t('title')}</Typography>
            <Button onClick={handleLogout} variant="outline">
              {t('logoutButton')}
            </Button>
          </header>

          <div className={styles.welcomeSection}>
            <Typography variant="title-m" className={styles.welcomeTitle}>
              {t('welcome')}, {user?.name}!
            </Typography>
          </div>

          <div className={styles.infoCard}>
            <Typography variant="title-s" className={styles.infoTitle}>
              {t('userInfo')}
            </Typography>
            <div className={styles.infoRow}>
              <Typography variant="body-m" className={styles.infoLabel}>
                {t('name')}:
              </Typography>
              <Typography variant="body-m" className={styles.infoValue}>
                {user?.name}
              </Typography>
            </div>
            <div className={styles.infoRow}>
              <Typography variant="body-m" className={styles.infoLabel}>
                {t('email')}:
              </Typography>
              <Typography variant="body-m" className={styles.infoValue}>
                {user?.email}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </PrivateRouteWrapper>
  );
};
