#!/usr/bin/env node
const isProduction = process.argv.indexOf('--production') >= 0;
const hasTypes = process.argv.indexOf('--generate-types') >= 0;
const { exec } = require('child_process');

exec(
  `cross-env NODE_ENV="${(isProduction ? 'production' : 'development')}" GENERATE_TYPES="${hasTypes}" rollup -c ./node_modules/@build/rollup/rollup.config.js`,
  (err, stdout, stderr) => {
    if (err) {
      console.error(err);

      return;
    }

    if (stdout !== '') {
      console.log(stdout);
    }

    if (stderr !== '') {
      console.error(stderr);
    }
  }
);
