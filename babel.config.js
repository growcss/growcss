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
  ],
  presets: ['@babel/typescript', 'airbnb'],
};

module.exports = config;
