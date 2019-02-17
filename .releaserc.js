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
  tagFormat: PACKAGE_NAME + '@v${version}',
  prepare: [
    [
      '@semantic-release/changelog',
      {
        changelogTitle: 'Changelog'
      }
    ],
    '@semantic-release/npm',
    [
      'upgrade-dependents/semantic-release',
      {
        'workspaceDir': `${__dirname}/packages`
      }
    ],
    {
      'path': '@semantic-release/git',
      'message': 'chore(' + PACKAGE_NAME + '): release ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }
  ],
  publish: [
    '@semantic-release/npm',
    '@semantic-release/github'
  ],
  verifyConditions: [
    '@semantic-release/changelog',
  ],
  verifyRelease: ['@semantic-release/npm', '@semantic-release/github']
    .map(require)
    .map(x => x.verifyConditions),
  monorepo: {
    analyzeCommits: [
      '@semantic-release/commit-analyzer',
    ],
    generateNotes: [
      '@semantic-release/release-notes-generator',
    ]
  },
  success: false,
  fail: false,
};
