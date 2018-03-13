// @flow
import type { ComponentType } from 'react';
import styled from 'styled-components';
import type { FigcaptionType } from '../types';

export const FigcaptionElement: ComponentType<FigcaptionType> = styled.figcaption`
  position: relative;
  left: 0;
  width: 100%;
  top: 0;
  outline: 0;
  text-align: ${props => props.align || 'center'};
  margin: 10px auto 0;
`;
