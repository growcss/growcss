import * as React from 'react';

export interface BreakpointsProps {
  [key: string]: string;
}

export interface ImagesProps {
  [key: string]: string;
}

export interface ImageType extends React.ImgHTMLAttributes<HTMLImageElement> {
  previewImage?: string;
  scrollPosition?: number;
  afterLoad?: Function;
  beforeLoad?: Function;
}
