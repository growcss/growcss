import * as React from 'react';
import classNames from 'classnames';
// eslint-disable-next-line no-unused-vars
import { withTheme } from 'styled-components';
// eslint-disable-next-line no-unused-vars
import { getThemeValue } from '@growcss/theme';
import { stripUnit } from '@growcss/elaborate';
import { AspectRatioPlaceholder } from '../styled/aspect-ratio-placeholder';
import { FigureElement } from '../styled/figure-element';
import { ImageElement } from '../styled/image-element';
import { PlaceholderElement } from '../styled/placeholder-element';
import { StateType } from '../states';
import { ImageProps } from '../../types';
import { parseSrcSet, srcSetStringify, CandidateProps } from './helper/srcset-parser';
import { getDimension } from './helper/get-dimension';
import { filterLarge } from './helper/filter-large';
import { filterSmall } from './helper/filter-small';
import { isNativeConnection } from './helper/is-native-connection';

// Cache if we've seen an image before so we don't both with
// lazy-loading & fading in on subsequent mounts.
const imageCache = {};

const inImageCache = props => {
  const { src } = props;

  return imageCache[src] || false;
};

const activateCacheForImage = props => {
  const { src } = props;

  imageCache[src] = true;
};

interface DefaultImageProps {
  onLoad: () => void;
  onError: () => void;
  onStartLoad: ({}) => void;
  preload: boolean;
}

type PropsWithDefaults = ImageProps & DefaultImageProps;

class ExtendedImage extends React.Component<ImageProps, StateType> {
  public static defaultProps: DefaultImageProps = {
    onLoad: () => {},
    onError: () => {},
    onStartLoad: () => {},
    preload: false,
  };

  /**
   * @param {Array<CandidateProps>} srcArray
   */
  private readonly srcArray: CandidateProps[];

  /**
   * @param {boolean} hasWebp
   */
  private readonly hasWebp: boolean = false;

  /**
   * The alt of the img.
   *
   * @param {string|undefined} alt
   */
  private readonly alt?: string;

  /**
   * The placeholder img url.
   *
   * @param {string|undefined} src
   */
  private readonly placeholder?: string;

  /**
   * @param {HTMLImageElement} imgElement
   */
  private imgElement: HTMLImageElement;

  /**
   * @param {RegExp} webpRegex
   */
  private webpRegex;

  /**
   * The img url.
   *
   * @param {string} src
   */
  private src: string;

  /**
   * @param {PropsWithDefaults} props
   */
  public constructor(props: PropsWithDefaults) {
    super(props);

    this.webpRegex = /.+\.webp$/i;

    const { srcSet, src, alt, placeholder, theme } = props as PropsWithDefaults;

    this.alt = alt;
    this.src = src || '';
    this.srcArray =
      srcSet && srcSet.length > 1
        ? parseSrcSet(srcSet, theme.image.breakpoints || {})
        : [];

    this.placeholder = placeholder;

    if (this.placeholder === undefined) {
      const smallImages = filterSmall(
        filterSmall(filterSmall(this.srcArray, 'width'), 'height'),
        'density',
      );
      this.placeholder = smallImages.length !== 0 ? smallImages[0].url : undefined;
    }

    // If this image has already been loaded before then we can assume it's
    // already in the browser cache so it's cheap to just show directly.
    const seenBefore = inImageCache(props);

    this.hasWebp =
      this.srcArray.filter(srcItem => {
        return this.webpRegex.test(srcItem.url);
      }).length > 0;

    this.state = {
      loadState: 'initial',
      possiblySlowNetwork: false,
      seenBefore,
    };

    this.updateConnection = this.updateConnection.bind(this);
    this.possiblySlowNetworkListener = this.possiblySlowNetworkListener.bind(this);
  }

  public componentDidMount() {
    const { onStartLoad, preload, threshold, src } = this.props as DefaultImageProps &
      ImageProps;
    const { seenBefore } = this.state;

    if (seenBefore) {
    }

    if (isNativeConnection) {
      navigator.connection.addEventListener('onchange', this.updateConnection);
    } else if (threshold !== undefined) {
      window.document.addEventListener(
        'possiblySlowNetwork',
        this.possiblySlowNetworkListener,
      );
    }

    if (this.src !== '') {
      this.srcArray.push({ url: this.src });
    }

    // webp filtering promise
    this.checkBrowserWebpSupport(this.srcArray).then(srcArray => {
      const selectedImgUrl =
        this.srcArray.length > 0 ? this.bestMatchingImage(srcArray) : this.src;

      if (!this.src || this.src !== selectedImgUrl) {
        this.src = selectedImgUrl;
      }

      onStartLoad({ wasCached: inImageCache(src) });

      this.setState({ loadState: 'loading' });

      if (preload) {
        this.preLoad();
      } else {
        this.imgElement.src = this.src;

        if (this.srcArray.length !== 0) {
          this.imgElement.srcset = srcSetStringify(this.srcArray);
        }
      }
    });
  }

  public componentWillUnmount() {
    const { threshold } = this.props;

    if (isNativeConnection) {
      navigator.connection.removeEventListener('onchange', this.updateConnection);
    } else if (threshold) {
      window.document.removeEventListener(
        'possiblySlowNetwork',
        this.possiblySlowNetworkListener,
      );
    }
  }

  public render() {
    const { children, height, width, crossOrigin, preload, theme } = this.props;
    const { loadState } = this.state;
    const defaultSvgPlaceholder = `<svg xmlns='http://www.w3.org/2000/svg' width='1' height='1'><rect width='1' height='1' fill='${getThemeValue(
      'image.placeholderBackgroundColor',
    )(theme)}'/></svg>`;

    let { height: dHeight, width: dWidth } = getDimension();

    if (height !== undefined && width !== undefined) {
      dHeight = stripUnit(height);
      dWidth = stripUnit(width);
    }

    return (
      <FigureElement className="gc-image">
        <AspectRatioPlaceholder>
          <div style={{ paddingBottom: `${(dHeight / dWidth) * 100}%` }} />
          {preload && (
            <PlaceholderElement
              className="placeholder"
              src={
                this.placeholder ||
                `data:image/svg+xml;base64,${btoa(defaultSvgPlaceholder)}`
              }
              crossOrigin="anonymous"
              alt={this.alt}
            />
          )}
          <ImageElement
            className={classNames({
              loaded: loadState === 'loaded' && preload,
              preload,
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

  public updateConnection() {
    if (!navigator.onLine) {
      return;
    }

    const { loadState } = this.state;

    if (loadState === 'initial') {
      this.setState({
        connection: {
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
          rtt: navigator.connection.rtt,
        },
      });
    }
  }

  public possiblySlowNetworkListener(erorr) {
    const { loadState, possiblySlowNetwork: statePossiblySlowNetwork } = this.state;

    if (loadState !== 'initial') {
      return;
    }

    const { possiblySlowNetwork } = erorr.detail;

    if (!statePossiblySlowNetwork && possiblySlowNetwork) {
      this.setState({ possiblySlowNetwork });
    }
  }

  /**
   * When `true`, any change to the `src` property will cause the
   * `placeholder` image to be shown until the new image has loaded.
   *
   * @returns void
   */
  private preLoad(): void {
    const imageInstance = new Image();

    imageInstance.src = this.src;

    if (this.srcArray.length !== 0) {
      imageInstance.srcset = srcSetStringify(this.srcArray);
    }

    imageInstance.addEventListener('load', () => {
      this.setState({ loadState: 'loaded' });

      this.imgElement.src = this.src;

      if (this.srcArray.length !== 0) {
        this.imgElement.srcset = srcSetStringify(this.srcArray);
      }
    });
    imageInstance.addEventListener('error', () => {
      this.setState({ loadState: 'error' });
    });
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
   * @param {Array}   srcArray
   * @param {boolean} supports Indicates if the browser supports webp.
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
   * @param {Array<Isrcset>} arr srcset array
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

    const refDim = getDimension();

    let filtered = this.src
      ? arr.concat([
          {
            url: this.src,
          },
        ])
      : arr;
    filtered = filterLarge(
      filterLarge(
        filterLarge(filtered, 'width', refDim.width * densityMultiplier),
        'height',
        refDim.height * densityMultiplier,
      ),
      'density',
      !hasDensity ? 1 : window.devicePixelRatio || 1.0, // When no density is provided densityMultiplier is used and density filter can be set to 1, otherwise use devicePixelRatio
    );
    filtered = filterSmall(
      filterSmall(filterSmall(filtered, 'width'), 'height'),
      'density',
    );

    return filtered[0].url;
  }
}

export default withTheme(ExtendedImage);
