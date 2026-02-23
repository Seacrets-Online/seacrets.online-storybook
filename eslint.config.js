import { globalIgnores } from 'eslint/config';
import storybook from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  globalIgnores([
    'node_modules',
    'dist',
    'storybook-static',
    'src/style-dictionary-dist',
    '!.storybook',
  ]),
  ...tseslint.configs.recommended,
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['.storybook/**/*.ts'],
    rules: {
      'storybook/no-uninstalled-addons': 'off',
    },
  },
);
