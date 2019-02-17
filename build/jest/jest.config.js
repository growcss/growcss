/* eslint-disable no-console */
const fs = require('fs');

const {
  INTEGRATION_TESTS,
  VISUAL_REGRESSION,
  CI,
} = process.env;

const packageDir = process.cwd();

const config = {
  roots: [__dirname, packageDir],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  // NOTE: all options with 'pattern' in the name are javascript regex's that will match if they match
  // anywhere in the string. Where-ever there are an array of patterns, jest simply 'or's all of them
  // i.e /\/__tests__\/_.*?|\/__tests__\/.*?\/_.*?|\/__tests__\/integration\//
  testPathIgnorePatterns: [
    // ignore files that are under a directory starting with "_" at the root of __tests__
    '/__tests__\\/_.*?',
    // ignore files under __tests__ that start with an underscore
    '/__tests__\\/.*?\\/_.*?',
    // ignore tests under __tests__/integration (we override this if the INTEGRATION_TESTS flag is set)
    '/__tests__\\/integration/',
    // ignore tests under __tests__/vr (we override this if the VISUAL_REGRESSION flag is set)
    '/__tests__\\/visual-regression/',
  ],
  modulePathIgnorePatterns: ['/__fixtures__/', './node_modules', '/dist/'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
  // don't transform any files under node_modules except @growcss/* and react-syntax-highlighter (it
  // uses dynamic imports which are not valid in node)
  transformIgnorePatterns: ['\\/node_modules\\/(?!@growcss|react-syntax-highlighter)'],
  setupFiles: [
    '<rootDir>/node_modules/regenerator-runtime/runtime',
    '<rootDir>/config/index.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest-framework-setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  globals: {
    __DEV__: true,
    __BASEURL__: 'http://localhost:9000',
  },
  reporters: ['default', 'jest-junit'],
  testEnvironmentOptions: {
    // Need this to have jsdom loading images.
    resources: 'usable',
  },
  coverageReporters: ['lcov', 'html', 'text-summary'],
  coverageDirectory: `${packageDir}/coverage/`,
  globalSetup: undefined,
  globalTeardown: undefined,
  testEnvironment: 'jsdom',
};

// If the INTEGRATION_TESTS / VISUAL_REGRESSION flag is set we need to
if (INTEGRATION_TESTS || VISUAL_REGRESSION) {
  const testPattern = process.env.VISUAL_REGRESSION
    ? 'visual-regression'
    : 'integration';

  config.testPathIgnorePatterns /*: string[] */ = config.testPathIgnorePatterns.filter(
    pattern => pattern !== `/__tests__\\/${testPattern}/`,
  );

  config.testMatch = [`**/__tests__/${testPattern}/**/*.(tsx|ts|js|jsx)`];
}

if (VISUAL_REGRESSION) {
  config.globalSetup = `${__dirname}/visual-regression/config/jest/globalSetup.js`;
  config.globalTeardown = `${__dirname}/visual-regression/config/jest/globalTeardown.js`;
  config.testEnvironment = `${__dirname}/visual-regression/config/jest/jsdomEnvironment.js`;

  if (!CI) {
    config.globals.__BASEURL__ = 'http://testing.local.com:9000';
  }
}

module.exports = config;
