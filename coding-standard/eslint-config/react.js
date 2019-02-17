module.exports ={
  extends: [
    'prettier/react',
    'plugin:jest/recommended'
  ],
  plugins: [
    'react',
    'jsx-a11y',
    // 'security', @todo check it on the next version
  ],
  rules: {
    ...{
      'react/sort-comp': 'off',
      'react/jsx-filename-extension': 'off',
      'react/require-default-props': 'off',
    },
    ...require('./rules/prettier-conflicts-react'),
    ...require('./rules/jest'),
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
};
