// @flow
import styled from 'styled-components';
import mediaquery, { Breakpoints as DefaultBreakpoints } from '@growcss/behavior-media-queries';
import { CellStatic } from '../utils/CellStatic';
import { CellBase } from '../utils/CellBase';
import { CellOffset } from '../utils/CellOffset';
import { CellElementAlign } from '../utils/FlexAlign';

const BreakpointGutterCss = props => {
  let breakpoints = [];
  let lastBreakpoint;

  for (const breakpoint in DefaultBreakpoints) {
    if (
      props[breakpoint] !== undefined &&
      typeof props[breakpoint] === 'number' &&
      props[breakpoint] !== 0
    ) {
      if (props.gutterSizes[breakpoint] !== undefined) {
        lastBreakpoint = breakpoint;
      }

      breakpoints = breakpoints.concat(
        mediaquery(breakpoint)`${CellStatic(
          props[breakpoint],
          props.gutterType !== undefined,
          props.gutterSizes,
          props.gutterType || 'padding',
          lastBreakpoint,
          props.vertical,
        )}`,
      );
    }
  }

  if (breakpoints.length !== 0) {
    breakpoints.push('flex-basis: auto;');
  }

  return breakpoints;
};

const CellOffsetCss = props => {
  let css = [];

  for (const breakpoint in DefaultBreakpoints) {
    if (props[`${breakpoint}Offset`] !== undefined) {
      css = css.concat(
        CellOffset(
          props[`${breakpoint}Offset`],
          breakpoint,
          props.gutterType || 'padding',
          props.vertical,
          props.gutterSizes,
        ),
      );
    }
  }

  return css;
};

const ResponsiveCellCss = props => {
  let css = [];
  const types = ['auto', 'full', 'grow', 'shrink'];
  const hasGutterType = props.gutterType !== undefined;

  css.push(CellBase(props.cellType || 'full'));
  css = css.concat(
    CellStatic(
      props.cellType || props.gridColumns,
      hasGutterType,
      props.gutterSizes,
      props.gutterType || 'padding',
      'small',
      props.vertical,
    ),
  );

  for (const breakpoint in DefaultBreakpoints) {
    if (typeof props[breakpoint] === 'string' && types.includes(props[breakpoint])) {
      css = css.concat(mediaquery(breakpoint)`
        ${CellBase(props[breakpoint])}
        ${CellStatic(
          props[breakpoint],
          hasGutterType,
          props.gutterSizes,
          props.gutterType || 'padding',
          'small',
          props.vertical,
        )}
      `);
    }
  }

  return css;
};

export const CellElement = styled.div`
  ${props => ResponsiveCellCss(props)}
  ${props => BreakpointGutterCss(props)}
  ${props => CellOffsetCss(props)}
  ${props => (props.gutterType === 'padding' ? 'box-sizing: border-box;' : '')}
  ${props => CellElementAlign(props.align || null)}
`;
