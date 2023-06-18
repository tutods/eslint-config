const { folders, tsconfigPaths } = require('./common');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: "all",
        jsxSingleQuote: false,
        endOfLine: "lf"
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)', '**/*.(m|c)?js?(x)'],
      plugins: ['sort-keys-fix', 'sort-destructure-keys'],
      rules: {
        'sort-keys-fix/sort-keys-fix': 'error',
        'sort-destructure-keys/sort-destructure-keys': 'error',
      },
    },
    {
      files: ['**/*.ts?(x)'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
        extraFileExtensions: ['.css'],
        project: './tsconfig.json',
      },
      plugins: [
        '@typescript-eslint',
        'simple-import-sort',
        'import',
        'unused-imports',
      ],
      rules: {
        '@typescript-eslint/consistent-type-imports': ['error', {
          prefer: 'type-imports',
        }],
        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/ban-types': 'warn',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-this-alias': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-restricted-imports': 'off',
        '@typescript-eslint/no-restricted-imports': [
          'error',
          {
            patterns: ['../*', './*'],
          },
        ],
        'prefer-rest-params': 'warn',
        'simple-import-sort/exports': 'error',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'unused-imports/no-unused-imports': 'error',
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages
              ['^@?\\w'],
              // Folders
              [
                !!tsconfigPaths.length ? `^(${tsconfigPaths.join('|')})(/.*|$)` : '',
                `^(${folders.join('|')})(/.*|$)`,
                '^\\.',
                '^@\\/([a-z0-9]+)',
              ],
              // Styles
              ['^styles', 'styles', './styles', '^.+\\.s?css$'],
              // If not match on other groups
              ['^'],
            ],
          },
        ],
      },
    },
    {
      files: ['**/*.tsx', '**/*.jsx'],
      extends: ['plugin:react/recommended'],
      plugins: ['react'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'jsx-quotes': ['error', 'prefer-double'],
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/display-name': 'off',
        'react/jsx-curly-brace-presence': [
          'error',
          {
            props: 'never',
          },
        ],
        'react/jsx-boolean-value': ['error', 'never'],
        'react/jsx-sort-props': [
          'error',
          {
            shorthandFirst: true,
            multiline: 'last',
            reservedFirst: ['key'],
          },
        ],
      },
    },
    {
      files: ['**/*.js?(x)'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
