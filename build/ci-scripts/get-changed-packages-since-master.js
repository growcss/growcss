const { getChangedPackagesSinceMaster } = require('../utils/packages');

/**
 * NOTE: This prints the list of changed packages that would be the subjects of the next lerna version or lerna publish execution.
 * It will print them all out as a json array of relative paths
 * i.e: $ node build/ci-scripts/get-changed-packages-since-master.js
 *        ["packages/core/avatar", "packages/core/badge"]
 */
(async () => {
  const changedPackages = await getChangedPackagesSinceMaster();
  const packages = [];

  changedPackages.forEach(function (pkg) {
    packages.push(pkg.location.replace(process.cwd() + '/', ''));
  });

  console.log(JSON.stringify(packages));
})();
