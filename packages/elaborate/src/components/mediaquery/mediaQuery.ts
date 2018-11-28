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
 * A list of named HiDPI breakpoints. You can use these with the `breakpoint` mixin to quickly create media queries for resolutions.
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

/**
 * Generates a media query matching the input value.
 *
 * @param {string}                value
 * @param {BreakpointsProps}      breakpoints
 * @param {HidpiBreakpointsProps} hidpiBreakpoints
 *
 * @return {function(...any)}
 */
export default (
  value: string,
  breakpoints: BreakpointsProps = Breakpoints,
  hidpiBreakpoints: HidpiBreakpointsProps = HidpiBreakpoints,
) => {
  return (...args: any) => { // @TODO fix type hint
    const template = GetRuleTemplate(value, breakpoints, hidpiBreakpoints);
    const regex = /\(.*\)/;

    if (regex.exec(template) !== null) {
      // @ts-ignore
      return css`@media ${template} { ${css(...args)} }`;
    }

    // @ts-ignore
    return css(...args);
  };
};
