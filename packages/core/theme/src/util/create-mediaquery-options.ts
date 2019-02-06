import { MediaQueryOptionsProps } from '@growcss/elaborate/types';
import { GrowCssTheme } from '../../types';

export const createMediaQueryOptions = (theme: GrowCssTheme): MediaQueryOptionsProps => {
  return {
    printBreakpoint: theme.global.printBreakpoint,
    breakpoints: theme.global.breakpoints,
    hidpiBreakpoints: theme.global.hidpiBreakpoints,
    stdWebDpi: theme.global.stdWebDpi,
  };
};
