const PACKAGE_NAME = process.env.LERNA_PACKAGE_NAME || process.env.npm_package_name;

function releaseNotesGeneratorTransform(commit, context) {
  const issues = [];

  commit.notes.forEach(note => {
    note.title = `BREAKING CHANGES`;
  });

  if (commit.type === `feat`) {
    commit.type = `Features`;
  } else if (commit.type === `fix`) {
    commit.type = `Bug Fixes`;
  } else if (commit.type === `perf`) {
    commit.type = `Performance Improvements`;
  } else if (commit.type === `revert`) {
    commit.type = `Reverts`;
  } else if (commit.type === `docs`) {
    commit.type = `Documentation`;
  } else if (commit.type === `style`) {
    return;
  } else if (commit.type === `refactor`) {
    commit.type = `Code Refactoring`;
  } else if (commit.type === `test`) {
    return;
  } else if (commit.type === `build`) {
    if (['deps-dev'].includes(commit.scope)) {
      return;
    }

    commit.type = `Build System`;
  } else if (commit.type === `ci` || commit.type === `chore`) {
    return;
  }

  if (commit.scope === `*`) {
    commit.scope = ``;
  }

  if (typeof commit.hash === `string`) {
    commit.hash = commit.hash.substring(0, 7);
  }

  if (typeof commit.subject === `string`) {
    let url = context.repository
      ? `${context.host}/${context.owner}/${context.repository}`
      : context.repoUrl;

    if (url) {
      url = `${url}/issues/`;
      // Issue URLs.
      commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
        issues.push(issue);
        return `[#${issue}](${url}${issue})`;
      });
    }

    if (context.host) {
      // User URLs.
      commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g, (_, username) => {
        if (username.includes('/')) {
          return `@${username}`
        }

        return `[@${username}](${context.host}/${username})`
      });
    }
  }

  // remove references that already appear in the subject
  commit.references = commit.references.filter(reference => !issues.includes(reference.issue));

  return commit;
};

module.exports = {
  branches: [
    '+([1-9])?(.{+([1-9]),x}).x',
    'master',
    'next',
    'next-major',
    { name: 'beta', prerelease: true },
    { name: 'alpha', prerelease: true }
  ],
  prepare: [
    '@semantic-release/changelog',
    '@semantic-release/npm',
    'upgrade-dependents/semantic-release',
    {
      'path': '@semantic-release/git',
      'message': `chore(${PACKAGE_NAME}): release ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}`
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
      [
        '@semantic-release/commit-analyzer',
        {
          preset: 'angular',
        }
      ]
    ],
    generateNotes: [
      [
        '@semantic-release/release-notes-generator',
        {
          preset: 'angular',
          writerOpts: {
            transform: releaseNotesGeneratorTransform
          },
        }
      ],
    ]
  }
};
