import { HTMLAttributes, ReactNode } from 'react';
import { ThemedStyledProps } from 'styled-components';
import { GrowCssTheme } from '@growcss/theme';

export type GutterType = 'margin' | 'padding';

export interface GuttersProps {
  [key: string]: number;
}

export interface GridProps {
  children: ReactNode;
  height?: string;
  gutterSizes?: GuttersProps;
  gutterType?: string;
  alignX?: string;
  alignY?: string;
}

export interface CellProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemedStyledProps<{}, GrowCssTheme> {
  children: ReactNode;
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

export interface GridContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ThemedStyledProps<{}, GrowCssTheme> {
  type?: string;
}
