// @flow
const stripUnits = require('strip-units');

/**
 * Return media query string from the given min and/or max limits.
 * If a limit is equal to `null` or `0`, it is ignored.
 *
 * @param {null | number | string} min     Min media query limit.
 * @param {null | number | string} max     Max media query limit.
 * @param {string} minName Name of the min media query limit. Default: min-width
 * @param {string} maxName Name of the max media query limit. Default: max-width
 *
 * @return {string}
 */
export const strBreakpointJoin = (
  min: null | number | string,
  max: null | number | string,
  minName: string = 'min-width',
  maxName: string = 'max-width',
): string => {
  const delimiter: string = ' and ';
  let str = '';

  if (min !== null && +stripUnits(min) !== 0) {
    str = `(${minName}: ${min})`;

    if (max !== null && +stripUnits(max) !== 0) {
      str += delimiter;
    }
  }

  if (max !== null && +stripUnits(max) !== 0) {
    str += `(${maxName}: ${max})`;
  }

  return str;
};
