//@flow
import type { HidpiBreakpointsType } from '../types';

/**
 * A list of named HiDPI breakpoints. You can use these with the `breakpoint` mixin to quickly create media queries for resolutions.
 * Values must represent the device pixels / web pixels ration and be unitless or in DPPX.
 *
 * @type {{'hidpi-1': number, 'hidpi-1-5': number, 'hidpi-2': number, retina: number, 'hidpi-3': number}}
 */
export const HidpiBreakpoints: HidpiBreakpointsType = {
  'hidpi-1': 1,
  'hidpi-1-5': 1.5,
  'hidpi-2': 2,
  retina: 2,
  'hidpi-3': 3,
};
