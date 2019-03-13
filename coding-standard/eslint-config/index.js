/* eslint-disable global-require */
// The ESLint browser environment defines all browser globals as valid,
// even though most people don't know some of them exist (e.g. `name` or `status`).
// This is dangerous as it hides accidentally undefined variables.
// We blacklist the globals that we deem potentially confusing.
// To use them, explicitly reference them, e.g. `window.name` or `window.status`.
const restrictedGlobals = require('confusing-browser-globals');

module.exports = {
  extends: [
    './base.js',
    'airbnb',
    // 'plugin:security/recommended', @todo check it on the next version
    'prettier',
  ],
  plugins: [
    // 'security', @todo check it on the next version
  ],
  rules: {
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

    'no-restricted-globals': ['error'].concat(restrictedGlobals),
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
};
