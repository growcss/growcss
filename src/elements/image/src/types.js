// @flow
export type ImagesType = { [string]: string };

export type BreakpointsType = { [string]: string };

export type ImageType = {
  backgroundImages: ImagesType,
  previewImage: string,
  sizes?: string,
};
