import { ImgHTMLAttributes } from 'react';
import { ThemedStyledProps } from 'styled-components';
import { GrowCssTheme } from '@growcss/theme';

export interface BreakpointsProps {
  [key: string]: string;
}

export interface CandidateProps {
  url: string;
  width?: number;
  height?: number;
  density?: number;
  media?: string;
}


export interface PictureProps extends ImgHTMLAttributes<HTMLImageElement> {
  onLoad: () => void;
  onError: () => void;
  onStartLoad: () => void;
  preload: boolean;
  srcSetArray?: CandidateProps[],
  srcSetWebpArray?: CandidateProps[],
  hasWebp: boolean;
  state: 'initial' | 'load' | 'loading' | 'loaded' | 'error' | 'offline';
}

export interface ImageProps extends ThemedStyledProps<ImgHTMLAttributes<HTMLImageElement>, GrowCssTheme> {
  preload?: boolean;
  lazy?: boolean;
  placeholder?: string;
  webpRegex?: RegExp;
  threshold?: number;
  observer?: {
    rootMargin?: string,
    threshold?: number | number[]
  };
  onLoad?: () => void;
  onError?: () => void;
  onStartLoad?: () => void;
  onOffline?: () => void;
  onSlowNetwork?: () => void;
}
