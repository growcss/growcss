import rem from './rem';
import getValueAndUnit from './getValueAndUnit';

/**
 * Converts a unitless, pixel, or rem value to em, for use in breakpoints.
 *
 * @param {string | number | Array<string | number>} values One or more values to convert.
 * @param {number | string}                          base   The base value to use when calculating the `em`.
 *
 * @return {string}
 */
export default (
  values: string | number | (string | number)[],
  base: number | string = 16,
): string => {
  if (typeof values === 'string') {
    const match = getValueAndUnit(values);

    if (match[1] === 'em') {
      if (match[0] === 0) {
        return '0';
      }

      return values;
    }
  }

  return rem(values, base)
    .toString()
    .replace(new RegExp('rem', 'g'), 'em');
};
