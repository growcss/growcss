import React, { PureComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { srcSetStringify } from './helper/srcset-stringify';
import { PictureElement } from '../styled/picture-element';
import { PictureProps, CandidateProps } from '../../types';
import { PictureStateType } from '../states';

interface MediaObject {
  [key: string]: CandidateProps[];
}

export class Picture extends PureComponent<PictureProps, PictureStateType> {
  /**
   * @param {PictureProps} props
   */
  public constructor(props: PictureProps) {
    super(props);

    const { state, srcSetArray, srcSetWebpArray, sizes } = props;
    const mediaSrcSetSources: ReactNode[] = [];
    const mediaSrcSetWebpSources: ReactNode[] = [];

    if (srcSetArray !== undefined) {
      const filteredMediaObjects = Picture.filterMediaObjects(srcSetArray);

      for (const key in filteredMediaObjects) {
        if (typeof filteredMediaObjects[key] === 'object') {
          mediaSrcSetSources.push(
            Picture.createSourceElement(
              filteredMediaObjects[key],
              undefined,
              sizes,
              key,
            ),
          );
        }
      }
    }

    if (srcSetWebpArray !== undefined) {
      const filteredMediaObjects = Picture.filterMediaObjects(srcSetWebpArray);

      for (const key in filteredMediaObjects) {
        if (typeof filteredMediaObjects[key] === 'object') {
          mediaSrcSetWebpSources.push(
            Picture.createSourceElement(
              filteredMediaObjects[key],
              'image/webp',
              sizes,
              key,
            ),
          );
        }
      }
    }

    this.state = {
      loadState: state,
      srcSetArray: srcSetArray !== undefined ? srcSetArray.filter(Boolean) : undefined,
      srcSetWebpArray:
        srcSetWebpArray !== undefined ? srcSetWebpArray.filter(Boolean) : undefined,
      mediaSrcSetSources,
      mediaSrcSetWebpSources,
      // if webp has previously been detected, use the prior detection
      supportsWebp: typeof window.GCImage !== 'undefined' && window.GCImage.supports,
    };

    this.handleImageLoaded = this.handleImageLoaded.bind(this);
  }

  /**
   * Create a source element.
   *
   * @param {CandidateProps[]}   srcSetArray
   * @param {undefined | string} type
   * @param {undefined | string} sizes
   * @param {undefined | string} media
   */
  public static createSourceElement(
    srcSetArray: CandidateProps[],
    type?: string,
    sizes?: string,
    media?: string,
  ): ReactNode {
    return (
      <source
        type={type}
        srcSet={srcSetStringify(srcSetArray)}
        sizes={sizes}
        media={media}
      />
    );
  }

  /**
   * Filter srcSet media objects
   *
   * @param {CandidateProps[]} srcSetArray
   *
   * @returns MediaObject
   */
  public static filterMediaObjects(srcSetArray: CandidateProps[]): MediaObject {
    const array: MediaObject = {};

    if (srcSetArray !== undefined) {
      srcSetArray.forEach((element, index) => {
        if (element !== undefined && element.media !== undefined) {
          if (array[element.media] === undefined) {
            array[element.media] = [];
          }

          array[element.media].push(element);

          delete srcSetArray[index]; //  eslint-disable-line no-param-reassign
        }
      });
    }

    return array;
  }

  /**
   * {@inheritdoc}
   */
  public componentDidMount(): void {
    this.checkBrowserWebpSupport();

    const { onStartLoad } = this.props;

    onStartLoad();

    this.setState({ loadState: 'loading' });
  }

  /**
   * @returns {void}
   */
  public handleImageLoaded(): void {
    this.setState({ loadState: 'loaded' });

    const { onLoad } = this.props;

    if (onLoad !== undefined) {
      onLoad();
    }
  }

  /**
   * {@inheritdoc}
   */
  public render(): ReactNode {
    const { src, alt, crossOrigin, sizes, preload, onError, title } = this.props;
    const {
      supportsWebp,
      loadState,
      srcSetWebpArray,
      mediaSrcSetSources,
      mediaSrcSetWebpSources,
      srcSetArray,
    } = this.state;

    return (
      <PictureElement
        className={classNames({
          loaded: loadState === 'loaded' && preload,
          preload: loadState !== 'loaded' && preload,
          visible: !preload,
        })}
      >
        {supportsWebp &&
          srcSetWebpArray !== undefined &&
          srcSetWebpArray.length !== 0 &&
          Picture.createSourceElement(srcSetWebpArray, 'image/webp', sizes)}
        {supportsWebp && mediaSrcSetWebpSources}
        {mediaSrcSetSources}
        {srcSetArray !== undefined &&
          srcSetArray.length !== 0 &&
          Picture.createSourceElement(srcSetArray, undefined, sizes)}
        <img
          src={src}
          onLoad={this.handleImageLoaded}
          onError={onError}
          alt={alt}
          crossOrigin={crossOrigin}
          title={title}
        />
      </PictureElement>
    );
  }

  /**
   * Checks if the srcset has a webp image, and if so if the
   * browser supports webp. Returns a filtered copy of the srcset
   * array depending on support.
   *
   * @returns void
   */
  private checkBrowserWebpSupport(): void {
    const { supportsWebp } = this.state;
    const { hasWebp } = this.props;

    // if there are no webp images in the srcSetArray, we do not need to detect support
    if (!hasWebp || supportsWebp) {
      return;
    }

    // support has not been previously detected so
    // do a new test for webp support
    const webpImg = new Image();

    // @see https://developers.google.com/speed/webp/faq#how_can_i_detect_browser_support_for_webp
    webpImg.src =
      'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==';

    webpImg.addEventListener('load', () => {
      const result = webpImg.width > 0 && webpImg.height > 0;

      window.GCImage = {
        supports: result,
      };

      this.setState({ supportsWebp: result });
    });
  }
}
