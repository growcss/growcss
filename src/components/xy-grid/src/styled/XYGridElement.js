// @flow
import styled from 'styled-components';
import { GridElementAlign } from '../utils/FlexAlign';

export const XYGridElement = styled.div`
  display: flex;
  flex-flow: ${props =>
      props.gridDirection === 'horizontal' ? 'row' : 'column'}
    ${props => (props.wrap ? 'wrap' : 'nowrap')};

  -webkit-box-orient: ${props => props.gridDirection};
  -webkit-box-direction: normal;

  ${props => `height:${props.gridHeight};`} ${props =>
      GridElementAlign(props.alignX || null, props.alignY || null)};
`;
