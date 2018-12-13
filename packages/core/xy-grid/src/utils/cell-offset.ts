import {
  rem,
  stripUnit,
  mediaquery,
  MediaQueryOptionsProps,
  MediaQueryOptions,
} from '@growcss/elaborate';
import { Gutters as DefaultGutters, GuttersProps } from '../components/gutters';
import { CellSize } from './cell-size';

/**
 * Creates a single breakpoint sized grid.
 *
 * @param {string | number}        size               The size of your cell. Can be `full` (default) for 100% width, `auto` to use up available space and `shrink` to use up only required space.
 * @param {string}                 breakpoint         The name of the breakpoint size in your gutters array to get the size from.
 * @param {string}                 gutterType         The gutter type padding or margin.
 * @param {boolean}                vertical           Set to true to output vertical (height) styles rather than widths.
 * @param {boolean}                rtl                Array of gutter values.
 * @param {GuttersProps}           gutters            Array of gutter values.
 * @param {MediaQueryOptionsProps} mediaQueryOptions  Object of media query options.
 *
 * @return {Array<string>}
 */
export const CellOffset = (
  size: number | string,
  breakpoint: string,
  gutterType: string = 'margin',
  vertical: boolean = false,
  rtl: boolean = false,
  gutters: GuttersProps = DefaultGutters,
  mediaQueryOptions: MediaQueryOptionsProps = MediaQueryOptions,
): string => {
  let direction;

  if (vertical) {
    direction = 'top';
  } else if (rtl) {
    direction = 'right';
  } else {
    direction = 'left';
  }

  let lastBreakpointName = 'small';

  if (gutters[breakpoint] === undefined) {
    for (const breakpointName in mediaQueryOptions.breakpoints) {
      if (typeof breakpointName === 'string' && gutters[breakpointName] !== undefined) {
        lastBreakpointName = breakpointName;
      }
    }
  } else {
    lastBreakpointName = breakpoint;
  }

  let lastBreakpoint: number;

  if (typeof gutters[lastBreakpointName] === 'string') {
    lastBreakpoint = +stripUnit(`${gutters[lastBreakpointName]}`);
  } else {
    lastBreakpoint = +gutters[lastBreakpointName];
  }

  const gutter = rem(lastBreakpoint / 2);
  const gutterSize =
    gutterType === 'margin' ? `calc(${CellSize(size)} + ${gutter})` : CellSize(size);
  const css = `margin-${direction}: ${gutterSize};`;

  return mediaquery(breakpoint, mediaQueryOptions)`${css}`;
};
