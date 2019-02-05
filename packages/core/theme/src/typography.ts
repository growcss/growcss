import Shevy from 'shevyjs';
import { css } from 'styled-components';
import { colors } from './colors';

const shevy = new Shevy({
  baseFontSize: '1em',
  baseFontScale: [1.802, 1.602, 1.424, 1.266, 1.125, 1],
});
const {
  baseSpacing: bs,
  lineHeightSpacing: ls,
  h1: fontH1,
  h2: fontH2,
  h3: fontH3,
  h4: fontH4,
  h5: fontH5,
  h6: fontH6,
  content: fontContent,
} = shevy;

export const baseSpacing = bs;
export const lineHeightSpacing = ls;

export const h1 = css`
  color: ${colors.black};
  font-size: ${fontH1.fontSize};
  line-height: ${fontH1.lineHeight};
  letter-spacing: -0.01em;
  margin-bottom: ${fontH1.marginBottom};
`;
export const h2 = css`
  color: ${colors.black};
  font-size: ${fontH2.fontSize};
  line-height: ${fontH2.lineHeight};
  letter-spacing: -0.01em;
  margin-bottom: ${fontH2.marginBottom};
`;
export const h3 = css`
  color: ${colors.black};
  font-size: ${fontH3.fontSize};
  line-height: ${fontH3.lineHeight};
  letter-spacing: -0.01em;
  margin-bottom: ${fontH3.marginBottom};
`;
export const h4 = css`
  color: ${colors.black};
  font-size: ${fontH4.fontSize};
  line-height: ${fontH4.lineHeight};
  letter-spacing: -0.008em;
  margin-bottom: ${fontH4.marginBottom};
`;
export const h5 = css`
  color: ${colors.black};
  font-size: ${fontH5.fontSize};
  line-height: ${fontH5.lineHeight};
  letter-spacing: -0.006em;
  margin-bottom: ${fontH5.marginBottom};
`;
export const h6 = css`
  color: ${colors.black};
  font-size: ${fontH6.fontSize};
  line-height: ${fontH6.lineHeight};
  letter-spacing: -0.003em;
  margin-bottom: ${fontH6.marginBottom};
`;
export const content = css`
  color: ${colors.black};
  font-size: ${fontContent.fontSize};
  line-height: ${fontContent.lineHeight};
  margin-bottom: ${fontContent.marginBottom};
`;
