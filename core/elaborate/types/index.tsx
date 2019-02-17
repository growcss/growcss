export interface BreakpointsProps {
  [key: string]: number;
}

export interface HidpiBreakpointsProps {
  [key: string]: number;
}

export interface MediaQueryOptionsProps {
  printBreakpoint: string; // The largest named breakpoint in which to include print as a media type
  breakpoints: BreakpointsProps;
  hidpiBreakpoints: HidpiBreakpointsProps;
  stdWebDpi: number;
}
