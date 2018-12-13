import { mediaquery } from '@growcss/elaborate';
import { Gutters as DefaultGutters } from '../components/gutters';
import { CellStatic } from './cell-static';

/**
 *
 * @param {number}  size
 * @param {string}  breakpoint
 * @param {boolean} vertical
 *
 * @return {string}
 */
export const BreakpointCell = (
  size: number,
  breakpoint: string,
  vertical: boolean,
): string => {
  if (size === 0) {
    return '';
  }

  if (DefaultGutters[breakpoint] === undefined) {
    return '';
  }

  return mediaquery(breakpoint)`${CellStatic(
    size,
    false,
    DefaultGutters,
    'margin',
    breakpoint,
    vertical,
  )}`;
};
