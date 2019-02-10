import * as React from 'react';
import { ThemedStyledProps } from 'styled-components';
import { GrowCssTheme } from '@growcss/theme';

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

export interface CellProps extends React.HTMLAttributes<HTMLDivElement>, ThemedStyledProps<{}, GrowCssTheme> {
  children: React.ReactNode;
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

export interface GridContainerProps extends React.HTMLAttributes<HTMLDivElement>, ThemedStyledProps<{}, GrowCssTheme> {
  children: React.ReactNode;
  type?: string;
}
