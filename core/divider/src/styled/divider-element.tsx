import { mediaquery, rem } from '@growcss/elaborate';
import { styled, css, GrowCssTheme } from '@growcss/theme';
import classNames from 'classnames';
import { ThemedCssFunction } from 'styled-components';
import { DividerProps } from '../../types';

const lineSvg = (theme: GrowCssTheme): string => {
  return `<svg style="width: 100%" xmlns="http://www.w3.org/2000/svg" height="${rem(
    theme.divider.shadow.width,
  )}" preserveAspectRatio="xMidYMin slice">
    <rect x="0" y="0" width="100%" height="1" fill="${
      theme.divider.shadow.color
    }" shape-rendering="crispEdges"/>
  </svg>`;
};

const horizontalDivider = css`
  display: table;
  white-space: nowrap;
  margin: ${(props: DividerProps) => rem(props.theme.divider.horizontal.margin)};
  line-height: 1;
  text-align: center;

  &:before,
  &:after {
    content: '';
    display: table-cell;
    position: relative;
    top: 50%;
    width: 50%;
    background-repeat: no-repeat;
    background-image: url(${(props: DividerProps) =>
      `data:image/svg+xml;base64,${btoa(lineSvg(props.theme))}`});
  }

  &:before {
    background-position: right
      ${(props: DividerProps) => rem(props.theme.divider.horizontal.margin)} top 50%;
  }
  &:after {
    background-position: left
      ${(props: DividerProps) => rem(props.theme.divider.horizontal.margin)} top 50%;
  }
`;

const basicDivider = css<DividerProps>`
  margin: ${(props: DividerProps) => props.theme.divider.margin};
  line-height: 1;
  height: 0em;
`;

const verticalDivider = css`
  position: absolute;
  z-index: 2;

  ${(props: DividerProps) => mediaquery(props.theme.divider.breakpoint.mobile)`
    ${horizontalDivider}
    top: calc(50% - ${rem(props.theme.divider.vertical.margin + 10)});
  `};

  ${(props: DividerProps) => mediaquery(props.theme.divider.breakpoint.tablet)`
    top: 50%;
    left: 50%;
    margin: 0rem;
    padding: 0em;
    width: auto;
    height: 50%;
    line-height: 0em;
    text-align: center;
    transform: translateX(-50%);
  
    &:before,
    &:after {
      position: absolute;
      left: 50%;
      content: '';
      z-index: 3;
      border-left: ${rem(props.theme.divider.shadow.width)} solid
        ${props.theme.divider.shadow.color};
      border-right: ${rem(props.theme.divider.highlight.width)} solid
        ${props.theme.divider.highlight.color};
      width: 0%;
      height: ${
        props.theme.divider.vertical.height !== undefined
          ? rem(props.theme.divider.vertical.height)
          : `calc(100% - ${rem(props.theme.divider.vertical.margin)})`
      };
    }
  
    &:before {
      top: -100%;
    }

    &:after {
      top: auto;
      bottom: 0px;
    }
  `};
`;

const hiddenDivider = css`
  border-color: transparent !important;
  display: block;

  &:before,
  &:after {
    display: none;
  }
`;

const getDividerStyle = (props: DividerProps): ThemedCssFunction<GrowCssTheme> => {
  if (props.vertical) {
    return verticalDivider;
  }

  if (props.horizontal) {
    return horizontalDivider;
  }

  return basicDivider;
};

const DividerElement = styled.div.attrs((props: DividerProps) => ({
  className: classNames('gc-divider', props.className, {
    hidden: props.hidden || false,
    horizontal: props.horizontal || false,
    vertical: props.vertical || false,
  }),
}))<DividerProps>`
  ${(props: DividerProps) => getDividerStyle(props)};

  font-weight: ${(props: DividerProps) => props.theme.divider.typography.weight};
  text-transform: ${(props: DividerProps) => props.theme.divider.typography.transform};
  color: ${(props: DividerProps) => props.theme.divider.typography.color};
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  ${(props: DividerProps) =>
    !props.vertical && !props.horizontal
      ? `border-top: ${rem(props.theme.divider.shadow.width)} solid ${
          props.theme.divider.shadow.color
        }; border-bottom: ${rem(props.theme.divider.highlight.width)} solid ${
          props.theme.divider.highlight.color
        };`
      : ''}

  ${(props: DividerProps) => (props.hidden ? hiddenDivider : '')}
`;

DividerElement.displayName = 'Divider';

export default DividerElement;
