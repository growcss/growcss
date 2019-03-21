import { MediaQueryOptionsProps } from '../../../elaborate/types';
import { GrowCssTheme } from '../../types';

export const createMediaQueryOptions = (theme: GrowCssTheme): MediaQueryOptionsProps => {
  return {
    printBreakpoint: theme.global.breakpoint.print,
    breakpoints: theme.global.breakpoints,
    hidpiBreakpoints: theme.global.hidpiBreakpoints,
    stdWebDpi: theme.global.stdWebDpi,
  };
};
