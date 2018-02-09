//@flow
import type { BreakpointsType } from '../types';

/**
 * A list of named breakpoints. You can use these with the `breakpoint` mixin to quickly create media queries.
 *
 * @type {{small: number, medium: number, large: number, xlarge: number, xxlarge: number}}
 */
export const Breakpoints: BreakpointsType = {
  small: 0,
  medium: 640,
  large: 1024,
  xlarge: 1200,
  xxlarge: 1440,
};
