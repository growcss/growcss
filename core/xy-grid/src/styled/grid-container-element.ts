import { Children, ReactNode } from 'react';
import {mediaquery, rem} from '@growcss/elaborate';
import { getThemeValue, styled, css } from '@growcss/theme';
// eslint-disable-next-line no-unused-vars
import { GridContainerProps } from '../../types';
import { Gutters } from '../utils/gutters';

const dividerSupport = (props: GridContainerProps) => {
  const gutters = getThemeValue('grid.gutters.padding')(props.theme);
  const gutterBreakpoint = getThemeValue('grid.gutterBreakpoint')(props.theme);
  let childrenCount = 0;

  Children.toArray(props.children).forEach((child: ReactNode) => {
    if (child.type !== undefined && ['GridX', 'GridY'].includes(child.type.displayName) && child.props.children !== undefined) {
      childrenCount = Children.count(child.props.children);
    }
  });

  const strings: string[] = [];

  for (const key in gutters) {
    if (key !== gutterBreakpoint && (typeof gutters[key] === 'number' || typeof gutters[key] === 'string')) {
      strings.push(
        mediaquery(key)`
          & .gc-divider.vertical {
            height: calc(50% - (${rem(gutters[key])} / 2));
          }
            
          & .gc-divider + .gc-grid-x .gc-cell${childrenCount < 2 ? `:nth-child(${childrenCount} / 2)` : ''} {
            padding-right: ${rem(gutters[key])};
          }

          & .gc-divider + .gc-grid-x .gc-cell${childrenCount < 2 ? `:nth-child(${childrenCount} / 2)` : ''} + .gc-cell {
            padding-left: ${rem(gutters[key])};
          }
        `,
      );
    } else {
      strings.push(
        mediaquery(key)`            
          & .gc-divider + .gc-grid-x .gc-cell${childrenCount < 2 ? `:nth-child(${childrenCount} / 2)` : ''} {
            padding-top: ${rem(gutters[key])};
          }

          & .gc-divider + .gc-grid-x .gc-cell${childrenCount < 2 ? `:nth-child(${childrenCount} / 2)` : ''} + .gc-cell {
            padding-bottom: ${rem(gutters[key])};
          }
        `,
      );
    }
  }

  return css`
  & .gc-divider {
    flex-grow: 1;
  }

  ${strings}
`;
};

const GridContainerElement = styled.div.attrs({ className: 'gc-grid-container' })<
  GridContainerProps
>`
  position: relative;
  max-width: ${(props: GridContainerProps) =>
    props.type === 'fluid' || props.type === 'full'
      ? '100%'
      : rem(getThemeValue('grid.maxWidth')(props.theme))};
  margin: 0 auto;

  ${(props: GridContainerProps) => (props.type === 'full' ? 'overflow-x: hidden;' : '')}
  ${(props: GridContainerProps) =>
    Gutters(
      props.type === 'full' ? '0' : getThemeValue('grid.gutters.padding')(props.theme),
      'padding',
    )};
    
  ${(props: GridContainerProps) => dividerSupport(props)}
`;

GridContainerElement.displayName = 'GridContainer';

export default GridContainerElement;
