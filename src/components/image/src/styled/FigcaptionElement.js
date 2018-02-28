//@flow
import React from 'react';
import styled from 'styled-components';
import type { FigcaptionType } from '../types';

const FigcaptionElement = styled.figcaption`
  position: relative;
  left: 0;
  width: 100%;
  top: 0;
  outline: 0;
  text-align: ${props => props.align || 'center'};
  margin: 10px auto 0;
`;

export default (props: FigcaptionType) => <FigcaptionElement {...props} />;
