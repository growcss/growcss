import { css } from 'styled-components';
import GetRuleTemplate from './_getRuleTemplate';

export interface BreakpointsProps {
  [key: string]: number
}

export interface HidpiBreakpointsProps {
  'hidpi-1': number,
  'hidpi-1-5': number,
  'hidpi-2': number,
  'retina': number,
  'hidpi-3': number,
}

export interface MediaQueryOptionsProps {
  printBreakpoint: string,
  breakpoints: BreakpointsProps,
  hidpiBreakpoints: HidpiBreakpointsProps,
}

/**
 * A list of named breakpoints. You can use these with the `breakpoint` mixin to quickly create media queries.
 *
 * @type {{small: number, medium: number, large: number, xlarge: number, xxlarge: number}}
 */
export const Breakpoints: BreakpointsProps = {
  small: 0,
  medium: 640,
  large: 1024,
  xlarge: 1200,
  xxlarge: 1440,
};

/**
 * A list of named HiDPI breakpoints. You can use these with the `mediaquery` to quickly create media queries for resolutions.
 * Values must represent the device pixels / web pixels ration and be unitless or in DPPX.
 *
 * @type {{'hidpi-1': number, 'hidpi-1-5': number, 'hidpi-2': number, retina: number, 'hidpi-3': number}}
 */
export const HidpiBreakpoints: HidpiBreakpointsProps = {
  'hidpi-1': 1,
  'hidpi-1-5': 1.5,
  'hidpi-2': 2,
  'retina': 2,
  'hidpi-3': 3,
};

export const MediaQueryOptions: MediaQueryOptionsProps = {
  printBreakpoint: 'large',
  breakpoints: Breakpoints,
  hidpiBreakpoints: HidpiBreakpoints
};

/**
 * Wraps a media query around the content you put inside the function. This mixin accepts a number of values:
 *  - If a string is passed, the mixin will look for it in the `$breakpoints` map, and use a media query there.
 *  - If a pixel value is passed, it will be converted to an em value using the default base value.
 *  - If a rem value is passed, the unit will be changed to em.
 *  - If an em value is passed, the value will be used as-is.
 *
 * @param {string}                 value             Breakpoint name, or px, rem, or em value to process.
 * @param {MediaQueryOptionsProps} mediaQueryOptions
 *
 * @return {function(...any)} If the breakpoint is "0px and larger", outputs the content as-is. Otherwise, outputs the content wrapped in a media query.
 */
export default (
  value: string = 'small',
  mediaQueryOptions: MediaQueryOptionsProps | null = null
) => {
  const options = mediaQueryOptions !== null ? mediaQueryOptions : MediaQueryOptions;

  if (options.breakpoints[Object.keys(options.breakpoints)[0]] !== 0) {
    throw new Error(`Your smallest breakpoint (defined in ${options.breakpoints}) must be set to "0".`);
  }
  
  return (...args: any) => { // @TODO fix type hint
    const template = GetRuleTemplate(value, options);
    const regex = /\(.*\)/;

    if (regex.exec(template) !== null) {
      // @ts-ignore
      return css`@media ${template} { ${css(...args)} }`;
    }

    // @ts-ignore
    return css(...args);
  };
};
