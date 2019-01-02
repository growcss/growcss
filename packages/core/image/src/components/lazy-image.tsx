import * as React from 'react';
import classNames from 'classnames';
import { Breakpoints as DefaultBreakpoints } from './breakpoints';
import { AspectRatioPlaceholder } from '../styled/aspect-ratio-placeholder';
import { FigureElement } from '../styled/figure-element';
import { ImageElement } from '../styled/image-element';
import { PreviewElement } from '../styled/preview-element';
import { StateType } from '../states';
import { ImagesProps, ImageType } from '../../types';

interface DefaultImageProps {
  afterLoad: Function;
  beforeLoad: Function;
  visibleByDefault: boolean;
}

type PropsWithDefaults = ImageType & DefaultImageProps;

export default class LazyImage extends React.Component<ImageType, StateType> {
  public static defaultProps: DefaultImageProps = {
    afterLoad: () => ({}),
    beforeLoad: () => ({}),
    visibleByDefault: false,
  };

  /**
   * @param {HTMLImageElement} imgElement
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
   * @param {PropsWithDefaults} props
   */
  public constructor(props: PropsWithDefaults) {
    super(props);

    const {
      backgroundImages,
      afterLoad,
      beforeLoad,
      visibleByDefault,
    } = props as PropsWithDefaults;
    const { src, srcSet } = LazyImage.parseBackgroundImages(backgroundImages);

    this.src = src;
    this.srcSet = srcSet;

    if (visibleByDefault) {
      beforeLoad();
      afterLoad();
    }

    this.state = { imageLoaded: visibleByDefault };
  }

  public componentDidUpdate(prevProps, prevState) {
    const { imageLoaded } = this.state;

    if (prevState.visible !== imageLoaded) {
      const { afterLoad } = this.props as DefaultImageProps;

      afterLoad();
    }
  }

  public componentDidMount() {
    const imageInstance = new Image();
    const { beforeLoad } = this.props as DefaultImageProps;

    imageInstance.src = this.src;
    imageInstance.srcset = this.srcSet;

    imageInstance.addEventListener('load', () => {
      beforeLoad();

      this.setState({ imageLoaded: true });

      this.imgElement.src = this.src;
      this.imgElement.srcset = this.srcSet;
    });
  }

  public render() {
    const {
      children,
      previewImage,
      height,
      width,
      alt,
      crossOrigin,
      visibleByDefault,
    } = this.props;
    const { imageLoaded } = this.state;

    const isLoaded = imageLoaded && !visibleByDefault;

    const className = classNames({
      loaded: isLoaded,
      visible: visibleByDefault,
    });
    let DivSizer = <div />;

    if (height !== undefined && width !== undefined) {
      DivSizer = <div style={{ paddingBottom: `${(height / width) * 100}%` }} />;
    }

    return (
      <FigureElement className="gc-image">
        <AspectRatioPlaceholder>
          {DivSizer}
          {!visibleByDefault && (
            <PreviewElement
              className={classNames('preview')}
              src={previewImage || this.src}
              crossOrigin="anonymous"
              alt={alt}
            />
          )}
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
