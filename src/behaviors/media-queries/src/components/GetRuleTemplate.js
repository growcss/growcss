// @flow
import { Breakpoints as DefaultBreakpoints } from './Breakpoints';
import { HidpiBreakpoints } from './HidpiBreakpoints';
import { mapNext, mapNextNumber, toEm, strBreakpointJoin } from '../utils';
import type { BreakpointsType, HidpiBreakpointsType } from '../types';

const warning = require('warning');
const stripUnits = require('strip-units');

/**
 * Generates a media query for dpi.
 *
 * @param {null | string} bpMin
 * @param {number} stdWebDpi
 * @param {null | string} bpMax
 *
 * @return {string}
 */
const generateDpiMediaQuery = (
  bpMin: null | number | string,
  stdWebDpi: number,
  bpMax: null | number | string,
): string => {
  // Generate values in DPI instead of DPPX for an IE9-11/Opera mini compatibility.
  // See https://caniuse.com/#feat=css-media-resolution
  const bpMinDpi = bpMin !== null ? `${stripUnits(bpMin) * stdWebDpi}dpi` : bpMin;
  const bpMaxDpi =
    bpMax !== null ? `${parseFloat(stripUnits(bpMax) * stdWebDpi).toFixed(0)}dpi` : bpMax;

  let template = strBreakpointJoin(
    bpMin,
    parseFloat(bpMax).toFixed(5),
    '-webkit-min-device-pixel-ratio',
    '-webkit-max-device-pixel-ratio',
  );

  if (template !== '') {
    template += ', ';
  }

  return template + strBreakpointJoin(bpMinDpi, bpMaxDpi, 'min-resolution', 'max-resolution');
};

/**
 * Generates a media query template string matching the input value.
 *
 * @param {string}               value
 * @param {BreakpointsType}      breakpoints
 * @param {HidpiBreakpointsType} hidpibreakpoints
 *
 * @return {null | string}
 */
export default function(
  value: string,
  breakpoints: BreakpointsType = DefaultBreakpoints,
  hidpibreakpoints: HidpiBreakpointsType = HidpiBreakpoints,
): string {
  const split = value.split(' ');
  // Web standard Pixels per inch. (1ddpx / $std-web-dpi) = 1dpi
  // See https://www.w3.org/TR/css-values-3/#absolute-lengths
  const stdWebDpi = 96;
  // Direction of media query (up, down, or only)
  const direction = split.length > 1 ? split[1] : 'up';

  // Size or keyword
  let bp = split[0];
  // Value of the following breakpoint
  let bpNext = null;
  // Value for min-width media queries
  let bpMin = null;
  // Value for max-width media queries
  let bpMax = null;
  // If named, name of the breakpoint
  let name = null;
  // If the breakpoint is a HiDPI breakpoint
  let hidpi = false;

  if (bp === 'landscape' || bp === 'portrait') {
    return `(orientation: ${bp})`;
  } else if (bp === 'retina') {
    return '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)';
  }

  // Since NaN is the only JavaScript value that is treated as unequal to itself (DON`T REMOVE the +bp !== +bp check)
  // eslint-disable-next-line no-self-compare
  if (+bp !== +bp) {
    if (bp in breakpoints) {
      name = bp;
      bp = breakpoints[name];
      bpNext = mapNext(breakpoints, name);
    } else if (bp in hidpibreakpoints) {
      name = bp;
      bp = hidpibreakpoints[name];
      bpNext = mapNextNumber(hidpibreakpoints, bp);
      hidpi = true;
    } else {
      warning(
        true,
        `media-queries: ${value} is not defined in your "breakpoints" or "breakpoints-hidpi" setting.`,
      );
    }

    if (name === null && direction === 'only') {
      throw new Error('breakpoint: Only named media queries can have an "only" range.');
    }
  }

  // Only 'only' and 'up' have a min limit.
  if (direction === 'only' || direction === 'up') {
    if (hidpi === true) {
      bpMin = stripUnits(bp);
    } else {
      bpMin = toEm(bp);
    }
  }

  // Only 'only' and 'down' have a max limit.
  if (direction === 'only' || direction === 'down') {
    if (name === null) {
      if (hidpi === true) {
        bpMax = stripUnits(bp);
      } else {
        bpMax = toEm(bp);
      }
    } else if (bpNext !== null) {
      // If the breakpoint is named, the max limit is the following breakpoint - 1px.
      if (hidpi === true) {
        bpMax = bpNext - 1 / stdWebDpi;
      } else {
        bpMax = `${stripUnits(toEm(bpNext)) - 1 / 16}em`;
      }
    }
  }

  // Generate the media query string from min and max limits.
  if (hidpi === true) {
    return generateDpiMediaQuery(bpMin, stdWebDpi, bpMax);
  }

  return strBreakpointJoin(bpMin, bpMax);
}
