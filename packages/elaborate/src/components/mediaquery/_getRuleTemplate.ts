import mapNext from './_mapNext';
import mapNextNumber from './_mapNextNumber';
import strBreakpointJoin from './_stringBreakpointJoin';
import stripUnit from '../stripUnit';
import {MediaQueryOptionsProps} from './mediaQuery';
import em from '../em';

const warning = require('warning');

export const allowedTypes = [
  'all',     // Suitable for all devices.
  'print',   // Intended for paged, opaque material and for documents viewed on screen in print preview mode. Please consult the section on paged media.
  'screen',  // Intended primarily for color computer screens. (Matches all devices that aren’t matched by print or speech.)
  'speech',  // Matches screenreaders and similar devices that “read out” a page.
  // deprecated
  'aural',      // Intended for speech synthesizers.
  'braille',    // Intended for braille tactile feedback devices.
  'embossed',   // Intended for paged braille printers.
  'handheld',   // Intended for handheld devices (typically small screen, monochrome, limited bandwidth).
  'projection', // Intended for projected presentations, for example projectors or print to transparencies. Please consult the section on paged media.
  'tty',        // Intended for media using a fixed-pitch character grid, such as teletypes, terminals, or portable devices with limited display capabilities.
  'tv',         // Intended for television-type devices.
];

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
  let bpMinSize = bpMin;
  let bpMaxSize = bpMax;

  if (typeof bpMinSize === 'string') {
    bpMinSize = stripUnit(bpMinSize);
  }

  if (typeof bpMaxSize === 'string') {
    bpMaxSize = stripUnit(bpMaxSize);
  }

  // Generate values in DPI instead of DPPX for an IE9-11/Opera mini compatibility.
  // See https://caniuse.com/#feat=css-media-resolution
  const bpMinDpi =
    bpMinSize !== null ? `${+bpMinSize * stdWebDpi}dpi` : bpMinSize;
  const bpMaxDpi =
    bpMaxSize !== null
      ? `${parseFloat(`${+bpMaxSize * stdWebDpi}`).toFixed(0)}dpi`
      : bpMaxSize;

  const onlyScreen = 'only screen and ';

  if (bpMaxSize !== null) {
    bpMaxSize = parseFloat(`${bpMaxSize}`).toFixed(5);
  }

  let template = '';
  let query = strBreakpointJoin(
    bpMinSize,
    bpMaxSize,
    '-webkit-min-device-pixel-ratio',
    '-webkit-max-device-pixel-ratio',
  );

  if (query !== '') {
    template += `${onlyScreen}${query}, `;
  }

  query = strBreakpointJoin(
    bpMinSize,
    bpMaxSize,
    'min--moz-device-pixel-ratio',
    'max--moz-device-pixel-ratio',
  );

  if (query !== '') {
    template += `${onlyScreen}${query}, `;
  }

  query = strBreakpointJoin(
    bpMinSize !== null ? `${+bpMinSize * 2}/2` : null,
    bpMaxSize !== null ? `${+bpMaxSize * 2}/2` : null,
    '-o-min-device-pixel-ratio',
    '-o-max-device-pixel-ratio',
  );

  if (query !== '') {
    template += `${onlyScreen}${query}, `;
  }

  query = strBreakpointJoin(bpMinDpi, bpMaxDpi, 'min-resolution', 'max-resolution');

  if (query !== '') {
    template += `${onlyScreen}${query}`;
  }

  return template;
};

/**
 * Generates a level 3 media query template string matching the input value.
 *
 * @param {Array<string>}          matches
 * @param {MediaQueryOptionsProps} options
 *
 * @return {string}
 */
const generateLevel3Queries = (matches: Array<string>, options: MediaQueryOptionsProps): string => {
  // Direction of media query (up, down, or only)
  const direction = matches[3] !== undefined ? matches[3] : 'up';
  const printBreakpoint = options.breakpoints[options.printBreakpoint];

  // Size or keyword
  let bp: string | number = matches[2];
  // Value of the following breakpoint
  let bpNext: null | number = null;
  // Value for min-width media queries
  let bpMin: null | number | string = null;
  // Value for max-width media queries
  let bpMax: null | number | string = null;
  // If named, name of the breakpoint
  let name: null | string = null;

  // Since NaN is the only JavaScript value that is treated as unequal to itself (DON`T REMOVE the +bp !== +bp check)
  // eslint-disable-next-line no-self-compare
  if (+bp !== +bp) {
    if (bp in options.breakpoints) {
      name = bp;
      bp = options.breakpoints[name];
      bpNext = mapNext(options.breakpoints, name);
    } else if (bp in options.hidpiBreakpoints) {
      name = bp;
      bp = options.hidpiBreakpoints[name];
      bpNext = mapNextNumber(options.hidpiBreakpoints, +bp);
    } else {
      warning(
        true,
        `media-queries: ${bp} is not defined in your "breakpoints" or "breakpoints-hidpi" setting.`,
      );
    }

    if (name === null && direction === 'only') {
      throw new Error(
        'breakpoint: Only named media queries can have an "only" range.',
      );
    }
  }

  if (bp === value) {
    return '';
  }

  // Conditions to skip media query creation
  // - It's a named breakpoint that resolved to "0 down" or "0 up"
  // - It's a numeric breakpoint that resolved to "0 " + anything
  if (bp > '0' || bp > 0 || direction === 'only' || direction === 'down') {
    // Only 'only' and 'up' have a min limit.
    if (direction === 'only' || direction === 'up') {
      bpMin = em(bp);
    }

    // Only 'only' and 'down' have a max limit.
    if (direction === 'only' || direction === 'down') {
      if (name === null) {
        bpMax = em(bp);
      } else if (bpNext !== null) {
        // If the breakpoint is named, the max limit is the following breakpoint - 1px.
        bpMax = bpNext - 1 <= 0 ? '0' : `${+stripUnit(em(bpNext)) - 1 / 16}em`;
      }
    }

    let query = strBreakpointJoin(bpMin, bpMax);

    if (query !== '') {
      query = `only screen and ${query}`;
      // For named breakpoints less than or equal to printBreakpoint, add print to the media types
      if (bp <= printBreakpoint || direction === 'down') {
        // query = `print, ${query}`;
        query = `${query}`;
      }
    }

    return query;
  }

  return '';
};

/**
 * Generates a level 4 media query template string matching the input value.
 *
 * @param {Array<string>}          matches
 * @param {MediaQueryOptionsProps} options
 *
 * @return {string}
 */
const generateLevel4Queries = (matches: Array<string>, options: MediaQueryOptionsProps): string => {
  console.log(matches, options);
  return '';
};

/**
 * Generates a media query template string matching the input value.
 *
 * @param {string}                 value
 * @param {MediaQueryOptionsProps} options
 *
 * @return {string}
 */
export default function(
  value: string,
  options: MediaQueryOptionsProps
): string {
  if (allowedTypes.includes(value.replace('not ', '').trim())) {
    return value;
  }

  if (['landscape', 'portrait'].includes(value)) {
    return `(orientation: ${value})`;
  }

  if (value === 'retina') {
    return 'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi)';
  }

  const level4Regex = /\((.*)(=|<|<=|>|>=)(.*)((=|<|<=|>|>=)(.*))?\)/;
  const level4RegexMatches = level4Regex.exec(value);

  if (level4RegexMatches !== null) {
    return generateLevel4Queries(level4RegexMatches, options);
  }

  const level3Regex = new RegExp(`(.*[, ] )?(not )?([${Object.keys({...options.breakpoints, allowedTypes}).join('|')}]+)( [up|down|only]+)?`);
  const level3RegexMatches = level3Regex.exec(value);

  if (level3RegexMatches !== null) {
    return generateLevel3Queries(level3RegexMatches, options);
  }

  const hiDPIRegex = new RegExp(`(.*[, ] )?(not )?([${Object.keys({...options.breakpoints, allowedTypes}).join('|')}]+)( [up|down|only]+)?`);
  const hiDPIRegexMatches = hiDPIRegex.exec(value);

  if (hiDPIRegexMatches === null) {
    return '';
  }
  // Web standard Pixels per inch. (1ddpx / stdWebDpi) = 1dpi
  // See https://www.w3.org/TR/css-values-3/#absolute-lengths
  const stdWebDpi = 96;
  // Direction of media query (up, down, or only)
  const direction = hiDPIRegexMatches[3] !== undefined ? hiDPIRegexMatches[3] : 'up';

  // Size or keyword
  let bp: string | number = hiDPIRegexMatches[2];
  // Value of the following breakpoint
  let bpNext: null | number = null;
  // Value for min-width media queries
  let bpMin: null | number | string = null;
  // Value for max-width media queries
  let bpMax: null | number | string = null;
  // If named, name of the breakpoint
  let name: null | string = null;

  // Since NaN is the only JavaScript value that is treated as unequal to itself (DON`T REMOVE the +bp !== +bp check)
  // eslint-disable-next-line no-self-compare
  if (+bp !== +bp) {
    if (bp in options.breakpoints) {
      name = bp;
      bp = options.breakpoints[name];
      bpNext = mapNext(options.breakpoints, name);
    } else if (bp in options.hidpiBreakpoints) {
      name = bp;
      bp = options.hidpiBreakpoints[name];
      bpNext = mapNextNumber(options.hidpiBreakpoints, +bp);
    } else {
      warning(
        true,
        `media-queries: ${value} is not defined in your "breakpoints" or "breakpoints-hidpi" setting.`,
      );
    }

    if (name === null && direction === 'only') {
      throw new Error(
        'breakpoint: Only named media queries can have an "only" range.',
      );
    }
  }

  if (bp === value) {
    return '';
  }

  // Conditions to skip media query creation
  // - It's a named breakpoint that resolved to "0 down" or "0 up"
  // - It's a numeric breakpoint that resolved to "0 " + anything
  if (bp > '0' || bp > 0 || direction === 'only' || direction === 'down') {
    // Only 'only' and 'up' have a min limit.
    if (direction === 'only' || direction === 'up') {
      bpMin = typeof bp === 'string' ? stripUnit(bp) : bp;
    }

    // Only 'only' and 'down' have a max limit.
    if (direction === 'only' || direction === 'down') {
      if (name === null) {
        bpMax = typeof bp === 'string' ? stripUnit(bp) : bp;
      } else if (bpNext !== null) {
        // If the breakpoint is named, the max limit is the following breakpoint - 1px.
        bpMax = bpNext - 1 / stdWebDpi;
      }
    }

    return generateDpiMediaQuery(bpMin, stdWebDpi, bpMax);
  }

  return '';
}
