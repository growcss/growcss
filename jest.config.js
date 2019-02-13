/* eslint-disable no-console */
const fs = require('fs');

const {
  CHANGED_PACKAGES,
  COVERAGE_PACKAGES,
  TEST_ONLY_PATTERN,
  INTEGRATION_TESTS,
  VISUAL_REGRESSION,
  TRAVIS,
  HOME,
} = process.env;

let changedPackages;

if (CHANGED_PACKAGES !== undefined) {
  changedPackages = JSON.parse(CHANGED_PACKAGES);

  changedPackages.filter(function(file) {
    fs.readdir(`${file}/__tests__`, function(err, files) {
      if (err === null && files.length !== 0) {
        return true;
      }

      console.log('\n' + `No test were found for ${file}.` + '\n');

      return false;
    });
  });
}

const config = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  cacheDirectory: TRAVIS ? `${HOME}/.jest` : '/tmp/',
  testMatch: [`${__dirname}/packages/**/**/__tests__/**/*.(ts|tsx)`],
  // NOTE: all options with 'pattern' in the name are javascript regex's that will match if they match
  // anywhere in the string. Where-ever there are an array of patterns, jest simply 'or's all of them
  // i.e /\/__tests__\/_.*?|\/__tests__\/.*?\/_.*?|\/__tests__\/integration\//
  testPathIgnorePatterns: [
    // ignore files that a needed for tests
    '/__fixture__/_.*?',
    // ignore files that are under a directory starting with "_" at the root of __tests__
    '/__tests__\\/_.*?',
    // ignore files under __tests__ that start with an underscore
    '/__tests__\\/.*?\\/_.*?',
    // ignore tests under __tests__/integration (we override this if the INTEGRATION_TESTS flag is set)
    '/__tests__\\/integration/',
    // ignore tests under __tests__/vr (we override this if the VISUAL_REGRESSION flag is set)
    '/__tests__\\/visual-regression/',
  ],
  modulePathIgnorePatterns: ['./node_modules', '/dist/'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
  // don't transform any files under node_modules except @growcss/* and react-syntax-highlighter (it
  // uses dynamic imports which are not valid in node)
  transformIgnorePatterns: ['\\/node_modules\\/(?!@growcss|react-syntax-highlighter)'],
  setupFiles: [
    '<rootDir>/node_modules/regenerator-runtime/runtime',
    '<rootDir>/build/jest-config/index.js',
  ],
  setupTestFrameworkScriptFile: '<rootDir>/jest-framework-setup.js',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  globals: {
    __DEV__: true,
  },
  reporters: ['default', 'jest-junit'],
  testEnvironmentOptions: {
    // Need this to have jsdom loading images.
    resources: 'usable',
  },
  coverageReporters: ['lcov', 'html', 'text-summary'],
  coverageDirectory: './coverage/',
  collectCoverage: false,
  globalSetup: undefined,
  globalTeardown: undefined,
  testEnvironment: 'jsdom',
};

// If the CHANGED_PACKAGES variable is set, we parse it to get an array of changed packages and only
// run the tests for those packages
if (changedPackages !== undefined && changedPackages.length > 0) {
  console.log(changedPackages);

  config.testMatch = changedPackages.map(
    pkgPath => `${__dirname}/${pkgPath}/**/__tests__/**/*.(tsx|ts)`,
  );
}

// Adding code coverage thresold configuration for unit test only
// This should add only the packages with code coverage threshold available
// If not it will keep the same flow without code coverage check
if (COVERAGE_PACKAGES) {
  const coveragePackages = JSON.parse(COVERAGE_PACKAGES);
  config.collectCoverage = true;

  if (
    coveragePackages.collectCoverageFrom !== undefined &&
    coveragePackages.coverageThreshold !== undefined &&
    coveragePackages.collectCoverageFrom.length > 0 &&
    coveragePackages.coverageThreshold.length > 0
  ) {
    config.collectCoverageFrom = coveragePackages.collectCoverageFrom;
    config.coverageThreshold = coveragePackages.coverageThreshold;
  }
}

// If the INTEGRATION_TESTS / VISUAL_REGRESSION flag is set we need to
if (INTEGRATION_TESTS || VISUAL_REGRESSION) {
  const testPattern = process.env.VISUAL_REGRESSION
    ? 'visual-regression'
    : 'integration';

  config.testPathIgnorePatterns /*: string[] */ = config.testPathIgnorePatterns.filter(
    pattern => pattern !== `/__tests__\\/${testPattern}/`,
  );

  // If the CHANGED_PACKAGES variable is set, only integration tests from changed packages will run
  if (CHANGED_PACKAGES) {
    const changedPackages = JSON.parse(CHANGED_PACKAGES);

    config.testMatch = changedPackages.map(
      pkgPath => `${__dirname}/${pkgPath}/**/__tests__/${testPattern}/**/*.(tsx|ts)`,
    );
  } else {
    config.testMatch = [`**/__tests__/${testPattern}/**/*.(tsx|ts)`];
  }
}

// The TEST_ONLY_PATTERN is added to let us restrict a set of tests that *would* have been run; to
// only the ones that match a given pattern. This is slightly different to something like `yarn jest packages/core`
// since we can take advantage of other parts of the jest config. `TEST_ONLY_PATTERN="packages/core" yarn run test:changed`
if (TEST_ONLY_PATTERN) {
  // There is a bit to unwrap here. What we are trying to achieve is a way to pass simple options like "packages/xy-grid" and "!packages/xy-grid"
  // to our script and have them work as expected. Since this is going into the testPathIgnore variable, we do need to negate the negation however.
  // So to run only non-xy-grid tests you'd pass TEST_ONLY_PATTERN="!packages/xy-grid". To turn that into an "ignore" regex, we can simply remove the "!".
  // Note: it's important to use "packages/xy-grid" and not just "xy-grid" since xy-grid can (and does) appear in other tests paths.
  // Now, it's more complicated when we want to run tests that *only* match a specific part of a pattern.
  // We can't use a simple negative lookahead (?!packages/xy-grid/) since this match *everything* that doesn't match our pattern
  // So we essentially have to check that all characters in the string *do not* follow our negated pattern (the . and *). We then also need
  // to match this on the whole string, otherwise *any* character that matches would be a match, hence the ^ and $
  let newIgnore = `(^((?!${TEST_ONLY_PATTERN}).)*$)`;

  if (TEST_ONLY_PATTERN.startsWith('!')) {
    newIgnore = TEST_ONLY_PATTERN.substr(1);
  }

  config.testPathIgnorePatterns.push(newIgnore);
}

// Annoyingly, if the array is empty, jest will fallback to its defaults and run everything
if (config.testRegex !== undefined && config.testRegex.length === 0) {
  config.testRegex = ['DONT-RUN-ANYTHING'];
  config.collectCoverage = false;
  // only log this message if we are running in an actual terminal (output not being piped to a file
  // or a subshell)
  if (process.stdout.isTTY) {
    console.log('No packages were changed, so no tests should be run.');
  }
}

module.exports = config;
