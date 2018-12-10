import * as React from 'react';
import classNames from 'classnames';
import { Breakpoints as DefaultBreakpoints } from './Breakpoints';
import { AspectRatioPlaceholder } from '../styled/AspectRatioPlaceholder';
import { FigureElement } from '../styled/FigureElement';
import { ImageElement } from '../styled/ImageElement';
import { PreviewElement } from '../styled/PreviewElement';
import { StateType } from '../states';

export interface ImagesProps {
  [key: string]: string;
}

export interface ImageType {
  backgroundImages: ImagesProps;
  height?: number;
  width?: number;
  alt?: string;
  crossorigin?: '' | 'anonymous' | 'use-credentials' | undefined;
  previewImage?: string;
  children?: React.ReactNode;
}

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
   * @param { HTMLImageElement } imgElement
   */
  imgElement: HTMLImageElement;

  constructor(props: ImageType) {
    super(props);

    const { backgroundImages } = props;
    const { src, srcSet } = LazyImage.parseBackgroundImages(backgroundImages);

    this.src = src;
    this.srcSet = srcSet;
    this.state = { imageLoaded: false };
  }

  componentDidMount() {
    const imageInstance = new Image();

    imageInstance.src = this.src;
    imageInstance.srcset = this.srcSet;

    imageInstance.addEventListener('load', () => {
      this.setState({ imageLoaded: true });

      this.imgElement.src = this.src;
      this.imgElement.srcset = this.srcSet;
    });
  }

  static parseBackgroundImages(backgroundImages: ImagesProps) {
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
    let DivSizer = <div />;

    if (height !== undefined && width !== undefined) {
      DivSizer = (
        <div style={{ paddingBottom: `${(height / width) * 100}%` }} />
      );
    }

    return (
      <FigureElement className="gc-image">
        <AspectRatioPlaceholder>
          {DivSizer}
          <PreviewElement
            className={classNames('preview')}
            src={previewImage || this.src}
            crossOrigin="anonymous"
            alt={alt}
          />
          <ImageElement
            className={className}
            ref={(img: HTMLImageElement) => {
              this.imgElement = img;
            }}
            alt={alt}
            crossOrigin={crossorigin}
          />
        </AspectRatioPlaceholder>
        {children}
      </FigureElement>
    );
  }
}
