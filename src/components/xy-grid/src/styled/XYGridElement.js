// @flow
import styled from 'styled-components';
import { GridElementAlign } from '../utils/FlexAlign';

const getFlexFlowValues = props => {
  let values = '';

  if (props.gridDirection === 'horizontal') {
    values += 'row';
  } else {
    values += 'column';
  }

  if (props.wrap) {
    values += ' wrap';
  } else {
    values += ' nowrap';
  }

  return values;
};

export const XYGridElement = styled.div`
  display: flex;
  flex-flow: ${props => getFlexFlowValues(props)};
  ${props => `height:${props.gridHeight};`}
  ${props => GridElementAlign(props.alignX || null, props.alignY || null)}
  /* stylelint-disable */
  -webkit-box-orient: ${props => props.gridDirection};
  -webkit-box-direction: normal;
  /* stylelint-enable */
`;
