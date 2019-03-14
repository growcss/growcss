'use strict';

/**
 * This script sends release notes to github. The release notes are pulled from
 * CHANGELOG.json entries and are only sent if there aren't already notes for a
 * given tag.
 */

let path = require('path');
let fs = require('fs');
let argv = require('yargs').argv;
let execSync = require('child_process').execSync;
let GitHubApi = require('github');

const EOL = '\n';

const REPO_DETAILS = {
  owner: 'growcss',
  repo: 'growcss'
};

const SHOULD_PATCH = argv.patch;
const SHOULD_APPLY = argv.apply;

// Get command line params.
if (!argv.token) {
  throw new Error('No token specified. Use --token=<token> to provide a token.');
}

if (!SHOULD_APPLY) {
  console.log('NOTE: this is a test run only. To update release notes to github, use the \'--apply\' flag.');
}

// Authenticate with github.
let github = new GitHubApi({ debug: argv.debug });

github.authenticate({
  type: 'token',
  token: argv.token
});

// Call the primary entry point.
updateReleaseNotes(SHOULD_PATCH);

/**
 * For each file within the folder tree that matches the filename, call the callback
 * with an object containing path/content.
 */
function forEachFileRecursive(folder, fileName, cb) {
  folder = folder || process.cwd();

  let folderContent = fs.readdirSync(folder).filter(name => ['node_modules', '.git'].indexOf(name) < 0);

  folderContent.filter(itemName => itemName === fileName).forEach(matchedFileName => cb({
    path: path.resolve(folder, matchedFileName),
    content: fs.readFileSync(path.resolve(folder, matchedFileName), 'utf8')
  }));

  folderContent.forEach(itemName => {
    let itemPath = path.resolve(folder, itemName);

    if (fs.lstatSync(itemPath).isDirectory()) {
      forEachFileRecursive(itemPath, fileName, cb);
    }
  });
}

/**
 * Build up the markdown from the entry description.
 */
async function getMarkdownForEntry(entry) {
  let markdown = '';
  let comments = '';

  comments += await getChangeComments('Breaking changes', entry.comments.major);
  comments += await getChangeComments('Minor changes', entry.comments.minor);
  comments += await getChangeComments('Patches', entry.comments.patch);

  if (!comments) {
    markdown += '*Changes not tracked*' +
      EOL + EOL;
  }
  else {
    markdown += comments;
  }

  return markdown;
}

/**
 * From a comment array, conditionally returns a section of markdown.
 */
async function getChangeComments(title, commentsArray) {
  let comments = '';

  if (commentsArray) {
    comments = '# ' + title + (EOL + EOL);

    for (let i = 0; i < commentsArray.length; i++) {
      let comment = commentsArray[i];
      let searchResult;

      comments += `- ${comment.comment}`;

      if (comment.commit) {
        comments += ` ([commit](https://github.com/${REPO_DETAILS.owner}/${REPO_DETAILS.repo}/commit/${comment.commit})`;
        searchResult = await getPullRequest(comment.commit);

        if (searchResult) {
          comments += ` by [${searchResult.author}](${searchResult.authorUrl}), pr [#${searchResult.number}](${searchResult.url})`;
        }

        comments += `)`;
      }

      comments += EOL;
    }

    comments += EOL;
  }

  return comments;
};

function getPullRequest(commitHash) {
  return new Promise((resolve, reject) => {

    github.search.issues({ q: commitHash }, (response, result) => {
      if (result && result.items && result.items.length >= 1) {
        let item = result.items.find(
          item => item.repository_url === `https://api.github.com/repos/${REPO_DETAILS.owner}/${REPO_DETAILS.repo}`
        );

        if (item) {
          resolve({
            number: item.number,
            url: item.html_url,
            author: item.user.login,
            authorUrl: item.user.html_url
          });

          return;
        }
      }

      resolve(null);
    });

  });
}

/**
 * Builds a map of changelog tags to entries defined in CHANGELOG.json files.
 */
function getChangelogTagMap() {
  let map = new Map();

  forEachFileRecursive(undefined, 'CHANGELOG.json', (result) => {
    let changelog = JSON.parse(result.content);

    changelog.entries.forEach(entry => {
      entry.name = changelog.name;
      map.set(entry.tag, entry);
    });
  });

  return map;
}

/**
 * Gets all the tags in a repo using 'git tag'.
 */
function getTags() {
  let tags = new Set();
  let count = 0;

  execSync('git tag', {
    cwd: process.cwd()
  }).toString().split('\n').forEach(tag => {
    if (tag) {
      tags.add(tag);
      count++;
    }
  });

  console.log(`Found ${count} tag(s).`);

  return tags;
}

/**
 * Gets all releases from github.
 */
function getReleases(cb) {
  let releases = new Map();
  let count = 0;

  function onPageReceived(err, res) {
    if (err) {
      throw new Error('Could not get releases from github.\n' + err);
    }

    res.forEach(release => {
      releases.set(release.tag_name, release);
      count++;
    });

    if (github.hasNextPage(res)) {
      github.getNextPage(res, onPageReceived);
    } else {
      console.log(`Found ${count} releases on github.`);

      cb(releases);
    }
  }

  github.repos.getReleases(REPO_DETAILS, onPageReceived);
}

/**
 * Adds new release notes, and if shouldPatchChangelog is true, will patch existing ones in the case
 * that they need to be regenerated.
 */
function updateReleaseNotes(shouldPatchChangelog) {
  let changelogEntries = getChangelogTagMap();
  let publishedTags = getTags();

  getReleases((releases) => {
    let count = 0;

    publishedTags.forEach(async tag => {
      let entry = changelogEntries.get(tag);
      let hasBeenReleased = releases.has(tag);

      if (entry) {
        let releaseDetails = Object.assign({}, REPO_DETAILS, {
          'tag_name': entry.tag,
          'name': `${entry.name} v${entry.version}`,
          'body': entry.body,
          'draft': false,
          'prerelease': false
        });

        if (!hasBeenReleased && SHOULD_APPLY && !SHOULD_PATCH) {
          console.log(`Creating release notes for ${entry.name} ${entry.version}`);
          count++;

          releaseDetails.body = await getMarkdownForEntry(entry);

          github.repos.createRelease(releaseDetails, (err, cb) => {
            if (err) {
              throw new Error(`Failed to commit release notes for ${entry.name} ${entry.version}.${EOL}${err}`);
            }

            console.log(`Successfully created release notes for ${entry.name} ${entry.version}`);
          });
        } else if (SHOULD_PATCH) {
          console.log(`Patching release notes for ${entry.name} ${entry.version}`);
          count++;

          if (SHOULD_APPLY) {
            releaseDetails.id = releases.get(tag).id;
            releaseDetails.body = await getMarkdownForEntry(entry);

            github.repos.editRelease(releaseDetails, (err, cb) => {
              if (err) {
                throw new Error(`Failed to commit release notes for ${entry.name} ${entry.version}.${EOL}${err}`);
              }

              console.log(`Successfully updated release notes for ${entry.name} ${entry.version}`);
            });
          }
        }
      }
    });

    if (!count) {
      console.log('No changes were applied.');
    }

  });
}
