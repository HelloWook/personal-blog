import jestPlugin from 'eslint-plugin-jest';
import jestDomPlugin from 'eslint-plugin-jest-dom';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import nextPlugin from '@next/eslint-plugin-next';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import unusedImports from 'eslint-plugin-unused-imports';

const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'coverage/**', 'dist/**', 'build/**', '.turbo/**'],
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      '@next/next': nextPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-vars': ['warn', { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }],
    },
  },

  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}', '**/__tests__/**/*.{ts,tsx}'],
    plugins: {
      jest: jestPlugin,
      'jest-dom': jestDomPlugin,
      'testing-library': testingLibraryPlugin,
    },
    languageOptions: {
      globals: {
        ...jestPlugin.environments.globals.globals,
      },
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      ...jestDomPlugin.configs.recommended.rules,
      ...testingLibraryPlugin.configs.react.rules,
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];

export default eslintConfig;
