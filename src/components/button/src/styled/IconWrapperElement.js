// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Button as ButtonStyle, getStyle } from '@growcss/theme';
import remCalc from '@growcss/util-remcalc';
import type { IconWrapperElementType } from '../types';

const getMarginStyle = props => {
  if (props.spacing === 'none') {
    return 'margin: 0';
  }

  let margin = 0;

  const size = getStyle(props, ButtonStyle, 'gridSize');

  if (props.isOnlyChild && size !== null) {
    margin = `0 -${remCalc(size / 4)}`;
  }

  if (size !== null) {
    margin = `0 ${remCalc(size / 2)}`;
  }

  return `margin: ${margin}`;
};

const IconWrapperElement = styled.div`
  align-self: center;
  display: flex;
  flex-shrink: 0;
  line-height: 0;
  font-size: 0;
  user-select: none;
  ${props => getMarginStyle(props)};
`;

export default (props: IconWrapperElementType) => (
  <IconWrapperElement {...props}>{props.children}</IconWrapperElement>
);
