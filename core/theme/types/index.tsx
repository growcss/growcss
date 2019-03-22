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
    breakpoint: {
      print: string;
      mobile: string;
    };
    stdWebDpi: number;
    breakpoints: GlobalBreakpointsProps;
    hidpiBreakpoints: {
      [key: string]: number;
    };
  };
  body: {
    backgroundColor: string;
  };
  link: {
    color: {
      main: string;
      hover: string;
      active: string;
      focus: string;
    }
  };
  colors: ColorsProps;
  typography: TypographyProps;
  shadows: any;
  zIndex: any;
  divider: {
    typography: {
      color: string;
      transform: string;
      weight: string;
      size: string;
    };
    highlight: {
      width: number;
      color: string;
    };
    shadow: {
      width: number;
      color: string;
    };
    breakpoint: {
      mobile: string;
      tablet: string;
    };
    margin: string;
    vertical: {
      margin: number;
      height?: number;
    };
    horizontal: {
      margin: number;
      height?: number;
    };
  };
  grid: {
    maxWidth: number;
    gutters: {
      margin: {
        [key: string]: number;
      };
      padding: {
        [key: string]: number;
      };
    };
    columns: number;
  };
  image: {
    breakpoints: ImageBreakpointsProps;
    previewBackgroundColor: string;
  };
  spinner: any;
}
