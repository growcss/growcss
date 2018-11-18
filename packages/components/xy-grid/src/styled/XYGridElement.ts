import styled from 'styled-components';
import { GridElementAlign } from '../utils/FlexAlign';

export type XYGridElementProps = {
    gridDirection: string | undefined
    wrap: boolean
    gridHeight: string
    alignX: string | null | undefined
    alignY: string | null | undefined
}

export const XYGridElement = styled.div<XYGridElementProps>`
  display: flex;
  flex-flow: ${props => props.gridDirection === 'horizontal' ? 'row' : 'column'} ${props => props.wrap ? 'wrap' : 'nowrap'};

  -webkit-box-orient: ${props => props.gridDirection};
  -webkit-box-direction: normal;
  ${props => `height:${props.gridHeight};`}
  ${props => GridElementAlign(props.alignX || null, props.alignY || null)}
`;
