import styled from 'styled-components';
import { getThemeValue } from '@growcss/theme';
import { Gutters } from '../utils/gutters';
// eslint-disable-next-line no-unused-vars
import { GridContainerProps } from '../../types';

const GridContainerElement = styled.div.attrs({ className: 'gc-grid-container' })<
  GridContainerProps
>`
  max-width: ${props =>
    props.type === 'fluid' || props.type === 'full'
      ? '100%'
      : getThemeValue('grid.maxWidth')(props.theme)};
  margin: 0 auto;

  ${props => (props.type === 'full' ? 'overflow-x: hidden;' : '')}
  ${props =>
    Gutters(
      props.type === 'full' ? '0' : getThemeValue('grid.paddingGutters')(props.theme),
      'padding',
    )};
`;

GridContainerElement.displayName = 'GridContainer';

export default GridContainerElement;
