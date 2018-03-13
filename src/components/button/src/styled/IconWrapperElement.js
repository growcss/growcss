// @flow
import type { ComponentType } from 'react';
import styled from 'styled-components';
import { Button as ButtonStyle, getStyle } from '@growcss/theme';
import remCalc from '@growcss/util-remcalc';
import type { IconWrapperElementType } from '../types';

const getMarginStyle = props => {
  if (props.spacing === 'none') {
    return 'margin: 0';
  }

  const size = getStyle(props, ButtonStyle, 'gridSize');
  let margin = 0;

  if (props.isOnlyChild && size !== null) {
    margin = `0 -${remCalc(size / 4)}`;
  }

  if (size !== null) {
    margin = `0 ${remCalc(size / 2)}`;
  }

  return `margin: ${margin}`;
};

export const IconWrapperElement: ComponentType<IconWrapperElementType> = styled.div`
  align-self: center;
  flex-shrink: 0;
  line-height: 0;
  user-select: none;
  ${props => getMarginStyle(props)};
`;
