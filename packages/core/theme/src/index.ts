import { createGlobalStyle } from 'styled-components';
import { em } from '@growcss/elaborate';
import { h1, h2, h3, h4, h5, h6, content } from './typography';
import { colors } from './colors';
import normalize from './modern-normalize';
import blockquote from './blockquote';
import lists from './lists';
import tables from './tables';
import links from './links';
import { ThemeProps } from '../types';

const GrowCss: ThemeProps = {
  printBreakpoint: 'large',
  // Web standard Pixels per inch. (1ddpx / stdWebDpi) = 1dpi
  // See https://www.w3.org/TR/css-values-3/#absolute-lengths
  stdWebDpi: 96,
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
  colors,
  typography: {
    fontSize: '16px',
    lineHeight: 1.45,
    // Check https://type-scale.com/ for different sizes
    breakpoints: {
      small: [2.488, 2.074, 1.728, 1.44, 1.2, 1],
      large: [3.052, 2.441, 1.953, 1.563, 1.25, 1],
    },
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    content,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    codeFontFamily:
      '"SFMono-Medium", "SF Mono", "Segoe UI Mono", "Roboto Mono", "Ubuntu Mono", Menlo, Consolas, Courier, monospace',
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
};

GrowCss.mediaQuery = {
  printBreakpoint: GrowCss.printBreakpoint,
  breakpoints: GrowCss.breakpoints,
  hidpiBreakpoints: GrowCss.hidpiBreakpoints,
  // Web standard Pixels per inch. (1ddpx / stdWebDpi) = 1dpi
  // See https://www.w3.org/TR/css-values-3/#absolute-lengths
  stdWebDpi: GrowCss.stdWebDpi,
};

export default GrowCss;

export const GlobalStyle = createGlobalStyle<ThemeProps>`
  ${normalize}
  
  body,
  html {
    height: 100%;
    width: 100%;
  }
  
  body {
    background-color: ${props => props.theme.colors.white};
    font-family: ${props => props.theme.typography.fontFamily};
    font-size: ${props => em(props.theme.fontSize)};
    line-height: ${props =>
      props.theme.lineHeight};    margin-bottom: 0; // overwrite the font margin
    font-style: normal;
    font-weight: 400;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    text-decoration-skip: ink;
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
    margin: ${props => props.theme.grid.gutterSize(1.5)}px 0 0 0;
  }
  
  h1 {
    ${props => props.theme.typography.h1}
  }
  h2 {
    ${props => props.theme.typography.h2}
  }
  h3 {
    ${props => props.theme.typography.h3}
  }
  h4 {
    ${props => props.theme.typography.h4}
  }
  h5 {
    ${props => props.theme.typography.h5}
  }
  h6 {
    ${props => props.theme.typography.h6}
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
  
  ${props => blockquote(props.theme.grid.gutterSize(5))}
  
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
    margin-top: ${props => props.theme.grid.gutterSize(1.5)}px;
  }
  
  ${props => lists(props.theme.grid.gutterSize())}
  ${props =>
    tables(props.theme.typography, 2, props.theme.grid.gutterSize(), props.theme.colors)}
`;
