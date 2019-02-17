module.exports = {
  extends: [
    'plugin:unicorn/recommended',
    'plugin:import/recommended',
    'prettier',
    'prettier/standard',
    'prettier/unicorn',
  ],
  plugins: [
    'prettier',
    'unicorn',
    'import',
    'compat',
    'promise',
    'jsdoc',
  ],
  rules: {
    'prettier/prettier': 'error',
    ...require('./rules/prettier-conflicts'),
    ...require('./rules/jsdoc'),
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx'
        ]
      }
    }
  }
};
