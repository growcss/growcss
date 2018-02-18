// @flow
import { Figcaption } from './index';

export type ImagesType = { [string]: string };

export type BreakpointsType = { [string]: string };

export type ImageType = {
  backgroundImages: ImagesType,
  height: string | number,
  width: string | number,
  alt: string,
  previewImage?: string,
  children?: Figcaption,
};
