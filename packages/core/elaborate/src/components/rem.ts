import _remCalc from './_remCalc';
import getValueAndUnit from './getValueAndUnit';

/**
 * Converts one or more pixel values into matching rem values.
 *
 * @param {string | number | Array<string | number>} values One or more values to convert.
 * @param {number | string}                          base   The base value to use when calculating the `rem`.
 *
 * @return {string}
 */
export default (
  values: string | number | (string | number)[],
  base: number | string = 16,
): string => {
  if (typeof values === 'string') {
    const match = getValueAndUnit(values);

    if (match[1] === 'rem') {
      if (match[0] === 0) {
        return '0';
      }

      return values;
    }

    return _remCalc(values, base);
  }

  if (typeof values === 'number') {
    return _remCalc(values, base);
  }

  const remValues: string[] = [];

  values.forEach(value => {
    remValues.push(_remCalc(value, base));
  });

  return remValues.join(' ');
};
