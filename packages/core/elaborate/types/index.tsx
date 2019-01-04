export interface BreakpointsProps {
  [key: string]: number;
}

export interface HidpiBreakpointsProps {
  'hidpi-1': number;
  'hidpi-1-5': number;
  'hidpi-2': number;
  retina: number;
  'hidpi-3': number;
}

export interface MediaQueryOptionsProps {
  printBreakpoint: string; // The largest named breakpoint in which to include print as a media type
  breakpoints: BreakpointsProps;
  hidpiBreakpoints: HidpiBreakpointsProps;
  stdWebDpi: number;
}
