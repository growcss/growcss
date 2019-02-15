const hooks = require('semantic-release-monorepo-hooks');
const output = hooks();
const PACKAGE_NAME = process.env.LERNA_PACKAGE_NAME || process.env.npm_package_name;

module.exports = {
  branches: [
    '+([1-9])?(.{+([1-9]),x}).x',
    'master',
    'next',
    'next-major',
    { name: 'beta', prerelease: true },
    { name: 'alpha', prerelease: true }
  ],
  tagFormat: `${PACKAGE_NAME}@\\${version}`,
  prepare: [
    '@semantic-release/changelog',
    '@semantic-release/npm',
    'upgrade-dependents/semantic-release',
    {
      'path': '@semantic-release/git',
      'message': 'chore(' + output.package + '): release ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }
  ],
  publish: [
    '@semantic-release/npm',
    '@semantic-release/github'
  ],
  verifyConditions: [],
  verifyRelease: ['@semantic-release/npm', '@semantic-release/github']
    .map(require)
    .map(x => x.verifyConditions),
  monorepo: {
    analyzeCommits: [
      '@semantic-release/commit-analyzer'
    ],
    generateNotes: [
      '@semantic-release/release-notes-generator'
    ]
  }
};
