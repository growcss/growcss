// @flow
import { Figcaption } from './index';

export type ImagesType = { [string]: string };

export type BreakpointsType = { [string]: string };

export type ImageType = {
  backgroundImages: ImagesType,
  height: string | number,
  width: string | number,
  alt: string,
  crossorigin?: string,
  previewImage?: string,
  children?: Figcaption,
};

export type FigcaptionType = {
  align: 'start' | 'left' | 'end' | 'right' | 'center',
};
