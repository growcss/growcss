const env = process.env.BABEL_ENV || process.env.NODE_ENV;

const isEnvTest = env === 'test';

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
  ],
  presets: [
    '@babel/typescript',
    [
      'airbnb',
      Object.assign(
        {},
        {
          // Do not transform modules to CJS
          modules: false,
          looseClasses: true,
          // Exclude transforms that make all code slower
          exclude: ['transform-typeof-symbol'],
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

if (isEnvTest) {
  config.plugins.push('@babel/plugin-transform-modules-commonjs');
  // Transform dynamic import to require
  config.plugins.push('babel-plugin-dynamic-import-node');
}

module.exports = config;
