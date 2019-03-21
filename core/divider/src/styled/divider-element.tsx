import { mediaquery, rem } from '@growcss/elaborate';
import { styled, css, GrowCssTheme } from '@growcss/theme';
import { ThemedCssFunction } from 'styled-components';
import { DividerProps } from '../../types';
import classNames from 'classnames';

const lineSvg = (theme: GrowCssTheme): string => {
  return `<svg style="width: 100%" xmlns="http://www.w3.org/2000/svg" height="${
    rem(theme.divider.shadow.width)
  }" preserveAspectRatio="xMidYMin slice">
    <rect x="0" y="0" width="100%" height="1" fill="${
      theme.divider.shadow.color
    }" shape-rendering="crispEdges"/>
  </svg>`;
};

const basicDivider = css<DividerProps>`
  margin: ${(props: DividerProps) => props.theme.divider.margin};
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
    border-left: ${(props: DividerProps) => rem(props.theme.divider.shadow.width)} solid
      ${(props: DividerProps) => props.theme.divider.shadow.color};
    border-right: ${(props: DividerProps) => rem(props.theme.divider.highlight.width)} solid
      ${(props: DividerProps) => props.theme.divider.highlight.color};
    width: 0%;
    height: ${(props: DividerProps) =>
      props.theme.divider.vertical.height !== undefined
        ? rem(props.theme.divider.vertical.height)
        : `calc(100% - ${rem(props.theme.divider.vertical.margin)})`};
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
    background-position: right ${(props: DividerProps) => rem(props.theme.divider.horizontal.margin)} top 50%;
  }
  &:after {
    background-position: left ${(props: DividerProps) => rem(props.theme.divider.horizontal.margin)} top 50%;
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

const DividerElement = styled.div.attrs({
  className: (props: DividerProps) => classNames('gc-divider', props.className, {
    hidden: props.hidden || false,
    horizontal: props.horizontal || false,
    vertical: props.vertical || false,
  })
})<DividerProps>`
  ${(props: DividerProps) => props.horizontal ? horizontalDivider : basicDivider}

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

  ${(props: DividerProps) =>
    props.vertical
      ? mediaquery('small down')`${horizontalDivider}` + mediaquery('small up')`${verticalDivider}`
      : ''}

  ${(props: DividerProps) => (props.hidden ? hiddenDivider : '')}
`;


DividerElement.displayName = 'Divider';

export default DividerElement;
