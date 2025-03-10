import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const ignores = ['**/dist/', '**/node_modules/']

export default tseslint.config(
  {
    ignores,
  },
  {
    ...eslint.configs.recommended,
    languageOptions: {
      ...eslint.configs.recommended.languageOptions,
      globals: {
        ...eslint.configs.recommended.languageOptions?.globals,
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...eslint.configs.recommended.rules,
      'no-unused-vars': 'off',
    },
  },
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    languageOptions: {
      ...config.languageOptions,
      globals: {
        ...config.languageOptions?.globals,
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-empty-interface': 'warn',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],

      'max-len': [
        'error',
        {
          code: 100,
          ignorePattern: '^\\s*<path',
        },
      ],
    },
    ignores: [...ignores, '**/*.cjs'],
  })),
)
