import {mediaquery} from '@growcss/elaborate';
import {Gutters as DefaultGutters} from '../components/Gutters';
import {CellStatic} from './CellStatic';

export const BreakpointCell = (
  n: number,
  breakpoint: string,
  vertical: boolean,
) => {
  if (n === 0) {
    return [];
  }

  if (DefaultGutters[breakpoint] === undefined) {
    return [];
  }

  return mediaquery(breakpoint)`${CellStatic(
    n,
    false,
    DefaultGutters,
    'margin',
    breakpoint,
    vertical,
  )}`;
};
