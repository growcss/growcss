// eslint-disable-next-line no-unused-vars
import { createGlobalStyle, ThemedStyledProps } from 'styled-components';
import { em, rem } from '@growcss/elaborate';
import normalize from './modern-normalize';
import { h1, h2, h3, h4, h5, h6 } from './css/typography';
import { colors } from './css/colors';
import blockquote from './css/blockquote';
import lists from './css/lists';
import tables from './css/tables';
import links from './css/links';
import image from './components/image';
import { GrowCssTheme } from '../types';

export { createMediaQueryOptions } from './utils/create-mediaquery-options';
export { h1, h2, h3, h4, h5, h6, content } from './css/typography';
export { default as getThemeValue } from './utils/get-theme-value';

export const gutterSize = (multiplier: number | undefined = undefined): number =>
  10 * (multiplier || 1);

export const GrowCss: GrowCssTheme = {
  global: {
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
  typography: {
    // Text color
    color: colors.black,
    // Font size attribute applied to `<html>` and `<body>`.
    fontSize: '16px',
    // Default line height for all type. "lineHeight" is 24px while fontSize is 16px
    lineHeight: 1.45,
    // Font weight used for normal type
    weightNormal: 600,
    // Font weight used for bold type
    weightBold: 'bold',
    // Set to `true` to enable antialiased type, using the `-webkit-font-smoothing` and `-moz-osx-font-smoothing` CSS properties.
    antialiased: true,
    // Font stack of the body.
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    codeFontFamily:
      '"SFMono-Medium", "SF Mono", "Segoe UI Mono", "Roboto Mono", "Ubuntu Mono", Menlo, Consolas, Courier, monospace',
    // Check https://type-scale.com/ for different sizes
    breakpoints: {
      small: [2.488, 2.074, 1.728, 1.44, 1.2, 1],
      medium: [3.052, 2.441, 1.953, 1.563, 1.25, 1],
    },
  },
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
  grid: {
    //  Global width of your site. Used by the grid to determine row width.
    maxWidth: rem(1200),
    marginGutters: {
      small: `${gutterSize(2)}px`,
      medium: `${gutterSize(3)}px`,
    },
    paddingGutters: {
      small: `${gutterSize(2)}px`,
      medium: `${gutterSize(3)}px`,
    },
    columns: 12,
  },
  spinner: {},
  image,
};

export const GlobalStyle = createGlobalStyle<ThemedStyledProps<{}, GrowCssTheme>>`
  ${normalize}
  
  body,
  html {
    height: 100%;
    width: 100%;
  }
  
  html {
    font-size: ${props => em(props.theme.typography.fontSize)};
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
    margin: ${gutterSize(1.5)}px 0 0 0;
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
    border-bottom: 1px ${props => props.theme.colors.grey} dotted;
    cursor: help;
  }
  
  ${blockquote(gutterSize(5))}
  
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
    margin-top: ${gutterSize(1.5)}px;
  }
  
  ${lists(gutterSize())}
  ${props => tables(props.theme.typography, 2, gutterSize(), props.theme.colors)}
`;
