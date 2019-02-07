import * as React from 'react';
import classNames from 'classnames';
// eslint-disable-next-line no-unused-vars
import { ThemedStyledProps, withTheme } from 'styled-components';
// eslint-disable-next-line no-unused-vars
import { GrowCssTheme } from '@growcss/theme';
import { AspectRatioPlaceholder } from '../styled/aspect-ratio-placeholder';
import { FigureElement } from '../styled/figure-element';
import { ImageElement } from '../styled/image-element';
import { PreviewElement } from '../styled/preview-element';
import { StateType } from '../states';
import { ImageType } from '../../types';
import parseSrcset, { CandidateProps } from './srcset-parser';

interface DefaultImageProps {
  afterLoad: Function;
  beforeLoad: Function;
}

type PropsWithDefaults = ImageType &
  DefaultImageProps &
  ThemedStyledProps<{}, GrowCssTheme>;

class LazyImage extends React.Component<ImageType, StateType> {
  public static defaultProps: DefaultImageProps = {
    afterLoad: () => ({}),
    beforeLoad: () => ({}),
  };

  /**
   * @param {HTMLImageElement} imgElement
   */
  private imgElement: HTMLImageElement;

  /**
   * @param {Array<CandidateProps>} srcArray
   */
  private srcArray: CandidateProps[];

  /**
   * @param {RegExp} webpRegex
   */
  private webpRegex;

  /**
   * @param {boolean} hasWebp
   */
  private hasWebp: boolean = false;

  /**
   * The first found img url.
   *
   * @param {string|undefined} src
   */
  protected src: string | undefined;

  /**
   * The alt of the img.
   *
   * @param {string|undefined} src
   */
  protected alt: string | undefined;

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

    this.webpRegex = /.+\.webp$/i;

    const { srcSet, src, alt, theme } = props as PropsWithDefaults;

    this.alt = alt;
    this.src = src;
    this.srcArray =
      srcSet && srcSet.length > 1
        ? parseSrcset(srcSet, theme.image.breakpoints || {})
        : [];

    this.hasWebp =
      this.srcArray.filter(srcitem => {
        return this.webpRegex.test(srcitem.url);
      }).length > 0;

    this.state = { imageLoaded: false };
  }

  public componentDidUpdate(prevProps, prevState) {
    const { imageLoaded } = this.state;

    if (prevState.visible !== imageLoaded) {
      const { afterLoad } = this.props as DefaultImageProps;

      afterLoad();
    }
  }

  public componentDidMount() {
    const { beforeLoad } = this.props as DefaultImageProps;

    // webp filtering promise
    this.checkBrowserWebpSupport(this.srcArray).then(srcArray => {
      const selectedImgUrl =
        this.srcArray.length > 0 ? this.bestMatchingImage(srcArray) : this.src;

      if (!this.src || this.src !== selectedImgUrl) {
        this.src = selectedImgUrl;
      }

      const imageInstance = new Image();

      imageInstance.src = this.src;

      if (this.srcArray.length !== 0) {
        imageInstance.srcset = LazyImage.srcSetStringify(this.srcArray);
      }

      imageInstance.addEventListener('load', () => {
        beforeLoad();

        this.setState({ imageLoaded: true });

        this.imgElement.src = this.src;

        if (this.srcArray.length !== 0) {
          this.imgElement.srcset = LazyImage.srcSetStringify(this.srcArray);
        }
      });
    });
  }

  public render() {
    const { children, previewImage, height, width, crossOrigin, theme } = this.props;
    const { imageLoaded } = this.state;
    const defaultSvgPlaceholder = `<svg xmlns='http://www.w3.org/2000/svg' width='1' height='1'><rect width='1' height='1' fill='${(typeof theme.image !==
      'undefined' &&
      theme.image.previewBackgroundColor) ||
      'rgb(241, 245, 248)'}'/></svg>`;

    return (
      <FigureElement className="gc-image">
        <AspectRatioPlaceholder>
          {height !== undefined && width !== undefined && (
            <div style={{ paddingBottom: `${(height / width) * 100}%` }} />
          )}
          <PreviewElement
            className="preview"
            src={
              previewImage || `data:image/svg+xml;base64,${btoa(defaultSvgPlaceholder)}`
            }
            crossOrigin="anonymous"
            alt={this.alt}
          />
          <ImageElement
            className={classNames({
              loaded: imageLoaded,
            })}
            ref={(img: HTMLImageElement) => {
              this.imgElement = img;
            }}
            alt={this.alt}
            crossOrigin={crossOrigin}
          />
        </AspectRatioPlaceholder>
        {children}
      </FigureElement>
    );
  }

  /**
   * Checks if the srcset has a webp image, and if so if the
   * browser supports webp. Returns a filtered copy of the srcset
   * array depending on support.
   *
   * @param srcArray
   *
   * @return Promise of filtered source set array.
   */
  private checkBrowserWebpSupport(srcArray) {
    return new Promise(resolve => {
      // if there are no webp images in the srcArray, we do not need to detect support
      if (!this.hasWebp) {
        resolve(srcArray);
      } else {
        // if webp has previously been detected, use the prior detection
        if (typeof window.GCImage !== 'undefined') {
          resolve(this.filterWebp(srcArray, window.GCImage.supports));

          return;
        }
        // support has not been previously detected so
        // do a new test for webp support
        const webpImg = new Image();

        webpImg.addEventListener('load', () => {
          const result = webpImg.width > 0 && webpImg.height > 0;

          window.GCImage = {
            supports: result,
          };

          resolve(this.filterWebp(srcArray, result));
        });

        webpImg.addEventListener('error', () => {
          window.GCImage = {
            supports: false,
          };

          resolve(this.filterWebp(srcArray, false));
        });

        webpImg.src =
          'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
      }
    });
  }

  /**
   * Returns a filtered copy of the source set array
   * including only webp images if supports is true,
   * or only non webp images if supports is false.
   *
   * @param srcArray - {source set array}.
   * @param supports - {boolean} Indicates if the browser supports webp.
   *
   * @returns Filtered source set array.
   */
  private filterWebp(srcArray, supports) {
    return srcArray.filter(srcitem => {
      return this.webpRegex.test(srcitem.url) === supports;
    });
  }

  /**
   * Get best image from srcset
   *
   * @param arr {Array<Isrcset>} srcset array
   * @private
   */
  private bestMatchingImage(arr) {
    let densityMultiplier = 1;

    // Check if denisty is provided in srcset
    let hasDensity = false;

    arr.forEach(src => {
      if ('density' in src) {
        hasDensity = true;
      }
    });

    if (!hasDensity) {
      // When no density is set use devicePixelRatio as a multiplier for reference dimensions
      densityMultiplier = window.devicePixelRatio || 1.0;
    }

    // reference dimensions
    const refDim = this.useElementDim
      ? {
          width:
            (this.clientWidth ||
              window.innerWidth ||
              document.documentElement.clientWidth) * densityMultiplier,
          height:
            (this.clientHeight ||
              window.innerHeight ||
              document.documentElement.clientHeight) * densityMultiplier,
          // When no density is provided densityMultiplier is used and density filter can be set to 1, otherwise use devicePixelRatio
          density: !hasDensity ? 1 : window.devicePixelRatio || 1.0,
        }
      : {
          width:
            (window.innerWidth || document.documentElement.clientWidth) *
            densityMultiplier,
          height:
            (window.innerHeight || document.documentElement.clientHeight) *
            densityMultiplier,
          // When no density is provided densityMultiplier is used and density filter can be set to 1, otherwise use devicePixelRatio
          density: !hasDensity ? 1 : window.devicePixelRatio || 1.0,
        };
    let filtered = this.fallbackSrc
      ? arr.concat([
          {
            url: this.fallbackSrc,
          },
        ])
      : arr;
    filtered = LazyImage.filterLarge(
      LazyImage.filterLarge(
        LazyImage.filterLarge(filtered, 'width', refDim.width),
        'height',
        refDim.height,
      ),
      'density',
      refDim.density,
    );
    filtered = LazyImage.filterSmall(
      LazyImage.filterSmall(LazyImage.filterSmall(filtered, 'width'), 'height'),
      'density',
    );

    return filtered[0].url;
  }

  /**
   * filter out disqualified items less than the refVal
   *
   * @private
   */
  private static filterLarge(arr, attr, refVal) {
    if (arr.length < 2) return arr;
    let largest = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][attr]) {
        if (!largest || largest[attr] < arr[i][attr]) {
          largest = arr[i];
        }
      }
    }
    if (!largest) return arr;

    const filtered = [];
    for (let i = 0; i < arr.length; i++) {
      if (!arr[i][attr] || arr[i][attr] >= refVal) {
        filtered.push(arr[i]);
      }
    }
    if (filtered.length === 0) {
      filtered.push(largest);
    }

    return filtered;
  }

  /**
   * filter to the smallest items of a dimension
   *
   * @private
   */
  private static filterSmall(arr, attr) {
    if (arr.length < 2) return arr;
    let smallest = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][attr]) {
        if (!smallest || smallest[attr] > arr[i][attr]) {
          smallest = arr[i];
        }
      }
    }
    if (!smallest) return arr;

    const filtered = [];
    for (let i = 0; i < arr.length; i++) {
      if (!arr[i][attr] || arr[i][attr] <= smallest[attr]) filtered.push(arr[i]);
    }

    return filtered;
  }

  /**
   * Converts a srcset array to a srcset string.
   *
   * @param arr {Array<Isrcset>} srcset array
   */
  private static srcSetStringify(arr) {
    return arr
      .map(el => {
        if (!el.url) {
          throw new Error('URL is required.');
        }

        const ret = [el.url];

        if (el.width) {
          ret.push(`${el.width}w`);
        }

        if (el.height) {
          ret.push(`${el.height}h`);
        }

        if (el.density) {
          ret.push(`${el.density}x`);
        }

        return ret.join(' ');
      })
      .join(', ');
  }
}

export default withTheme(LazyImage);
