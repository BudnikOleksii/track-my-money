export const I18N_NAMESPACE = {
  all: 'all',
  homePage: 'homePage',
} as const;

export type I18Namespace = (typeof I18N_NAMESPACE)[keyof typeof I18N_NAMESPACE];
