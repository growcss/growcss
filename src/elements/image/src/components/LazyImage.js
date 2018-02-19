//@flow
import * as React from 'react';
import classNames from 'classnames';
import { Breakpoints as DefaultBreakpoints } from './Breakpoints';
import { AspectRatioPlaceholder } from '../styled/AspectRatioPlaceholder';
import { FigureElement } from '../styled/FigureElement';
import { ImageElement } from '../styled/ImageElement';
import { PreviewElement } from '../styled/PreviewElement';
import type { ImageType, ImagesType } from '../types';
import type { StateType } from '../states';

const stripUnits = require('strip-units');

export default class LazyImage extends React.Component<ImageType, StateType> {
  /**
   * The first found img url.
   *
   * @param {string} src
   */
  src: string;

  /**
   * A string with breakpoint images.
   *
   * @param {string} srcSet
   */
  srcSet: string;

  /**
   * @param {HTMLImageElement} imgElement
   */
  imgElement: HTMLImageElement;

  constructor(props: ImageType) {
    super(props);

    const { src, srcSet } = LazyImage.parseBackgroundImages(
      this.props.backgroundImages,
    );

    this.src = src;
    this.srcSet = srcSet;
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

  static parseBackgroundImages(backgroundImages: ImagesType) {
    const list = backgroundImages;
    const firstImageKey = Object.keys(list)[0];
    const src = list[firstImageKey];

    delete list[firstImageKey];

    let srcSet = '';

    for (const image in list) {
      if (
        typeof image === 'string' &&
        typeof DefaultBreakpoints[image] === 'string'
      ) {
        srcSet += `${list[image]} ${DefaultBreakpoints[image]},`;
      }
    }

    srcSet = srcSet.slice(0, -1);

    return {
      src,
      srcSet,
    };
  }

  render() {
    const {
      children,
      previewImage,
      height,
      width,
      alt,
      crossorigin,
    } = this.props;
    const className = classNames({ loaded: this.state.imageLoaded });

    return (
      <FigureElement className="gc-image">
        <AspectRatioPlaceholder>
          <div
            style={{
              paddingBottom: `${stripUnits(height) / stripUnits(width) * 100}%`,
            }}
          />
          <PreviewElement
            className={classNames('preview')}
            src={previewImage || this.src}
            crossorigin="anonymous"
            alt={alt}
          />
          <ImageElement
            className={className}
            innerRef={img => {
              this.imgElement = img;
            }}
            alt={alt}
            crossorigin={crossorigin}
          />
        </AspectRatioPlaceholder>
        {children}
      </FigureElement>
    );
  }
}
