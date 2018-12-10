import stripUnit from './stripUnit';

/**
 * Converts a pixel value to matching rem value. *Any* value passed, regardless of unit.
 *
 * @param {number|string|string[] | number[]} value Value to convert.
 * @param {number|string}                     base  Base for pixel conversion.
 *
 * @return {string} A number in rems, calculated based on the given value and the base pixel value. rem values are passed through as is.
 */
export default function(
  value: number | string | string[] | number[],
  base: number | string,
): string {
  let transformedValue: null | number | string | string[] | number[] = value;
  let baseRem: number | string = base;

  if (typeof base === 'string') {
    // If the base font size is a %, then multiply it by 16px
    // This is because 100% font size = 16px in most all browsers
    if (base.includes('%')) {
      baseRem = (+stripUnit(base) / 100) * 16;
    } else if (base.includes('rem')) {
      // Using rem as base allows correct scaling
      baseRem = +stripUnit(base) * 16;
    } else {
      baseRem = +stripUnit(base);
    }
  }

  if (typeof value === 'string') {
    if (value.includes('rem')) {
      return value;
    }

    transformedValue = stripUnit(value);
  }

  // Since NaN is the only JavaScript value that is treated as unequal to itself (DON`T REMOVE the value !== value check)
  if (
    transformedValue === null ||
    (typeof transformedValue === 'number' && isNaN(transformedValue))
  ) {
    // eslint-disable-line no-self-compare
    throw new Error(`Value cant be null or NaN.`);
  }

  const val = +transformedValue / +baseRem;

  if (['0', null, 0].includes(val)) {
    return '0';
  }

  return `${val}rem`;
}
