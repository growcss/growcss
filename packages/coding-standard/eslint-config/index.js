/* eslint-disable global-require */
// The ESLint browser environment defines all browser globals as valid,
// even though most people don't know some of them exist (e.g. `name` or `status`).
// This is dangerous as it hides accidentally undefined variables.
// We blacklist the globals that we deem potentially confusing.
// To use them, explicitly reference them, e.g. `window.name` or `window.status`.
const restrictedGlobals = require('confusing-browser-globals');

module.exports = {
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:unicorn/recommended',
    'prettier',
    'prettier/react',
    'prettier/standard',
    'prettier/unicorn',
    'plugin:security/recommended',
  ],
  plugins: [
    'react',
    'prettier',
    'standard',
    'unicorn',
    'import',
    'compat',
    'prettier',
    'jsx-a11y',
    'security',
    'typescript',
  ],
  parser: 'typescript-eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
  },

  rules: {
    ...{
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['**/__tests__/**/*.js', '**/examples/**/*.js'],
        },
      ],
      'import/no-unresolved': ['off'],
      'import/prefer-default-export': 'off',
      'import/extensions': [
        'error',
        'never',
        {
          json: 'always',
        },
      ],

      'no-labels': 'off',
      'no-restricted-syntax': 'off',
      'no-underscore-dangle': 'off',
      'no-use-before-define': 'off',

      'arrow-body-style': 'off',

      'spaced-comment': 'off',

      'no-await-in-loop': 'off',

      'no-plusplus': 'off',

      'react/sort-comp': 'off',
      'react/jsx-filename-extension': 'off',
      'react/require-default-props': 'off',

      'no-restricted-globals': ['error'].concat(restrictedGlobals),

      'prettier/prettier': ['error', { parser: 'typescript' }],
      // https://github.com/airbnb/javascript/pull/1863 need to be merged
      'arrow-parens': ['error', 'always'],
    },
    ...require('./rules/prettier-conflicts'),
    ...require('./rules/typescript'),
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
};
