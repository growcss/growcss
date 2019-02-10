import styled from 'styled-components';
import { mediaquery } from '@growcss/elaborate';
import { GrowCssTheme, getThemeValue } from '@growcss/theme';
import { CellStatic } from '../utils/cell-static';
import { CellBase } from '../utils/cell-base';
import { CellOffset } from '../utils/cell-offset';
import { CellElementAlign } from '../utils/flex-align';

type GutterCssProps = {
  gutterType: string | undefined;
  vertical: boolean;
  theme: GrowCssTheme;
};

/**
 * @param {GutterCssProps} props
 *
 * @return {Array<string>}
 */
const BreakpointGutterCss = (props: GutterCssProps): string[] => {
  let breakpoints: string[] = [];
  let lastBreakpoint;
  const { theme, vertical } = props;
  const gutterType = props.gutterType || 'padding';
  const gutterSizes = getThemeValue(`grid.${gutterType}Gutters`)(theme);
  const globalBreakpoints = getThemeValue('global.breakpoints')(theme);

  for (const breakpoint in globalBreakpoints) {
    if (
      props[breakpoint] !== undefined &&
      typeof props[breakpoint] === 'number' &&
      props[breakpoint] !== 0
    ) {
      if (gutterSizes[breakpoint] !== undefined) {
        lastBreakpoint = breakpoint;
      }

      breakpoints = breakpoints.concat(
        mediaquery(breakpoint)`${CellStatic(
          gutterSizes,
          props[breakpoint],
          props.gutterType !== undefined,
          gutterType,
          lastBreakpoint,
          vertical,
        )}`,
      );
    }
  }

  if (breakpoints.length !== 0) {
    breakpoints.push('flex-basis: auto;');
  }

  return breakpoints;
};

const CellOffsetCss = (props): string[] => {
  const css: string[] = [];
  const { theme, vertical } = props;
  const globalBreakpoints = getThemeValue('global.breakpoints')(theme);
  const gutterType = props.gutterType || 'padding';
  const gutterSizes = getThemeValue(`grid.${gutterType}Gutters`)(theme);

  for (const breakpoint in globalBreakpoints) {
    if (props[`${breakpoint}Offset`] !== undefined) {
      css.push(
        CellOffset(
          props[`${breakpoint}Offset`],
          breakpoint,
          gutterSizes,
          gutterType,
          vertical,
          false,
        ),
      );
    }
  }

  return css;
};

type ResponsiveCellCssProps = {
  cellType: string | undefined;
  gridColumns: number;
} & GutterCssProps;

const ResponsiveCellCss = (props: ResponsiveCellCssProps): string[] => {
  let css: string[] = [];
  const { theme, vertical, cellType, gridColumns } = props;
  const types = ['auto', 'full', 'grow', 'shrink'];
  const hasGutterType = props.gutterType !== undefined;
  const gutterType = props.gutterType || 'padding';
  const gutterSizes = getThemeValue(`grid.${gutterType}Gutters`)(theme);
  const globalBreakpoints = getThemeValue('global.breakpoints')(theme);
  const gutterBreakpoint = getThemeValue('global.gutterBreakpoint')(theme);

  css.push(CellBase(cellType || 'full'));
  css = css.concat(
    CellStatic(
      gutterSizes,
      cellType || gridColumns,
      hasGutterType,
      gutterType,
      gutterBreakpoint,
      vertical,
    ),
  );

  for (const breakpoint in globalBreakpoints) {
    if (typeof props[breakpoint] === 'string' && types.includes(props[breakpoint])) {
      css = css.concat(mediaquery(breakpoint)`
        ${CellBase(props[breakpoint])}
        ${CellStatic(
          gutterSizes,
          props[breakpoint],
          hasGutterType,
          gutterType,
          gutterBreakpoint,
          vertical,
        )}
      `);
    }
  }

  return css;
};

export type CellElementProps = {
  gutterType: string | undefined;
  align: string | null | undefined;
} & ResponsiveCellCssProps;

export const CellElement = styled.div<CellElementProps>`
  ${props => ResponsiveCellCss(props)}
  ${props => BreakpointGutterCss(props)}
  ${props => CellOffsetCss(props)}
  ${props => (props.gutterType === 'padding' ? 'box-sizing: border-box;' : '')}
  ${props => CellElementAlign(props.align || null)}
`;
