const config = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-modules-commonjs',
    [
      'babel-plugin-styled-components',
      {
        "ssr": true
      }
    ],
    // '@babel/plugin-transform-runtime',
    // '@babel/plugin-transform-regenerator'
  ],
  presets: [
    '@babel/typescript',
    'airbnb'
  ]
};

module.exports = config;
