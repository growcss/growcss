export interface ThemeProps {
  breakpoints: {
    [key: string]: number
  };
  hidpiBreakpoints: {
    [key: string]: number
  };
  colors: {
    [key: string]: string
  };
  typography: any;
  grid: any;
  screens: any;
  shadows: any;
  zIndex: any;
  spinner: any;
  image: any;
}
