// @flow
import type { ComponentType } from 'react';
import styled from 'styled-components';
import type { ButtonWrapperType } from '../types';

export const ButtonWrapperElement: ComponentType<ButtonWrapperType> = styled.span`
  align-self: center;
  display: inline-flex;
  flex-wrap: nowrap;
  max-width: 100%;
  ${props => (props.fit ? 'width: 100%;justifyContent:center;' : null)};
`;
