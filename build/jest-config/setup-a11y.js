import expect from 'expect';
const { toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);
