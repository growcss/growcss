import stripUnit from './stripUnit';

/**
 * Converts a unitless, pixel, or rem value to em, for use in breakpoints.
 *
 * @param {number|string} value
 * @param {number|string} base
 *
 * @return {string}
 */

export default function(value: number | string, base: number | string = 16): string {
  let transformedValue: null | number | string = value;

  if (typeof value === 'string') {
    if (value.includes('em')) {
      return value;
    }

    transformedValue = stripUnit(value);
  }

  // Since NaN is the only JavaScript value that is treated as unequal to itself (DON`T REMOVE the value !== value check)
  if (transformedValue === null || (typeof transformedValue === 'number' && isNaN(transformedValue))) { // eslint-disable-line no-self-compare
    throw new Error(`Value cant be null or NaN. ${transformedValue}`);
  }

  return `${+transformedValue / +base}em`;
};
