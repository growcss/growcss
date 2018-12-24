const config = {
  plugins: [
    // class { handleClick = () => { } }
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-typescript',
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
      },
    ],
    'module:fast-async',
  ],
  presets: [
    '@babel/typescript',
    [
      'airbnb',
      {
        modules: false,
        looseClasses: true,
      },
    ],
  ],
};

const env = process.env.BABEL_ENV || process.env.NODE_ENV;

if (env === 'test') {
  config.plugins.push(['@babel/plugin-transform-modules-commonjs']);
}

module.exports = config;
