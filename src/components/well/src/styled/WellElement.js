// @flow
import styled from 'styled-components';
import mediaquery, {
  Breakpoints as DefaultBreakpoints,
} from '@growcss/behavior-media-queries';
import remCalc from '@growcss/util-remcalc';
import Image from '@growcss/element-image';

const BreakpointGutterCss = (gutterSizes, callback) => {
  let breakpoints = [];
  let lastBreakpoint;

  for (const breakpoint in DefaultBreakpoints) {
    if (typeof breakpoint === 'string') {
      if (gutterSizes[breakpoint] !== undefined) {
        lastBreakpoint = breakpoint;
      }

      breakpoints = breakpoints.concat(
        mediaquery(breakpoint)`${callback(remCalc(gutterSizes[lastBreakpoint],))}`,
      );
    }
  }

  return breakpoints;
};

export const WellElement = styled.section`
  width: 100%;
  min-height: ${props => props.theme.minHeight || props.minHeight};

  position: relative;
  display: block;
  overflow: hidden;
  outline: none;

  ${props => BreakpointGutterCss(props.theme.gutterSizes || props.gutterSizes, (size) => { return `margin: ${size};padding: ${size};` })}

  +&WellElement {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &:first-child {
    margin-top: 0;
  }

  &.has-background-images {
    .gc-well-image {
      ${props => BreakpointGutterCss(props.theme.gutterSizes || props.gutterSizes, (size) => { return `margin: -${size};` })}
    }

    .gc-well-content {
      width: 100%;
      height: 100%;

      position: relative;
      top: 0;
      left: 0;
      z-index: 2;
    }

    .gc-well-image-curtain {
      background: black;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      opacity: 0.5;
    }
  }
`;
