module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-modules-commonjs',
    'babel-plugin-styled-components',
    '@babel/plugin-transform-regenerator',
  ],
  presets: [
    '@babel/preset-env',
    '@babel/react',
    '@babel/typescript'
  ],
  'env': {
    'test': {
      'plugins': [
        'require-context-hook'
      ]
    },
    'storybook': {
      'plugins': []
    },
    'production': {
      'plugins': []
    }
  }
};
