import { mediaquery, rem } from '@growcss/elaborate';
import { styled, css, GrowCssTheme } from '@growcss/theme';
import { BaseThemedCssFunction } from 'styled-components';
// eslint-disable-next-line no-unused-vars
import { GridContainerProps } from '../../types';
import { Gutters } from '../utils/gutters';

type ExtendedGridContainerProps = GridContainerProps & { childrenCount: number };

const dividerSupport = (props: ExtendedGridContainerProps): BaseThemedCssFunction<GrowCssTheme>[] => {
  const gutters = props.theme.grid.gutters.padding;
  const gutterBreakpoint = props.theme.grid.gutterBreakpoint;
  const childrenCount = props.childrenCount;

  const cssCollection: BaseThemedCssFunction<GrowCssTheme>[] = [];

  for (const key in gutters) {
    if (
      key !== gutterBreakpoint &&
      (typeof gutters[key] === 'number' || typeof gutters[key] === 'string')
    ) {
      cssCollection.push(
        mediaquery(key)`
          & .gc-divider.vertical {
            height: calc(50% - (${rem(gutters[key])} / 2));
          }

          & .gc-divider + .gc-grid-x .gc-cell${
            childrenCount > 2 ? `:nth-child(${childrenCount / 2})` : ':first-child'
          } {
            padding-right: ${rem(gutters[key])};
            padding-bottom: 0;
          }

          & .gc-divider + .gc-grid-x .gc-cell${
            childrenCount > 2 ? `:nth-child(${childrenCount / 2})` : ':first-child'
          } + .gc-cell {
            padding-left: ${rem(gutters[key])};
            padding-top: 0;
          }
        `,
      );
    } else {
      cssCollection.push(
        mediaquery(key + ' down')`
          & .gc-divider.vertical {
            margin-left: ${rem(props.theme.divider.vertical.margin - gutters[key])};
          }
          
          & .gc-divider + .gc-grid-x .gc-cell${
            childrenCount > 2 ? `:nth-child(${childrenCount / 2})` : ':first-child'
          } {
            padding-bottom: ${rem(gutters[key])};
          }

          & .gc-divider + .gc-grid-x .gc-cell${
            childrenCount > 2 ? `:nth-child(${childrenCount / 2})` : ':first-child'
          } + .gc-cell {
            padding-top: ${rem(gutters[key])};
          }
        `,
      );
    }
  }

  return cssCollection
};

const GridContainerElement = styled.div.attrs(() => ({
  className: 'gc-grid-container',
}))<ExtendedGridContainerProps>`
  position: relative;
  max-width: ${(props: ExtendedGridContainerProps) =>
    props.type === 'fluid' || props.type === 'full'
      ? '100%'
      : rem(props.theme.grid.maxWidth)};
  margin: 0 auto;

  ${(props: ExtendedGridContainerProps) => (props.type === 'full' ? 'overflow-x: hidden;' : '')}
  ${(props: ExtendedGridContainerProps) =>
    Gutters(
      props.type === 'full' ? '0' : props.theme.grid.gutters.padding,
      'padding',
    )};

  ${(props: ExtendedGridContainerProps) => dividerSupport(props)}
`;

GridContainerElement.displayName = 'GridContainer';

export default GridContainerElement;
