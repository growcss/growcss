// @flow
const stripUnits = require('strip-units');

/**
 * Converts a unitless, pixel, or rem value to em, for use in breakpoints.
 *
 * @param {number | string} value
 *
 * @return {string}
 */
export const toEm = (value: number | string): string => {
  const regex = new RegExp('px+$');

  // Since NaN is the only JavaScript value that is treated as unequal to itself (DON`T REMOVE the value !== value check)
  // eslint-disable-next-line no-self-compare
  if ((typeof value === 'string' && regex.exec(value) !== null) || !(+value !== +value)) {
    return `${stripUnits(value) / 16}em`;
  }

  return `${stripUnits(value)}em`;
};
