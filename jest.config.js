/* eslint-disable no-console */
const { CHANGED_PACKAGES, COVERAGE_PACKAGES, TEST_ONLY_PATTERN } = process.env;

const config = {
  "transform": {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  testRegex: '/__tests__/.+?\\.(ts|tsx|js|jsx)$',
  modulePathIgnorePatterns: [
    './node_modules',
    '/dist/'
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'ts',
    'tsx'
  ],
  // don't transform any files under node_modules except @growcss/* and react-syntax-highlighter (it
  // uses dynamic imports which are not valid in node)
  transformIgnorePatterns: [
    '\\/node_modules\\/(?!@growcss|react-syntax-highlighter)',
  ],
  setupFiles: [
    '<rootDir>/node_modules/regenerator-runtime/runtime',
    './build/jest-config/index.js'
  ],
  setupTestFrameworkScriptFile: `${__dirname}/jestFrameworkSetup.js`,
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ],
  globals: {
    '__DEV__': true
  },
  reporters: [
    'default',
    'jest-junit',
  ],
  testEnvironmentOptions: {
    // Need this to have jsdom loading images.
    resources: 'usable',
  },
  coverageReporters: [
    'lcov',
    'html',
    'text-summary'
  ],
  collectCoverage: false,
  collectCoverageFrom: [],
  coverageThreshold: {},
};

// If the CHANGED_PACKAGES variable is set, we parse it to get an array of changed packages and only
// run the tests for those packages
if (CHANGED_PACKAGES) {
  const changedPackages = JSON.parse(CHANGED_PACKAGES);

  config.testMatch = changedPackages.map(
    pkgPath => `${__dirname}/${pkgPath}/**/__tests__/**/*.(js|tsx|ts)`
  );
}

// Adding code coverage thresold configuration for unit test only
// This should add only the packages with code coverage threshold available
// If not it will keep the same flow without code coverage check
if (COVERAGE_PACKAGES) {
    const coveragePackages = JSON.parse(COVERAGE_PACKAGES);

    if (coveragePackages.collectCoverageFrom.length > 0) {
        config.collectCoverage = true;
        config.collectCoverageFrom = coveragePackages.collectCoverageFrom;
        config.coverageThreshold = coveragePackages.coverageThreshold;
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
if (config.testRegex.length === 0) {
  config.testRegex = ['DONT-RUN-ANYTHING'];
  config.collectCoverage = false;
  // only log this message if we are running in an actual terminal (output not being piped to a file
  // or a subshell)
  if (process.stdout.isTTY) {
    console.log('No packages were changed, so no tests should be run.');
  }
}

module.exports = config;
