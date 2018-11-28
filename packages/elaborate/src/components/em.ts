import rem from './rem';

/**
 * Converts a unitless, pixel, or rem value to em, for use in breakpoints.
 *
 * @param {string | number | Array<string | number>} values One or more values to convert.
 * @param {number | string}                          base   The base value to use when calculating the `em`.
 *
 * @return {string}
 */
export default (
  values: string | number | Array<string | number>,
  base: number | string = 16,
): string => {
  if (typeof values === 'string' && values.includes('em')) {
    if (values === '0em') {
      return '0';
    }

    return values;
  }

  return (rem(values, base)).toString().replace(new RegExp('rem', 'g'), 'em');
};
