const env = process.env.BABEL_ENV || process.env.NODE_ENV;

const isEnvTest = env === 'test';
const isEnvDevelopment = env === 'development';

const config = {
  plugins: [
    // class { handleClick = () => { } }
    // Enable loose mode to use assignment instead of defineProperty
    // See discussion in https://github.com/facebook/create-react-app/issues/4263
    '@babel/plugin-proposal-class-properties',
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
      },
    ],
    // Experimental macros support. Will be documented after it's had some time
    // in the wild.
    'babel-plugin-macros',
  ],
  presets: [
    [
      require(`${__dirname}/packages/coding-standard/babel-preset`),
      Object.assign(
        {},
        {
          // Do not transform modules to CJS
          modules: false,
          // https://babeljs.io/docs/en/babel-plugin-transform-classes#loose
          looseClasses: true,
          // https://babeljs.io/docs/en/babel-plugin-transform-computed-properties#loose
          looseComputedProperties: true,
          // https://babeljs.io/docs/en/babel-plugin-transform-parameters#loose
          looseParameters: true,
          looseTemplateLiterals: true,
          // Exclude transforms that make all code slower
          exclude: ['transform-typeof-symbol'],
          development: isEnvTest || isEnvDevelopment,
          typescript: true,
          react: true,
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
