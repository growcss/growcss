import { DefaultTheme, FlattenSimpleInterpolation } from 'styled-components';

export interface Colors {
  [key: string]: string;
}

export interface GlobalBreakpoints {
  [key: string]: number;
}

export interface ImageBreakpoints {
  [key: string]: string;
}

export interface TypographyBreakpoints {
  [key: string]: number[];
}

export interface GrowCssTheme extends DefaultTheme {
  global: {
    margin: string;
    padding: string;
    position: string;
    textDirection: string;
    printBreakpoint: string;
    stdWebDpi: number;
    breakpoints: GlobalBreakpoints;
    hidpiBreakpoints: {
      [key: string]: number;
    };
  };
  body: {
    backgroundColor: string;
  };
  colors: Colors;
  typography: {
    color: string;
    fontSize: string;
    lineHeight: number;
    weightNormal: string | number;
    weightBold: string;
    antialiased: boolean;
    fontFamily: string;
    codeFontFamily: string;
    breakpoints: TypographyBreakpoints;
    h1?: FlattenSimpleInterpolation;
    h2?: FlattenSimpleInterpolation;
    h3?: FlattenSimpleInterpolation;
    h4?: FlattenSimpleInterpolation;
    h5?: FlattenSimpleInterpolation;
    h6?: FlattenSimpleInterpolation;
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
  shadows: any;
  zIndex: any;
  spinner: any;
  image: {
    breakpoints: ImageBreakpoints;
    previewBackgroundColor: string;
  };
}
