// @flow
import * as React from 'react';
import styled from 'styled-components';
import type { IconWrapperElementType } from '../types';

const getMargin = (props: IconWrapperElementType) => {
  if (props.spacing === 'none') {
    return 0;
  }

  if (props.isOnlyChild) {
    return `0 -2px`;
  }

  return `0 4px`;
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
