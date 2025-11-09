import { defineConfig, globalIgnores } from 'eslint/config';
import { nextJsConfig } from '@track-my-money/eslint-config/next-js';

const eslintConfig = defineConfig([
  ...nextJsConfig,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'next/link',
              message:
                'Please use \'NavigationLink\' from "@/src/shared/components/navigation-link/NavigationLink" instead.',
            },
          ],
          patterns: [
            {
              group: ['next/navigation'],
              importNames: ['useRouter'],
              message:
                'Use \'useRouter\' from "@/src/navigation/navigation" instead.',
            },
            {
              group: ['next/navigation'],
              importNames: ['usePathname'],
              message:
                'Use \'usePathname\' from "@/src/navigation/navigation" instead.',
            },
            {
              group: ['next/navigation'],
              importNames: ['redirect'],
              message:
                'Use \'redirect\' from "@/src/navigation/navigation" instead.',
            },
          ],
        },
      ],
      'react/prop-types': 'off'
    },
  },
]);

export default eslintConfig;
