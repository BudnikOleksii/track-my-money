'use client';

import { useTranslations } from 'next-intl';

import { I18N_NAMESPACE } from '../i18n/constants/i18n-namespace';

const Home = () => {
  const t = useTranslations(I18N_NAMESPACE.homePage);
  const tAll = useTranslations(I18N_NAMESPACE.all);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <button>{t('getStarted')}</button>
      <div style={{ marginTop: '2rem' }}>
        <p>{tAll('common.welcome')}</p>
      </div>
    </div>
  );
};

export default Home;
