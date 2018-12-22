const hooks = require('semantic-release-monorepo-hooks');
const output = hooks();

module.exports = {
  branch: [
    "+([1-9])?(.{+([1-9]),x}).x",
    "master",
    "next",
    "next-major",
    {
      "name": "beta",
      "prerelease": true
    },
    {
      "name": "alpha",
      "prerelease": true
    }
  ],
  tagFormat: 'v${version}',
  prepare: [
    '@semantic-release/changelog',
    '@semantic-release/npm',
    {
      'path': '@semantic-release/git',
      'message': 'chore(' + output.package + '): release ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }
  ],
  publish: [
    '@semantic-release/npm',
    '@semantic-release/github'
  ],
  verifyConditions: [
    '@semantic-release/npm',
    '@semantic-release/git'
  ],
  monorepo: {
    analyzeCommits: [
      '@semantic-release/commit-analyzer'
    ],
    generateNotes: [
      '@semantic-release/release-notes-generator'
    ]
  }
};
