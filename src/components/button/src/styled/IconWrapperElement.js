// @flow
import * as React from 'react';
import styled from 'styled-components';
import type { IconWrapperElementType } from '../types';
import { getThemeStyle } from '../utils/getThemeStyle';

const getMargin = props => {
  if (props.spacing === 'none') {
    return 0;
  }

  if (props.isOnlyChild) {
    return `0 -${getThemeStyle(props, 'button', 'gridSize') / 4}px`;
  }

  return `0 ${getThemeStyle(props, 'button', 'gridSize') / 2}px`;
};

const IconWrapperElement = styled.div`
  align-self: center;
  display: flex;
  flex-shrink: 0;
  line-height: 0;
  font-size: 0;
  margin: ${props => getMargin(props)};
  user-select: none;
`;

export default (props: IconWrapperElementType) => (
  <IconWrapperElement {...props}>{props.children}</IconWrapperElement>
);
