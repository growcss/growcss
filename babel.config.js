const config = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-modules-commonjs',
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
      },
    ],
    'module:fast-async',
  ],
  presets: ['@babel/typescript', 'airbnb'],
};

module.exports = config;
