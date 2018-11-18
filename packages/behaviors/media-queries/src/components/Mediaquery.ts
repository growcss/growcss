import {css, InterpolationFunction, ThemeProps} from 'styled-components';
import { Breakpoints as DefaultBreakpoints, BreakpointsProps } from './Breakpoints';
import { HidpiBreakpoints, HidpiBreakpointsProps } from './HidpiBreakpoints';
import GetRuleTemplate from './GetRuleTemplate';

/**
 * Generates a media query matching the input value.
 *
 * @param {string}                value
 * @param {BreakpointsProps}      breakpoints
 * @param {HidpiBreakpointsProps} hidpiBreakpoints
 *
 * @return {function(...[any[]])}
 */
export default (
  value: string,
  breakpoints: BreakpointsProps = DefaultBreakpoints,
  hidpiBreakpoints: HidpiBreakpointsProps = HidpiBreakpoints,
) => {
  return (...args: InterpolationFunction<ThemeProps<any>>[]) => {
    const template = GetRuleTemplate(value, breakpoints, hidpiBreakpoints);
    const regex = /\(.*\)/;

    if (regex.exec(template) !== null) {
      return css`
        @media ${template} {
          // @ts-ignore
          ${css(...args)}
        }
      `;
    }

    // @ts-ignore
    return css(...args);
  };
};
