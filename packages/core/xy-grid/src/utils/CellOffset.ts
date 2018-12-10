import {
  rem,
  stripUnit,
  mediaquery,
  MediaQueryOptionsProps,
  MediaQueryOptions,
} from '@growcss/elaborate';
import { Gutters as DefaultGutters, GuttersProps } from '../components/Gutters';
import { CellSize } from './CellSize';

export const CellOffset = (
  n: number | string,
  breakpoint: string,
  gutterType: string = 'margin',
  vertical: boolean = false,
  rtl: boolean = false,
  gutters: GuttersProps = DefaultGutters,
  mediaQueryOptions: MediaQueryOptionsProps = MediaQueryOptions,
) => {
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
      if (
        typeof breakpointName === 'string' &&
        gutters[breakpointName] !== undefined
      ) {
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
    gutterType === 'margin' ? `calc(${CellSize(n)} + ${gutter})` : CellSize(n);
  const css = `margin-${direction}: ${gutterSize};`;

  return mediaquery(breakpoint, mediaQueryOptions)`${css}`;
};
