//@flow
import { css } from 'styled-components';
import { Breakpoints as DefaultBreakpoints } from './Breakpoints';
import { HidpiBreakpoints } from './HidpiBreakpoints';
import GetRuleTemplate from './GetRuleTemplate';
import type { BreakpointsType, HidpiBreakpointsType } from '../types';

/**
 * Generates a media query matching the input value.
 *
 * @param {string}               value
 * @param {BreakpointsType}      breakpoints
 * @param {HidpiBreakpointsType} hidpibreakpoints
 *
 * @return {function(...[Array<any>])}
 */
export default (
  value: string,
  breakpoints: BreakpointsType = DefaultBreakpoints,
  hidpibreakpoints: HidpiBreakpointsType = HidpiBreakpoints,
) => {
  return (...args: Array<any>) => {
    const template = GetRuleTemplate(value, breakpoints, hidpibreakpoints);
    const regex = /\(.*\)/;

    if (regex.exec(template) !== null) {
      return css`
        @media ${template} {
          ${css(...args)}
        }
      `;
    }

    return css(...args);
  };
};
