import { createGlobalStyle } from 'styled-components';
import { h1, h2, h3, h4, h5, h6, content } from './typography';
import { colors } from './colors';
import normalize from './modern-normalize';

/**
 * These theme values are expressed as functions so that if we decide to make
 * them dependent on props in the future, it wouldn't require a significant
 * refactor everywhere they are being used.
 */
export const GrowCss = {
  theme: {
    colors,
    typography: {
      baseFontSize: () => '16px',
      fontFamily: () =>
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      codeFontFamily: () =>
        '"SFMono-Medium", "SF Mono", "Segoe UI Mono", "Roboto Mono", "Ubuntu Mono", Menlo, Consolas, Courier, monospace',
      h1: () => h1,
      h2: () => h2,
      h3: () => h3,
      h4: () => h4,
      h5: () => h5,
      h6: () => h6,
    },
    grid: {
      gutterSize: (multiplier: number | undefined = undefined) => 10 * (multiplier || 1),
    },
    screens: {},
    shadows: {
      default: '0 2px 4px 0 rgba(0,0,0,0.10)',
      md: '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)',
      lg: '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)',
      inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
      outline: '0 0 0 3px rgba(52,144,220,0.5)',
      none: 'none',
    },
    zIndex: {
      auto: 'auto',
      '0': 0,
      '10': 10,
      '20': 20,
      '30': 30,
      '40': 40,
      '50': 50,
    },
    spinner: {},
    image: {},
  },
};

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  
  body,
  html {
    height: 100%;
    width: 100%;
  }
  
  body {
    background-color: ${GrowCss.theme.colors.white};
    font-family: ${GrowCss.theme.typography.fontFamily};
    ${content}
    margin-bottom: 0; // overwrite the font margin
    font-style: normal;
    font-weight: 400;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    text-decoration-skip: ink;
  }
  
  a {
    color: ${GrowCss.theme.colors.blue};
    text-decoration: none;
  }
  a:hover {
    color: ${GrowCss.theme.colors.blueLight};
    text-decoration: underline;
  }
  a:active {
    color: ${GrowCss.theme.colors.blueDark};
  }
  a:focus {
    outline: 2px solid ${GrowCss.theme.colors.blueLighter};
    outline-offset: 2px;
  }

  p,
  ul,
  ol,
  dl,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  blockquote,
  pre,
  form,
  table {
    margin: ${GrowCss.theme.grid.gutterSize(1.5)}px 0 0 0;
  }
  
  h1 {
    ${GrowCss.theme.typography.h1}
  }
  h2 {
    ${GrowCss.theme.typography.h2}
  }
  h3 {
    ${GrowCss.theme.typography.h3}
  }
  h4 {
    ${GrowCss.theme.typography.h4}
  }
  h5 {
    ${GrowCss.theme.typography.h5}
  }
  h6 {
    ${GrowCss.theme.typography.h6}
  }
  
  code,
  kbd {
    font-family: ${GrowCss.theme.typography.codeFontFamily};
  }

  var,
  address,
  dfn,
  cite {
    font-style: italic;
  }

  abbr {
    border-bottom: 1px ${GrowCss.theme.colors.grey} dotted;
    cursor: help;
  }
  
  blockquote,
  q {
    color: inherit;
  }
  blockquote {
    border: none;
    padding-left: ${GrowCss.theme.grid.gutterSize(5)}px;
  }
  [dir='rtl'] blockquote {
    padding-left: 0;
    padding-right: ${GrowCss.theme.grid.gutterSize(5)}px;
  }
  blockquote::before,
  q::before {
    content: '\\\\201C';
  }
  blockquote::after,
  q::after {
    content: '\\\\201D';
  }
  blockquote::before {
    float: left;
    /* to keep the quotes left of any child elements like blockquote > p */
    margin-left: -1em;
    text-align: right;
    width: 1em;
  }
  [dir='rtl'] blockquote::before {
    float: right;
    margin-right: -1em;
    text-align: left;
  }
  blockquote > :last-child {
    display: inline-block; /* so the quotes added via pseudos follow it immediately. */
  }
  
  p,
  ul,
  ol,
  dl,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  blockquote,
  pre,
  form,
  table {
    margin-top: ${GrowCss.theme.grid.gutterSize(1.5)}px;
  }
`;
