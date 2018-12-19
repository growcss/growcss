const { getChangedPackagesSinceMaster } = require('../utils/packages');
const codeCoverageByPackage = require('./jest.codeCoverageThreshold');

const TEST_ONLY_PATTERN = process.env.TEST_ONLY_PATTERN || '';

const coverageReducer = (result, { coverage, pkg }) => ({
  ...result,
  collectCoverageFrom: [
    ...result.collectCoverageFrom,
    `${pkg}/**/*.{js,jsx,ts,tsx}`,
  ],
  coverageThreshold: {
    ...result.coverageThreshold,
    [pkg]: coverage,
  },
});

/**
 * NOTE: This prints the coverage threshold list by changed packages since master ONLY if they have been commited.
 * It will print them all out as a json array of relative paths
 * i.e: $ node build/ci-scripts/get-code-threshold-for-changed-packages-since-master.js
 * {
 *   "collectCoverageFrom": [
 *     "<rootDir>packages/core/image/src/**"
 *   ],
 *   "coverageThreshold": {
 *     "packages/core/image":{
 *       "statements":100,
 *       "branches":100,
 *       "functions":100,
 *       "lines":100
 *     }
 *   }
 * }
 * */
(async () => {
  const changedPackages = await getChangedPackagesSinceMaster();
  const packages = [];

  changedPackages.forEach(function (pkg) {
    packages.push(pkg.location.replace(process.cwd() + '/', ''));
  });

  const testOnlyIsRemovingPattern = TEST_ONLY_PATTERN.startsWith('!');

  const changedPackagesName = packages
    // Because jest.config.js relies on `TEST_ONLY_PATTERN` logic
    // We need to add a filter to check if
    // - `TEST_ONLY_PATTERN` does not exists OR
    // - `TEST_ONLY_PATTERN` is used ignoring a directory OR
    // - `TEST_ONLY_PATTERN` is used to check a specific directory only
    .filter(
      pkg =>
        !TEST_ONLY_PATTERN ||
        pkg.startsWith(TEST_ONLY_PATTERN) ||
        (testOnlyIsRemovingPattern && !pkg.startsWith(TEST_ONLY_PATTERN)),
    )
    .map(changedPkg => changedPkg.split('/').pop());

  const reducedData = Object.keys(codeCoverageByPackage)
    .filter(pkg => {
      const pkgName = pkg
        .replace('/src', '')
        .split('/')
        .pop();

      return changedPackagesName.find(changedPkg => pkgName === changedPkg);
    })
    .map(pkg => ({ pkg, coverage: codeCoverageByPackage[pkg] }))
    .reduce(coverageReducer, {
      collectCoverageFrom: [],
      coverageThreshold: {},
    });

  console.log(
    Object.keys(reducedData).length === 0 ? {} : JSON.stringify(reducedData),
  );
})();
