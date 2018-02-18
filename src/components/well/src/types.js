// @flow
import * as React from 'react';

export type GuttersType = { [string]: string | Array<string> };

export type ImagesType = { [string]: string };

export type WellType = {
  children: React.Node,
  gutterSizes?: GuttersType,
  minHeight?: string,
} | {
  children: React.Node,
  alt: string,
  imageSizes: string,
  backgroundImages: ImagesType,
  gutterSizes?: GuttersType,
  minHeight?: string,
  previewImage?: string,
};

export type ImageType = {
  backgroundImages: ImagesType,
  height: string | number,
  width: string | number,
  alt: string,
  previewImage?: string,
};
