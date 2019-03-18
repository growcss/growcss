import { DefaultTheme, FlattenSimpleInterpolation } from 'styled-components';

export interface ColorsProps {
  [key: string]: { [key: number]: string } | string;
}

export interface GlobalBreakpointsProps {
  [key: string]: number;
}

export interface ImageBreakpointsProps {
  [key: string]: string;
}

export interface TypographyBreakpointsProps {
  [key: string]: number[];
}

export interface TypographyProps {
  color: string;
  fontSize: string;
  lineHeight: number;
  weightNormal: string | number;
  weightBold: string;
  antialiased: boolean;
  fontFamily: string;
  codeFontFamily: string;
  breakpoints: TypographyBreakpointsProps;
  h1?: FlattenSimpleInterpolation;
  h2?: FlattenSimpleInterpolation;
  h3?: FlattenSimpleInterpolation;
  h4?: FlattenSimpleInterpolation;
  h5?: FlattenSimpleInterpolation;
  h6?: FlattenSimpleInterpolation;
}

export interface GrowCssTheme extends DefaultTheme {
  global: {
    borderColor: string;
    margin: string;
    padding: string;
    position: string;
    textDirection: string;
    printBreakpoint: string;
    stdWebDpi: number;
    breakpoints: GlobalBreakpointsProps;
    hidpiBreakpoints: {
      [key: string]: number;
    };
  };
  body: {
    backgroundColor: string;
  };
  colors: ColorsProps;
  typography: TypographyProps;
  shadows: any;
  zIndex: any;
  divider: {
    margin: string;
    breakpoint: string;
    typography: {
      color: string;
      transform: string;
      weight: string;
    };
    vertical: {
      margin: string;
      height?: string;
    };
    horizontal: {
      margin: string;
      height?: string;
    };
    highlight: {
      width: string;
      color: string;
    };
    shadow: {
      width: string;
      color: string;
    };
  };
  grid: {
    maxWidth: string;
    marginGutters: {
      [key: string]: string;
    };
    paddingGutters: {
      [key: string]: string;
    };
    columns: number;
  };
  image: {
    breakpoints: ImageBreakpointsProps;
    previewBackgroundColor: string;
  };
  spinner: any;
}
