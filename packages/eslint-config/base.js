import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },
  {
    plugins: {
      'unused-imports': unusedImports,
      import: importPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': 'allow-with-description',
          'ts-check': 'allow-with-description',
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'], // 1. Built-in Node.js modules and external modules
            ['internal'], // 2. Monorepo packages
            ['index', 'sibling', 'parent'], // 3. Absolute and relative imports
          ],
          pathGroups: [
            {
              // Monorepo packages (e.g., @docs-ui/*)
              pattern: '@track-my-money/**',
              group: 'internal',
              position: 'before',
            },
            {
              // Absolute imports within the project
              pattern: '@/**',
              group: 'index',
              position: 'before',
            },
            {
              // Styles imports
              pattern: '**.scss',
              patternOptions: { matchBase: true },
              group: 'parent',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
        },
      ],
      'import/first': 'error',
      'import/no-duplicates': 'error',
      curly: ['error', 'all'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
        },
      ],
      'newline-before-return': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
  {
    ignores: [
      'dist/**',
      '**/eslint.config.mjs',
      '**/.prettierrc.mjs',
      '**/stylelint.config.js',
    ],
  },
];
