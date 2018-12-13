import * as React from 'react';
import classNames from 'classnames';
import { Breakpoints as DefaultBreakpoints } from './breakpoints';
import { AspectRatioPlaceholder } from '../styled/aspect-ratio-placeholder';
import { FigureElement } from '../styled/figure-element';
import { ImageElement } from '../styled/image-element';
import { PreviewElement } from '../styled/preview-element';
import { StateType } from '../states';

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
}

export default class LazyImage extends React.Component<ImageType, StateType> {
  /**
   * @param { HTMLImageElement } imgElement
   */
  private imgElement: HTMLImageElement;

  /**
   * The first found img url.
   *
   * @param {string} src
   */
  protected src: string;

  /**
   * A string with breakpoint images.
   *
   * @param {string} srcSet
   */
  protected srcSet: string;

  /**
   * @param {ImageType} props
   */
  public constructor(props: ImageType) {
    super(props);

    const { backgroundImages } = props;
    const { src, srcSet } = LazyImage.parseBackgroundImages(backgroundImages);

    this.src = src;
    this.srcSet = srcSet;
    this.state = { imageLoaded: false };
  }

  public componentDidMount() {
    const imageInstance = new Image();

    imageInstance.src = this.src;
    imageInstance.srcset = this.srcSet;

    imageInstance.addEventListener('load', () => {
      this.setState({ imageLoaded: true });

      this.imgElement.src = this.src;
      this.imgElement.srcset = this.srcSet;
    });
  }

  public render() {
    const { children, previewImage, height, width, alt, crossOrigin } = this.props;
    const { imageLoaded } = this.state;
    const className = classNames({ loaded: imageLoaded });
    let DivSizer = <div />;

    if (height !== undefined && width !== undefined) {
      DivSizer = <div style={{ paddingBottom: `${(height / width) * 100}%` }} />;
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
            crossOrigin={crossOrigin}
          />
        </AspectRatioPlaceholder>
        {children}
      </FigureElement>
    );
  }

  /**
   * @param {ImagesProps} backgroundImages
   */
  private static parseBackgroundImages(backgroundImages: ImagesProps) {
    const list = backgroundImages;
    const firstImageKey = Object.keys(list)[0];
    const src = list[firstImageKey];

    delete list[firstImageKey];

    let srcSet = '';

    for (const image in list) {
      if (typeof DefaultBreakpoints[image] === 'string') {
        srcSet += `${list[image]} ${DefaultBreakpoints[image]},`;
      }
    }

    srcSet = srcSet.slice(0, -1);

    return {
      src,
      srcSet,
    };
  }
}
