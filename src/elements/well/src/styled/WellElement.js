// @flow
import styled from 'styled-components';
import mediaquery, { Breakpoints as DefaultBreakpoints } from '@growcss/behavior-media-queries';
import remCalc from '@growcss/util-remcalc';
import type { ImagesType } from '../types';

const BreakpointGutterCss = (gutterSizes) => {
  let breakpoints = [];
  let lastBreakpoint;

  for(const breakpoint in DefaultBreakpoints) {
    if (typeof breakpoint === 'string') {
      if (gutterSizes[breakpoint] !== undefined) {
        lastBreakpoint = breakpoint;
      }

      breakpoints = breakpoints.concat(
        mediaquery(breakpoint)`margin: ${remCalc(gutterSizes[lastBreakpoint])}; padding: ${remCalc(gutterSizes[lastBreakpoint])};`
      );
    }
  }

  return breakpoints;
};

const BreakpointBackgroundImagesCss = (images: ImagesType) => {
  let breakpoints = [];

  if (images === undefined) {
    return breakpoints;
  }

  for (const breakpoint in DefaultBreakpoints) {
    if (images[breakpoint] !== undefined) {
      breakpoints = breakpoints.concat(
        mediaquery(breakpoint)`background-image: url("${images[breakpoint]}");`
      );
    }
  }

  if (breakpoints.length !== 0) {
    breakpoints.push('background-position: 50%;background-size: cover;');
  }

  return breakpoints;
};

export const WellElement = styled.section`
  display: block;
  width: 100%;
  min-height: ${props => props.theme.minHeight || props.minHeight};

  ${props => BreakpointGutterCss(props.theme.gutterSizes || props.gutterSizes)}
  ${props => BreakpointBackgroundImagesCss(props.backgroundImages)}
  
  +&WellElement {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
