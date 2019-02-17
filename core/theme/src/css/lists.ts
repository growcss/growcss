import { css } from 'styled-components';

export default (gutterSize: number) => css`
  ul,
  ol,
  dl {
    padding-left: ${gutterSize * 5}px;
  }
  [dir='rtl']ul,
  [dir='rtl']ol,
  [dir='rtl']dl {
    padding-left: 0;
    padding-right: ${gutterSize * 5}px;
  }

  dd,
  dd + dt,
  li + li {
    margin-top: ${gutterSize / 2}px;
  }
  ul ul:not(:first-child),
  ol ul:not(:first-child),
  ul ol:not(:first-child),
  ol ol:not(:first-child) {
    margin-top: ${gutterSize / 2}px;
  }
`;
