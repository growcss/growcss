import _remCalc from './_remCalc';

/**
 * Converts one or more pixel values into matching rem values.
 *
 * @param {string | number | Array<string | number>} values One or more values to convert.
 * @param {number | string}                          base   The base value to use when calculating the `rem`.
 *
 * @return {string}
 */
export default (
  values: string | number | Array<string | number>,
  base: number | string = 16,
): string => {
  if (typeof values === 'string' && values.includes('rem')) {
    if (values === '0rem') {
      return '0';
    }

    return values;
  }

  if (typeof values === 'string' || typeof values === 'number') {
    return _remCalc(values, base);
  }

  const remValues: string[] = [];

  values.forEach(value => {
    remValues.push(_remCalc(value, base));
  });

  return remValues.join(' ');
};
