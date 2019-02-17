module.exports = {
  root: true,
  extends: [
    '@growcss/eslint-config',
    '@growcss/eslint-config/typescript',
    '@growcss/eslint-config/react',
  ].map(require.resolve),
  rules: {
    'import/no-extraneous-dependencies': 'off',
  },
};
