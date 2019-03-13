import { stripUnit } from '../strip-unit';

/**
 * Return media query string from the given min and/or max limits.
 * If a limit is equal to `null` or `0`, it is ignored.
 *
 * @param {null | number | string} min     - Min media query limit.
 * @param {null | number | string} max     - Max media query limit.
 * @param {string}                 minName - Name of the min media query limit. Default: min-width.
 * @param {string}                 maxName - Name of the max media query limit. Default: max-width.
 *
 * @return {string}
 */
export default function(
  min: null | number | string,
  max: null | number | string,
  minName: string = 'min-width',
  maxName: string = 'max-width',
): string {
  let minNumber = min;
  let maxNumber = max;

  if (typeof min === 'string') {
    minNumber = stripUnit(min);
  }

  if (typeof max === 'string') {
    maxNumber = stripUnit(max);
  }

  let addDelimiter = false;
  let str = '';

  if (minNumber !== null && minNumber !== 0 && !isNaN(+minNumber)) {
    str = `(${minName}: ${min})`;

    addDelimiter = true;
  }

  if (maxNumber !== null && maxNumber !== 0 && !isNaN(+maxNumber)) {
    if (addDelimiter) {
      str += ' and ';
    }

    str += `(${maxName}: ${max})`;
  }

  return str;
}
