// eslint-disable-next-line no-unused-vars
import * as styledComponents from 'styled-components';
import { em } from '@growcss/elaborate';
import normalize from './modern-normalize';
import { h1, h2, h3, h4, h5, h6, typography } from './css/typography';
import blockquote from './css/blockquote';
import lists from './css/lists';
import tables from './css/tables';
import links from './css/links';
import colors from './css/colors';
import divider from './components/divider';
import grid from './components/grid';
import image from './components/image';
import spinner from './components/spinner';
import { GrowCssTheme } from '../types';
import { getGutterSize } from './utils/get-gutter-size';

export { createMediaQueryOptions } from './utils/create-mediaquery-options';
export { h1, h2, h3, h4, h5, h6, content } from './css/typography';
export { getThemeValue } from './utils/get-theme-value';
export { getGutterSize } from './utils/get-gutter-size';

export const GrowCss: GrowCssTheme = {
  global: {
    borderColor: colors.gray[700],
    // Global value used for margin on components.
    margin: '1rem',
    // Global value used for padding on components.
    padding: '1rem',
    // Global value used for positioning on components.
    position: '1rem',
    // Sets the text direction of the CSS. Can be either `ltr` or `rtl`.
    textDirection: 'ltr',
    printBreakpoint: 'large',
    // Web standard Pixels per inch. (1ddpx / stdWebDpi) = 1dpi
    // See https://www.w3.org/TR/css-values-3/#absolute-lengths
    stdWebDpi: 96,
    // The Breakpoints property is where you define your project's breakpoints
    breakpoints: {
      small: 0,
      medium: 640,
      large: 1024,
      xlarge: 1200,
      xxlarge: 1440,
    },
    hidpiBreakpoints: {
      'hidpi-1': 1,
      'hidpi-1-5': 1.5,
      'hidpi-2': 2,
      retina: 2,
      'hidpi-3': 3,
    },
  },
  body: {
    backgroundColor: colors.white,
  },
  typography,
  colors,
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
  divider,
  grid,
  image,
  spinner,
};

// Re-export the styled function with our custom theme interface
const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<GrowCssTheme>;

export { styled, css, createGlobalStyle, keyframes, ThemeProvider };

export const GlobalStyle = createGlobalStyle`
  ${props => normalize(props.theme.global.borderColor)}

  body,
  html {
    height: 100%;
    width: 100%;
  }

  html {
    font-size: ${props => props.theme.typography.fontSize};
  }

  body {
    background-color: ${props => props.theme.body.backgroundColor};
    font-family: ${props => props.theme.typography.fontFamily};
    font-size: ${props => em(props.theme.typography.fontSize)};
    line-height: ${props => props.theme.typography.lineHeight};
    font-style: normal;
    font-weight: ${props => props.theme.typography.weightNormal};
    -ms-overflow-style: -ms-autohiding-scrollbar;
    text-decoration-skip: ink;
    text-decoration-skip-ink: auto;

    ${props =>
      props.theme.typography.antialiased
        ? '-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;'
        : null}
  }

  ${props => links(props.theme.colors)}

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
    margin: ${getGutterSize(1.5)}px 0 0 0;
  }

  h1 {
    ${props => props.theme.typography.h1 || h1}
  }
  h2 {
    ${props => props.theme.typography.h2 || h2}
  }
  h3 {
    ${props => props.theme.typography.h3 || h3}
  }
  h4 {
    ${props => props.theme.typography.h4 || h4}
  }
  h5 {
    ${props => props.theme.typography.h5 || h5}
  }
  h6 {
    ${props => props.theme.typography.h6 || h6}
  }

  code,
  kbd,
  samp {
    font-family: ${props => props.theme.typography.codeFontFamily};
  }

  var,
  address,
  dfn,
  cite {
    font-style: italic;
  }

  abbr {
    border-bottom: 1px ${props => props.theme.colors.gray[500]} dotted;
    cursor: help;
  }

  ${blockquote(getGutterSize(5))}

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
    margin-top: ${getGutterSize(1.5)}px;
  }

  ${lists(getGutterSize())}
  ${props => tables(props.theme.typography, 2, getGutterSize(), props.theme.colors)}
`;
