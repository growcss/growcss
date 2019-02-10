import * as React from 'react';
import { ThemedStyledProps } from 'styled-components';
import { GrowCssTheme } from '@growcss/theme';

export interface BreakpointsProps {
  [key: string]: string;
}

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement>, ThemedStyledProps<{}, GrowCssTheme> {
  placeholder?: string;
  placeholderClassName?:string;
  preload?: boolean;
  threshold?: number;
  scrollPosition?: number;
  onLoad?: ({}) => void;
  onError?: () => void;
  onStartLoad?: () => void;
}
