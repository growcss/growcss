import * as React from 'react';

export interface GuttersProps {
  [key: string]: string | number;
}

export interface GridProps {
  children: React.ReactNode;
  height?: string;
  gutterSizes?: GuttersProps;
  gutterType?: string;
  alignX?: string;
  alignY?: string;
}

export interface CellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gridColumns?: number;
  vertical?: boolean;
  gutterSizes?: GuttersProps;
  cellType?: string;
  gutterType?: string;
  align?: string;
}

export interface OffsetProps {
  smallOffset?: number;
  mediumOffset?: number;
  largeOffset?: number;
  xlargeOffset?: number;
  xxlargeOffset?: number;
}

export interface CellBreakpointsProps {
  small?: number | string;
  medium?: number | string;
  large?: number | string;
  xlarge?: number | string;
  xxlarge?: number | string;
}

export interface GridContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  type?: string;
  width?: string | number;
  gutterSizes?: string | number | GuttersProps;
}
