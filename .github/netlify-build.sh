#!/bin/sh

rm -fr ./node_modules && ./package-lock.json

node common/scripts/install-run-rush.js install --bypass-policy

node common/scripts/install-run-rush.js link

node common/scripts/install-run-rush.js build

node common/scripts/install-run-rush.js storybook-build

mv ./build/storybook/storybook-static ./netlify-build
