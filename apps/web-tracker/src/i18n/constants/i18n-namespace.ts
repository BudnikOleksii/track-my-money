export const I18N_NAMESPACE = {
  all: 'all',
  homePage: 'homePage',
  signInPage: 'signInPage',
  signUpPage: 'signUpPage',
  dashboardPage: 'dashboardPage',
  categoriesPage: 'categoriesPage',
  authShared: 'authShared',
} as const;

export type I18Namespace = (typeof I18N_NAMESPACE)[keyof typeof I18N_NAMESPACE];
