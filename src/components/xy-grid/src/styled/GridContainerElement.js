// @flow
import styled from 'styled-components';
import { Gutters } from '../utils/Gutters';

export const GridContainerElement = styled.div`
  max-width: ${props => props.maxWidth};
  margin: 0 auto;

  ${props => (props.type === 'full' ? 'overflow-x: hidden;' : '')}
  ${props => Gutters(props.gutterSizes, 'padding')};
`;
