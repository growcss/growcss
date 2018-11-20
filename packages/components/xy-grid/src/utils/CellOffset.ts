import mediaquery, { Breakpoints } from '@growcss/behavior-media-queries';
import { BreakpointsProps } from '@growcss/behavior-media-queries';
import remCalc from '@growcss/util-remcalc';
import { Gutters as DefaultGutters, GuttersProps } from '../components/Gutters';
import { CellSize } from './CellSize';

const stripUnits = require('strip-units');

export const CellOffset = (
  n: number | string,
  breakpoint: string,
  gutterType: string = 'margin',
  vertical: boolean = false,
  rtl: boolean = false,
  gutters: GuttersProps = DefaultGutters,
  breakpoints: BreakpointsProps = Breakpoints,
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
    for (const breakpointName in breakpoints) {
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

  const gutter = remCalc(stripUnits(gutters[lastBreakpointName]) / 2);
  const gutterSize =
    gutterType === 'margin' ? `calc(${CellSize(n)} + ${gutter})` : CellSize(n);
  const css = `margin-${direction}: ${gutterSize};`;

  return mediaquery(breakpoint, breakpoints)`${css}`;
};
