import stripUnit from './stripUnit';

/**
 * Converts a unitless, pixel, or rem value to em, for use in breakpoints.
 *
 * @param {number|string} value
 *
 * @return {string}
 */

export default function(value: number | string, base: string | number = 16): string {
  const regex = new RegExp('px+$');

  // Since NaN is the only JavaScript value that is treated as unequal to itself (DON`T REMOVE the value !== value check)
  if ((typeof value === 'string' && regex.exec(value) !== null) || ! (+value !== +value)) {// eslint-disable-line no-self-compare
    return `${stripUnit(value) / +base}em`;
  }

  if (typeof value === 'string') {
    return `${stripUnit(value)}em`;
  }

  return `${value}em`;
};
