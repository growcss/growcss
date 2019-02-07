import * as React from 'react';

export interface BreakpointsProps {
  [key: string]: string;
}

export interface ImagesProps {
  [key: string]: string;
}

export interface ImageType extends React.ImgHTMLAttributes<HTMLImageElement> {
  previewImage?: string;
  useElementDim: boolean;
  preload: boolean;
  scrollPosition?: number;
  afterLoad?: Function;
  beforeLoad?: Function;
}
