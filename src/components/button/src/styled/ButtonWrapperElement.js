// @flow
import React from 'react';
import styled from 'styled-components';
import type { ButtonWrapperType } from '../types';

const ButtonWrapperElement = styled.span`
  align-self: center;
  display: inline-flex;
  flex-wrap: nowrap;
  max-width: 100%;
  ${props => (props.fit ? 'width: 100%;justifyContent:center;' : null)};
`;

export default (props: ButtonWrapperType) => (
  <ButtonWrapperElement {...props}>{props.children}</ButtonWrapperElement>
);
