import { config } from '@track-my-money/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    ignores: ['storybook-static/**'],
  },
];
