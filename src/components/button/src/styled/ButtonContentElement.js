// @flow
import React from 'react';
import styled from 'styled-components';
import { Button as ButtonStyle, getStyle } from '@growcss/theme';
import remCalc from '@growcss/util-remcalc';
import type { ButtonContentElementType } from '../types';

const getAlignment = followsIcon => (followsIcon ? 'baseline' : 'center');

const getMarginStyle = props => {
  let margin = 0;

  const size = getStyle(props, ButtonStyle, 'gridSize');

  if (props.spacing !== 'none' && size !== null) {
    margin = `0 ${remCalc(size / 2)}`;
  }

  return `margin: ${margin}`;
};

const ButtonContentElement = styled.span`
  align-items: ${props => getAlignment(props.followsIcon)};
  align-self: ${props => getAlignment(props.followsIcon)};
  flex: 1 1 auto;

  ${props => getMarginStyle(props)};

  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default (props: ButtonContentElementType) => (
  <ButtonContentElement {...props}>{props.children}</ButtonContentElement>
);
