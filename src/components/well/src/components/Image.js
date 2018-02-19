//@flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { Image as DefaultImage } from '@growcss/element-image';
import type { ImageType } from '../types';

export default class Image extends Component<ImageType> {
  render() {
    const { backgroundImages, previewImage, height, width, alt } = this.props;

    return (
      <div className={classNames('gc-well-image')}>
        <div className={classNames('gc-well-image-curtain')} />
        <DefaultImage
          backgroundImages={backgroundImages}
          height={height}
          width={width}
          alt={alt}
          previewImage={previewImage}
        />
      </div>
    );
  }
}
