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
  static defaultProps: ImageType;
  /**
   * The first found source img url.
   */
  src: string;
  srcSet: string;
  imgElement: React.Node;

  constructor(props: ImageType) {
    super(props);

    const { src, srcSet } = LazyImage.parseImageSources(this.props.backgroundImages);

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
    const { children, previewImage, height, width, alt } = this.props;
    const className = classNames({
      loaded: this.state.imageLoaded
    });

    return (
      <FigureElement className='gc-image'>
        <AspectRatioPlaceholder>
          <div style={{paddingBottom: `${(stripUnits(height)/stripUnits(width)) * 100}%` }} />
          <PreviewElement src={previewImage || this.src} crossorigin='anonymous' alt={alt}/>
          <ImageElement className={className} innerRef={img => { this.imgElement = img; }} alt={alt}/>
        </AspectRatioPlaceholder>
        {children}
      </FigureElement>
    );
  }
}
