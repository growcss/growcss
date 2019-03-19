import { mediaquery } from '@growcss/elaborate';
import { styled, css, GrowCssTheme } from '@growcss/theme';
import { ThemedCssFunction } from 'styled-components';
import { DividerProps } from '../../types';

const lineSvg = (theme: GrowCssTheme): string => {
  return `<svg style="width: 100%" xmlns="http://www.w3.org/2000/svg" height="${
    theme.divider.shadow.width
  }" preserveAspectRatio="xMidYMin slice">
    <rect x="0" y="0" width="100%" height="1" fill="${
      theme.divider.shadow.color
    }" shape-rendering="crispEdges"/>
  </svg>`;
};

const basicDivider = css<DividerProps>`
  margin: ${props => props.theme.divider.margin};
  line-height: 1;
  height: 0em;
`;

const verticalDivider = css`
  position: absolute;
  z-index: 2;
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
    border-left: ${props => props.theme.divider.shadow.width} solid
      ${props => props.theme.divider.shadow.color};
    border-right: ${props => props.theme.divider.highlight.width} solid
      ${props => props.theme.divider.highlight.color};
    width: 0%;
    height: ${props =>
      props.theme.divider.vertical.height
        ? props.theme.divider.vertical.height
        : `calc(100% - ${props.theme.divider.vertical.margin})`};
  }

  &:before {
    top: -100%;
  }
  &:after {
    top: auto;
    bottom: 0px;
  }
`;

const horizontalDivider = css`
  display: table;
  white-space: nowrap;
  margin: ${props => props.theme.divider.horizontal.margin};
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
    background-image: url(${props =>
      `data:image/svg+xml;base64,${btoa(lineSvg(props.theme))}`});
  }

  &:before {
    background-position: right ${props => props.theme.divider.horizontal.margin} top 50%;
  }
  &:after {
    background-position: left ${props => props.theme.divider.horizontal.margin} top 50%;
  }
`;

const hiddenDivider = css`
  border-color: transparent !important;
  display: block;

  &:before,
  &:after {
    display: none;
  }
`;

const getDividerStyle = (props: DividerProps): ThemedCssFunction<DividerProps> => {
  if (props.vertical) {
    return verticalDivider;
  }

  if (props.horizontal) {
    return horizontalDivider;
  }

  return basicDivider;
};

export const DividerElement = styled.div<DividerProps>`
  ${props => getDividerStyle(props)}

  font-weight: ${props => props.theme.divider.typography.weight};
  text-transform: ${props => props.theme.divider.typography.transform};
  color: ${props => props.theme.divider.typography.color};
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  
  ${props =>
    !props.vertical && !props.horizontal
      ? `border-top: ${props.theme.divider.shadow.width} solid ${
          props.theme.divider.shadow.color
        }; border-bottom: ${props.theme.divider.highlight.width} solid ${
          props.theme.divider.highlight.color
        };`
      : ''}
  ${props =>
    props.vertical
      ? mediaquery(props.theme.divider.breakpoint)`${horizontalDivider}`
      : ''}
  ${props => (props.hidden ? hiddenDivider : '')}
`;
