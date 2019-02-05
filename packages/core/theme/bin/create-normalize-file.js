#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const cleanRegexp = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm;

const normalizePackage = JSON.parse(
  fs.readFileSync('./node_modules/normalize.css/package.json', 'utf8'),
);
const normalizeMain = path.join('./node_modules/normalize.css', normalizePackage.main);
const normalizeContent = fs.readFileSync(normalizeMain, 'utf8');

const cleanedContent = normalizeContent
  .replace(cleanRegexp, '')
  .replace(/^\s*\n/gm, '')
  .replace(/\s+$/gm, '')
  .replace(/"/gm, "'");

const resultContent = `import { css } from 'styled-components';

export default css\`
  ${cleanedContent}
\`;
`;

fs.writeFileSync(path.resolve(__dirname, '..', 'src', 'normalize.ts'), resultContent);
