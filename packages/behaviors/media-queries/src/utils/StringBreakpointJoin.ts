import stripUnit from 'polished/lib/helpers/stripUnit';

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
  maxName: string = 'max-width'
): string => {
  const delimiter: string = ' and ';
  let str = '';
  let minWidth = min;
  let maxWidth = max;

  if (typeof min === 'string') {
    minWidth = +stripUnit(min);
  }

  if (typeof max === 'string') {
    maxWidth = +stripUnit(max);
  }

  if (minWidth !== null && minWidth !== 0) {
    str = `(${minName}: ${minWidth})`;

    if (maxWidth !== null && maxWidth !== 0) {
      str += delimiter;
    }
  }

  if (maxWidth !== null && maxWidth !== 0) {
    str += `(${maxName}: ${maxWidth})`;
  }

  return str;
};
