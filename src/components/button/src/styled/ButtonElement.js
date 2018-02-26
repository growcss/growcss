// @flow
import styled, { css } from 'styled-components';
import { Button as ButtonStyle } from '@growcss/theme';
import { getThemeStyle } from '../utils/getThemeStyle';
import type { ButtonAppearances } from '../types';

const getHeight = props => {
  let multiply = 4;

  if (props.spacing === 'compact') {
    multiply = 3;
  }

  return `${getThemeStyle(props, 'button', 'gridSize') *
    multiply /
    getThemeStyle(props, 'button', 'fontSize')}em`;
};

const getCursor = props => {
  if (props.isHover) {
    return 'pointer';
  } else if (props.disabled) {
    return 'not-allowed';
  }

  return 'default';
};

const getTransition = props => {
  if (props.isHover) {
    return 'background 0s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)';
  }

  return 'background 0.1s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)';
};

const getTransitionDuration = props => {
  if (props.isActive) {
    return '0s';
  }

  if (props.isFocus) {
    return '0s, 0.2s';
  }

  return '0.1s, 0.15s';
};

const getVerticalAlign = props => {
  if (props.spacing === 'none') {
    return 'baseline';
  }

  return 'middle';
};

const getState = ({ disabled, isActive, isFocus, isHover, isSelected }) => {
  if (disabled) {
    return 'disabled';
  } else if (isSelected) {
    return 'selected';
  } else if (isActive) {
    return 'active';
  } else if (isHover) {
    return 'hover';
  } else if (isFocus) {
    return 'focus';
  }

  return 'default';
};

const getButtonAppearanceTheme = props => {
  const { appearance } = props;
  const state = getState(props);
  const { fallback } = ButtonStyle;
  const textDecorationHover = getThemeStyle(
    props,
    'button',
    `theme.${appearance}.textDecoration.${state}`,
  );
  const boxShadowColor = getThemeStyle(
    props,
    'button',
    `theme.${appearance}.boxShadowColor.${state}`,
  );
  const boxShadow = boxShadowColor
    ? css`
        box-shadow: 0 0 0 2px ${boxShadowColor};
      `
    : null;

  return css`
    color: ${getThemeStyle(
      props,
      'button',
      `theme.${appearance}.color.${state}`,
    ) || fallback.color};
    background: ${getThemeStyle(
      props,
      'button',
      `theme.${appearance}.background.${state}`,
    ) || fallback.background};
    text-decoration: ${textDecorationHover || fallback.textDecoration};

    ${boxShadow} &::-moz-focus-inner {
      border: 0;
      margin: 0;
      padding: 0;
    }
  `;
};

// Target the <a> here to override a:hover specificity.
export const ButtonElement = styled.button`
  width: ${props => (props.fit ? '100%' : 'auto')};
  max-width: 100%;
  height: ${props => getHeight(props)};
  line-height: ${props =>
    props.spacing === 'none' ? 'inherit' : getHeight(props)};

  border-width: 0;

  cursor: ${props => getCursor(props)};
  outline: none !important;

  align-items: baseline;
  box-sizing: border-box;
  display: inline-flex;

  font-size: inherit;
  font-style: normal;

  margin: 0;
  padding: ${props =>
    props.spacing !== 'none'
      ? `0 ${getThemeStyle(props, 'button', 'gridSize')}px`
      : 0};

  transition: ${props => getTransition(props)};
  transition-duration: ${props => getTransitionDuration(props)};

  vertical-align: ${props => getVerticalAlign(props)};
  pointer-events: auto;
  text-align: center;
  white-space: nowrap;

  ${props => getButtonAppearanceTheme(props)};
`;
