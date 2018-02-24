// @flow
import React from 'react';
import styled from 'styled-components';
import type { ButtonContentElementType } from '../types';

const getAlignment = followsIcon => (followsIcon ? 'baseline' : 'center');
const getMargin = spacing => (spacing === 'none' ? 0 : '0 4px');

const ButtonContentElement = styled.span`
  align-items: ${props => getAlignment(props.followsIcon)};
  align-self: ${props => getAlignment(props.followsIcon)};
  flex: 1 1 auto;
  margin: ${props => getMargin(props.spacing)};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default (props: ButtonContentElementType) => (
  <ButtonContentElement {...props}>{props.children}</ButtonContentElement>
);
