module.exports = {
  root: true,
  extends: [
    '@growcss/eslint-config',
    '@growcss/eslint-config/typescript',
    '@growcss/eslint-config/react',
  ].map(require.resolve),
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['.storybook/**', '__tests__/**', '__stories__/**'],
      },
    ],
  },
};
