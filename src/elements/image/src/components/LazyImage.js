//@flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { Breakpoints as DefaultBreakpoints } from './Breakpoints';
import type { ImageType } from '../types';
import { ImageElement } from '../styled/ImageElement';
import { ImagesType } from '../types';
import type { StateType } from '../states';

export default class LazyImage extends Component<ImageType, StateType> {
  constructor(props: Object) {
    super(props);

    const { src, srcSet } = LazyImage.parseImageSources(props.backgroundImages);

    this.src = src;
    this.srcSet = srcSet;
    this.imgElement = {};
    this.state = { imageLoaded: false };
  }

  componentDidMount() {
    const imageInstance = new Image();

    imageInstance.src = this.src;
    imageInstance.srcset = this.srcSet;

    imageInstance.onload = () => {
      this.setState({ imageLoaded: true });

      this.imgElement.src = this.src;
      this.imgElement.srcset = this.srcSet;
    };
  }

  static parseImageSources(backgroundImages: ImagesType) {
    const list = backgroundImages;
    const firstImageKey = Object.keys(list)[0];
    const src = list[firstImageKey];

    delete list[firstImageKey];

    let srcSet = '';

    for (const image in list) {
      if (
        typeof image === 'string' &&
        DefaultBreakpoints[image] !== undefined
      ) {
        srcSet += `${list[image]} ${DefaultBreakpoints[image]},`;
      }
    }

    return {
      src,
      srcSet,
    };
  }

  render() {
    const { previewImage, sizes, ...others } = this.props;
    const classNamePreview = classNames(['gc-image', 'preview']);
    const classNameImage = classNames({
      'gc-image': true,
      reveal: this.state.imageLoaded,
    });

    return (
      <div>
        <ImageElement
          src={previewImage || this.src}
          className={classNamePreview}
          Crossorigin="anonymous"
          {...others}
        />
        <ImageElement
          className={classNameImage}
          innerRef={img => {
            this.imgElement = img;
          }}
          Sizes={sizes}
          {...others}
        />
      </div>
    );
  }
}
