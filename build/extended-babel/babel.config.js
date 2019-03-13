const env = process.env.BABEL_ENV || process.env.NODE_ENV;

const isEnvTest = env === 'test';
const isEnvDevelopment = env === 'development';

const config = {
  plugins: [
    [
      require('babel-plugin-styled-components'),
      {
        ssr: true,
      },
    ],
    // Experimental macros support. Will be documented after it's had some time
    // in the wild.
    require('babel-plugin-macros'),
    // faster.js is a Babel plugin that compiles idiomatic Javascript to faster, micro-optimized Javascript.
    require('faster.js'),
    (isEnvTest || isEnvDevelopment) ? [
      require('babel-plugin-react-docgen-typescript'),
      {
        include: 'src\/*\.tsx?$',
        exclude: '__stories__\/*\.tsx?$'
      }
    ] : null
  ].filter(Boolean),
  presets: [
    [
      require(`${__dirname}/node_modules/@growcss/babel-preset`),
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
};

if (isEnvTest) {
  config.plugins.push(require('@babel/plugin-transform-modules-commonjs'));
  config.plugins.push(require('@babel/plugin-transform-runtime'));
}

if (isEnvTest || isEnvDevelopment) {
  config.plugins.push(require('@babel/plugin-transform-react-jsx-source'));
}

module.exports = config;
