const browserslist = require('packages/coding-standard/browserslist-config');

const env = process.env.BABEL_ENV || process.env.NODE_ENV;

const isEnvTest = env === 'test';
const isEnvDevelopment = env === 'development';

const config = {
  plugins: [
    // class { handleClick = () => { } }
    // Enable loose mode to use assignment instead of defineProperty
    // See discussion in https://github.com/facebook/create-react-app/issues/4263
    '@babel/plugin-proposal-class-properties',
    // Adds syntax support for import()
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-typescript',
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
      },
    ],
    // fast-async is a Babel plugin that implements the ES7 keywords async and await
    // using syntax transformation at compile-time, rather than generators.
    'module:fast-async',
    // Experimental macros support. Will be documented after it's had some time
    // in the wild.
    'babel-plugin-macros',
    // https://babeljs.io/docs/en/babel-plugin-transform-computed-properties#loose
    [
      '@babel/plugin-transform-computed-properties',
      {
        loose: true,
      },
    ],
    // https://babeljs.io/docs/en/babel-plugin-transform-parameters#loose
    [
      '@babel/plugin-transform-parameters',
      {
        loose: true,
      },
    ],
    // Transform dynamic import to require
    [
      'babel-plugin-dynamic-import-node',
      {
        noInterop: true,
      },
    ],
  ],
  presets: [
    [
      '@babel/typescript',
      {
        allExtensions: true,
        isTSX: true,
      },
    ],
    [
      'airbnb',
      Object.assign(
        {},
        {
          // Do not transform modules to CJS
          modules: false,
          // https://babeljs.io/docs/en/babel-plugin-transform-classes#loose
          looseClasses: true,
          // Exclude transforms that make all code slower
          exclude: ['transform-typeof-symbol'],
          development: isEnvTest || isEnvDevelopment,
          targets: browserslist,
        },
        isEnvTest && {
          targets: {
            node: 'current',
          },
        },
      ),
    ],
  ],
  overrides: [
    {
      test: /\.tsx?$/,
      plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
    },
  ],
};

if (isEnvTest || isEnvDevelopment) {
  config.plugins.push('@babel/plugin-transform-modules-commonjs');
  // Tweak React components in real time. - @see https://github.com/gaearon/react-hot-loader
  config.plugins.push('react-hot-loader/babel');
  config.plugins.push('@babel/plugin-transform-regenerator');
  config.plugins.push('@babel/plugin-transform-runtime');
}

module.exports = config;
