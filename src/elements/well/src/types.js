// @flow
export type GuttersType = { [string]: string | Array<string> };
export type ImagesType = { [string]: string };

export type WellType = {
  children?: any,
  gutterSizes?: GuttersType,
  minHeight?: string,
  backgroundImages?: ImagesType,
};
