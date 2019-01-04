import * as React from 'react';

export interface ImagesProps {
  [key: string]: string;
}

export interface ImageType {
  backgroundImages: ImagesProps;
  height?: number;
  width?: number;
  alt?: string;
  crossOrigin?: '' | 'anonymous' | 'use-credentials' | undefined;
  previewImage?: string;
  children?: React.ReactNode;
  scrollPosition?: number;
  afterLoad?: Function;
  beforeLoad?: Function;
  visibleByDefault?: boolean;
}
