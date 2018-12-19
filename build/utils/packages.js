const { getPackages } = require('@lerna/project');
const { execSync } = require('child_process');

async function getChangedPackagesSinceCommit(commit) {
  const allPackages = await getPackages();

  const changedPackages = JSON.parse(
    execSync(`lerna ls --since ${commit} --json`, { stdio: 'pipe'}).toString(),
  ).map(pkg => pkg.name);

  return allPackages.filter(pkg => changedPackages.includes(pkg.name));
}

async function getChangedPackagesSinceMaster() {
  return getChangedPackagesSinceCommit('HEAD^1');
}

module.exports = {
  getChangedPackagesSinceCommit,
  getChangedPackagesSinceMaster
};
