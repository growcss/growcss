import styled from 'styled-components';
import {mediaquery,Breakpoints} from '@growcss/elaborate';
import {CellStatic} from '../utils/CellStatic';
import {CellBase} from '../utils/CellBase';
import {CellOffset} from '../utils/CellOffset';
import {CellElementAlign} from '../utils/FlexAlign';
import {GuttersProps} from '..';

type GutterCssProps = {
  gutterSizes: GuttersProps,
  gutterType: string | undefined,
  vertical: boolean,
}

const BreakpointGutterCss = (props: GutterCssProps) => {
  let breakpoints: string[] = [];
  let lastBreakpoint;

  for(const breakpoint in Breakpoints) {
    if (props[breakpoint] !== undefined && typeof props[breakpoint] === 'number' && props[breakpoint] !== 0) {
      if (props.gutterSizes[breakpoint] !== undefined) {
        lastBreakpoint = breakpoint;
      }

      breakpoints = breakpoints.concat(
        mediaquery(breakpoint)`${CellStatic(props[breakpoint], props.gutterType !== undefined, props.gutterSizes, (props.gutterType || 'padding'), lastBreakpoint, props.vertical)}`
      );
    }
  }

  if (breakpoints.length !== 0) {
    breakpoints.push('flex-basis: auto;');
  }

  return breakpoints;
};

// type CellOffsetCssProps = {
//   [key: string]: number,
// } & GutterCssProps

const CellOffsetCss = (props) => {
  let css = [];

  for(const breakpoint in Breakpoints) {
    if (props[`${breakpoint}Offset`] !== undefined) {
      css = css.concat(CellOffset(props[`${breakpoint}Offset`], breakpoint, (props.gutterType || 'padding'), props.vertical, false, props.gutterSizes));
    }
  }

  return css;
};

type ResponsiveCellCssProps = {
  cellType: string | undefined,
  gridColumns: number,
} & GutterCssProps

const ResponsiveCellCss = (props: ResponsiveCellCssProps) => {
  let css: string[] = [];
  const types = ['auto', 'full', 'grow', 'shrink'];
  const hasGutterType = props.gutterType !== undefined;

  css.push(CellBase(props.cellType || 'full'));
  css = css.concat(CellStatic((props.cellType || props.gridColumns), hasGutterType, props.gutterSizes, (props.gutterType || 'padding'), 'small', props.vertical));

  for(const breakpoint in Breakpoints) {
    if (typeof props[breakpoint] === 'string' && types.includes(props[breakpoint])) {
      css = css.concat(mediaquery(breakpoint)`
        ${CellBase(props[breakpoint])}
        ${CellStatic(props[breakpoint], hasGutterType, props.gutterSizes, (props.gutterType || 'padding'), 'small', props.vertical)}
      `);
    }
  }

  return css;
};

export type CellElementProps = {
    gutterType: string | undefined,
    align: string | null | undefined
} & ResponsiveCellCssProps

export const CellElement = styled.div<CellElementProps>`
  ${props => ResponsiveCellCss(props)}
  ${props => BreakpointGutterCss(props)}
  ${props => CellOffsetCss(props)}
  ${props => props.gutterType === 'padding' ? 'box-sizing: border-box;' : ''}
  ${props => CellElementAlign(props.align || null)}
`;
