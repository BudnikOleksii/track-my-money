import { defineConfig, globalIgnores } from 'eslint/config';
import { nextJsConfig } from '@track-my-money/eslint-config/next-js';

const eslintConfig = defineConfig([
  ...nextJsConfig,
]);

export default eslintConfig;
