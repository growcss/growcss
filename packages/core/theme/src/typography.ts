import { css, FlattenSimpleInterpolation } from 'styled-components';
import { mediaquery, stripUnit, em } from '@growcss/elaborate';
import { colors } from './colors';

const calcHeading = (
  heading: number,
  fontSize: string,
  lineHeight: number,
  breakpoints: {},
  mediaQuery: {},
): FlattenSimpleInterpolation => {
  if (Object.entries(breakpoints).length === 0) {
    throw new Error('Cant be empty @todo error message');
  }

  const size = stripUnit(em(fontSize));
  const lineHeightSpacing = (factor = 1): number => {
    return size * lineHeight * factor;
  };
  const spacingValue = lineHeightSpacing();
  const mediaqueries: string[] = [];

  for (const key in breakpoints) {
    if (Array.isArray(breakpoints[key])) {
      const calcSize = size * breakpoints[key][heading];
      let calcLineHeight = 0;
      let multiplier = 1;

      if (calcSize <= spacingValue) {
        calcLineHeight = spacingValue / calcSize;
      } else {
        while (lineHeightSpacing(multiplier) < calcSize) {
          multiplier += 0.5;
        }

        calcLineHeight = lineHeightSpacing(multiplier) / calcSize;
      }

      mediaqueries.push(mediaquery(key, mediaQuery)`
        font-size: ${em(calcSize, size)};
        line-height: ${calcLineHeight};
        font-weight: 700;
      `);
    }
  }

  return css`
    ${mediaqueries}
  `;
};

export const h1 = css`
  color: ${props => props.theme.colors.black};
  ${props =>
    calcHeading(
      0,
      props.theme.typography.fontSize,
      props.theme.typography.lineHeight,
      props.theme.typography.breakpoints,
      props.theme.mediaQuery,
    )};
  letter-spacing: -0.01em;
`;
export const h2 = css`
  color: ${colors.black};
  ${props =>
    calcHeading(
      1,
      props.theme.typography.fontSize,
      props.theme.typography.lineHeight,
      props.theme.typography.breakpoints,
      props.theme.mediaQuery,
    )};
  letter-spacing: -0.01em;
`;
export const h3 = css`
  color: ${colors.black};
  ${props =>
    calcHeading(
      2,
      props.theme.typography.fontSize,
      props.theme.typography.lineHeight,
      props.theme.typography.breakpoints,
      props.theme.mediaQuery,
    )};
  letter-spacing: -0.01em;
`;
export const h4 = css`
  color: ${colors.black};
  ${props =>
    calcHeading(
      3,
      props.theme.typography.fontSize,
      props.theme.typography.lineHeight,
      props.theme.typography.breakpoints,
      props.theme.mediaQuery,
    )};
  letter-spacing: -0.008em;
`;
export const h5 = css`
  color: ${colors.black};
  ${props =>
    calcHeading(
      4,
      props.theme.typography.fontSize,
      props.theme.typography.lineHeight,
      props.theme.typography.breakpoints,
      props.theme.mediaQuery,
    )};
  letter-spacing: -0.006em;
`;
export const h6 = css`
  color: ${colors.black};
  ${props =>
    calcHeading(
      5,
      props.theme.typography.fontSize,
      props.theme.typography.lineHeight,
      props.theme.typography.breakpoints,
      props.theme.mediaQuery,
    )};
  letter-spacing: -0.003em;
`;
export const content = css`
  color: ${colors.black};
  font-size: ${props => em(props.theme.fontSize)};
  line-height: ${props => props.theme.lineHeight};
`;
