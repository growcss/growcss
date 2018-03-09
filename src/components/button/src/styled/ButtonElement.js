//@flow
import styled, { css } from 'styled-components';
import { Button as ButtonStyle, getStyle } from '@growcss/theme';
import remCalc from '@growcss/util-remcalc';

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

const getHeight = props => {
  let multiply = 4;

  if (props.spacing === 'compact') {
    multiply = 3;
  }

  const gridSize = getStyle(props, ButtonStyle, 'gridSize');
  const fontSize = getStyle(props, ButtonStyle, 'fontSize');

  if ([gridSize, fontSize].includes(null)) {
    throw new Error('');
  }

  // $FlowFixMe
  return `${gridSize * multiply / fontSize}em`;
};

const getCursor = props => {
  let cursor = 'default';

  if (props.isHover) {
    cursor = 'pointer';
  }

  if (props.disabled) {
    cursor = 'not-allowed';
  }

  return cursor;
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

const getPaddingStyle = props => {
  const style = getStyle(props, ButtonStyle, 'gridSize');

  let padding = 0;

  if (props.spacing !== 'none' && style !== null) {
    padding = `0 ${remCalc(style)}`;
  }

  return `padding: ${padding};`;
};

const getButtonAppearanceTheme = props => {
  const state = getState(props);
  const { appearance, displayType } = props;
  const { fallback } = ButtonStyle;
  const textDecorationHover = getStyle(
    props,
    ButtonStyle,
    `theme.${appearance}.textDecoration.${state}`,
  );
  const boxShadowColor = getStyle(
    props,
    ButtonStyle,
    `theme.${appearance}.boxShadowColor.${state}`,
  );
  const boxShadow = boxShadowColor
    ? css`
        box-shadow: 0 0 0 2px ${boxShadowColor};
      `
    : null;
  const buttonColor = getStyle(props, ButtonStyle, `theme.${appearance}.color.${state}`);
  let background = getStyle(props, ButtonStyle, `theme.${appearance}.background.${state}`);
  let ghostBorder = '0';

  if (displayType === 'ghost' || displayType === 'dashed') {
    ghostBorder = `1px ${background} solid`;
    background = 'transparent';
  }

  return css`
    color: ${buttonColor || fallback.color};
    background: ${background || fallback.background};
    text-decoration: ${textDecorationHover || fallback.textDecoration};
    border: ${ghostBorder};
    /* stylelint-disable */
    ${boxShadow} &::-moz-focus-inner {
      border: 0;
      margin: 0;
      padding: 0;
    }
    /* stylelint-enable */
  `;
};

// Target the <a> here to override a:hover specificity.
export const ButtonElement = styled.button`
  width: ${props => (props.fit ? '100%' : 'auto')};
  max-width: 100%;
  height: ${props => getHeight(props)};
  line-height: ${props => (props.spacing === 'none' ? 'inherit' : getHeight(props))};
  border-width: 0;
  border-radius: ${props => getStyle(props, ButtonStyle, 'borderRadius')}px;
  cursor: ${props => getCursor(props)};
  outline: none !important;
  align-items: baseline;
  box-sizing: border-box;
  display: inline-flex;
  font-size: inherit;
  font-style: normal;
  margin: 0;
  transition: ${props => getTransition(props)};
  transition-duration: ${props => getTransitionDuration(props)};
  vertical-align: ${props => getVerticalAlign(props)};
  pointer-events: auto;
  text-align: center;
  white-space: nowrap;
  ${props => getPaddingStyle(props)};
  ${props => getButtonAppearanceTheme(props)};
`;
