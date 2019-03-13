import React, { Component, ReactNode, ReactElement } from 'react';
// eslint-disable-next-line no-unused-vars
import { withTheme, DefaultTheme } from 'styled-components';
// eslint-disable-next-line no-unused-vars
import { getThemeValue } from '@growcss/theme';
import { stripUnit } from '@growcss/elaborate';
import { AspectRatioPlaceholder } from '../styled/aspect-ratio-placeholder';
import { FigureElement } from '../styled/figure-element';
import { PlaceholderElement } from '../styled/placeholder-element';
import { ImageStateType } from '../states';
import { ImageProps, CandidateProps, PictureProps } from '../../types';
import { getDimension } from './helper/get-dimension';
import { parseSrcSet } from './helper/srcset-parser';
import { filterSmall } from './helper/filter-small';
import { filterLarge } from './helper/filter-large';
import { isSsr } from './helper/is-ssr';
import { isNativeConnection } from './helper/is-native-connection';
import { Picture } from './picture';

interface DefaultImageProps {
  onLoad: () => void;
  onError: () => void;
  onStartLoad: () => void;
  onOffline: () => void;
  onSlowNetwork: () => void;
  preload: boolean;
  lazy: boolean;
  webpRegex: RegExp;
  observer: {
    rootMargin: string;
    threshold: number | number[];
  };
}

type PropsWithDefaults = ImageProps & DefaultImageProps;

// Cache if we've seen an image before so we don't bother with
// lazy-loading & fading in on subsequent mounts.
const imageCache: { [key: string]: boolean } = {};

const inImageCache = (src: string): boolean => {
  return imageCache[src] || false;
};

const activateCacheForImage = (src: string): void => {
  imageCache[src] = true;
};

const defaultObserver = {
  rootMargin: '0px 0px 0px 0px',
  threshold: 0,
};

class ExtendedImage extends Component<ImageProps, ImageStateType> {
  public static defaultProps: DefaultImageProps = {
    onLoad: () => {},
    onError: () => {},
    onStartLoad: () => {},
    onOffline: () => {},
    onSlowNetwork: () => {},
    preload: false,
    lazy: false,
    webpRegex: new RegExp('/.+.webp$/i'),
    observer: defaultObserver,
  };

  /**
   * @param {PropsWithDefaults} props
   */
  public constructor(props: PropsWithDefaults) {
    super(props);

    let inViewport = true;

    const {
      src,
      srcSet,
      placeholder,
      theme,
      webpRegex,
      lazy,
    } = props as PropsWithDefaults;
    const srcArray =
      srcSet !== undefined
        ? parseSrcSet(srcSet, getThemeValue('image.breakpoints', {})(theme))
        : [];
    const hasWebpImages =
      srcArray.filter(srcItem => {
        return webpRegex.test(srcItem.url);
      }).length > 0;
    const selectedImage = ExtendedImage.bestMatchingImage(srcArray, src);
    const seenBefore = inImageCache(selectedImage);
    const hasSrcSet = srcArray.length > 1;

    // browser with Intersection Observer available
    if (
      !seenBefore &&
      lazy &&
      typeof window !== `undefined` &&
      window.IntersectionObserver
    ) {
      inViewport = false;
    }

    // Never render image during SSR
    if (typeof window === `undefined` && lazy) {
      inViewport = false;
    }

    this.state = {
      loadState: 'initial',
      possiblySlowNetwork: false,
      inViewport,
      online: true,
      hasWebp: hasWebpImages,
      srcSetWebpArray:
        hasWebpImages && hasSrcSet
          ? ExtendedImage.filterWebp(webpRegex, srcArray, true)
          : undefined,
      srcSetArray: hasSrcSet
        ? ExtendedImage.filterWebp(webpRegex, srcArray, false)
        : undefined,
      placeholder: ExtendedImage.getPlaceholder(srcArray, placeholder),
      src: selectedImage,
      seenBefore,
    };

    this.updateConnection = this.updateConnection.bind(this);
    this.possiblySlowNetworkListener = this.possiblySlowNetworkListener.bind(this);
    this.updateOnlineStatus = this.updateOnlineStatus.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  /**
   * {@inheritdoc}
   */
  public componentDidMount(): void {
    const { threshold, onOffline, onSlowNetwork } = this.props as PropsWithDefaults;
    const isOnline = navigator.onLine;

    if (isNativeConnection && isOnline) {
      navigator.connection.addEventListener('onchange', this.updateConnection);
    } else if (threshold !== undefined) {
      window.document.addEventListener(
        'possiblySlowNetwork',
        this.possiblySlowNetworkListener,
      );
    }

    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);

    const { online, possiblySlowNetwork, src } = this.state;

    if (!online && typeof onOffline === 'function') {
      onOffline();
    }

    if (possiblySlowNetwork && typeof onSlowNetwork === 'function') {
      onSlowNetwork();
    }

    activateCacheForImage(src);
  }

  /**
   * {@inheritdoc}
   */
  public componentWillUnmount(): void {
    const { threshold } = this.props;

    if (isNativeConnection) {
      navigator.connection.removeEventListener('onchange', this.updateConnection);
    } else if (threshold !== undefined) {
      window.document.removeEventListener(
        'possiblySlowNetwork',
        this.possiblySlowNetworkListener,
      );
    }

    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  }

  public onEnter(event, unobserve): void {
    const { inViewport } = this.state;

    if (inViewport) {
      return;
    }

    const { lazy } = this.props;

    if (event.isIntersecting || lazy === false) {
      unobserve();
    }

    this.setState({
      inViewport: !lazy ? true : event.isIntersecting,
    });
  }

  /**
   * {@inheritdoc}
   */
  public render(): ReactNode {
    const { observer, lazy } = this.props as PropsWithDefaults;

    if (lazy) {
      try {
        // eslint-disable-next-line global-require
        const IntersectionObserver = require('@researchgate/react-intersection-observer')
          .default;

        return (
          <IntersectionObserver
            onChange={this.onEnter}
            rootMargin={observer.rootMargin || defaultObserver.rootMargin}
            threshold={observer.threshold || defaultObserver.threshold}
          >
            {this.renderImage()}
          </IntersectionObserver>
        );
      } catch (error) {
        if (error instanceof Error && error.code === 'MODULE_NOT_FOUND') {
          throw new Error(
            'Please run "npm install @researchgate/react-intersection-observer@^1.0.0-beta.0" to use the "lazy" feature of the growcss image component.',
          );
        }
      }
    }

    return this.renderImage();
  }

  /**
   * Update the connection state.
   *
   * @returns {void}
   */
  public updateConnection(): void {
    if (!navigator.onLine) {
      return;
    }

    const { loadState } = this.state;

    if (loadState === 'initial') {
      // @todo use this for a download icon
      /* eslint-disable react/no-unused-state */
      this.setState({
        connection: {
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
          rtt: navigator.connection.rtt,
        },
      });
    }
  }

  /**
   * Update the online state.
   *
   * @returns {void}
   */
  public updateOnlineStatus(): void {
    this.setState({ online: navigator.onLine });
  }

  /**
   * Check if the network is slow and update state.
   *
   * @param {object} erorr
   *
   * @returns void
   */
  public possiblySlowNetworkListener(erorr): void {
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
   * Render a default placeholder if no placeholder was found.
   *
   * @param {DefaultTheme} theme
   * @param {undefined | string} alt
   * @param {undefined | string} placeholder
   *
   * @returns {ReactNode}
   */
  public static renderPlaceholder(
    theme: DefaultTheme,
    alt?: string,
    placeholder?: string,
  ): ReactNode {
    const defaultSvgPlaceholder = `<svg xmlns='http://www.w3.org/2000/svg' width='1' height='1'><rect width='1' height='1' fill='${getThemeValue(
      'image.backgroundColor',
    )(theme)}'/></svg>`;

    return (
      <PlaceholderElement
        className="placeholder"
        src={placeholder || `data:image/svg+xml;base64,${btoa(defaultSvgPlaceholder)}`}
        crossOrigin="anonymous"
        alt={alt}
      />
    );
  }

  /**
   * @param {string | number | undefined} height
   * @param {string | number | undefined} width
   */
  public static getDimensionRatio(
    height: string | number | undefined,
    width: string | number | undefined,
  ): number {
    if (height !== undefined && width !== undefined) {
      return (stripUnit(height) / stripUnit(width)) * 100;
    }

    const { height: dHeight, width: dWidth } = getDimension();

    return (dHeight / dWidth) * 100;
  }

  /**
   * Get best image from srcset
   *
   * @param {CandidateProps[]} srcSetArray
   * @param {undefined|string} src
   *
   * @returns {string}
   */
  public static bestMatchingImage(srcSetArray: CandidateProps[], src?: string): string {
    let densityMultiplier = 1;

    // Check if denisty is provided in srcset
    let hasDensity = false;

    srcSetArray.forEach(srcSet => {
      if ('density' in srcSet) {
        hasDensity = true;
      }
    });

    if (!hasDensity) {
      // When no density is set use devicePixelRatio as a multiplier for reference dimensions
      densityMultiplier = window.devicePixelRatio || 1.0;
    }

    const refDim: { width: number; height: number } = getDimension();
    let filtered: CandidateProps[] = srcSetArray;

    if (typeof src === 'string' && src !== '') {
      filtered = srcSetArray.concat([
        {
          url: src,
        },
      ]);
    }

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

  /**
   * Returns a filtered copy of the source set array
   * including only webp images if supports is true,
   * or only non webp images if supports is false.
   *
   * @param {RegExp}           webpRegex
   * @param {CandidateProps[]} srcArray
   * @param {boolean}          supports Indicates if the browser supports webp.
   *
   * @returns CandidateProps[] filtered source set array.
   */
  public static filterWebp(
    webpRegex: RegExp,
    srcArray: CandidateProps[],
    supports: boolean,
  ): CandidateProps[] {
    return srcArray.filter(srcItem => {
      return webpRegex.test(srcItem.url) === supports;
    });
  }

  /**
   *
   * @param {CandidateProps[]} srcArray
   * @param {undefined | string} placeholder
   */
  public static getPlaceholder(
    srcArray: CandidateProps[],
    placeholder?: string,
  ): undefined | string {
    if (placeholder === undefined && srcArray.length !== 0) {
      const smallImages = filterSmall(
        filterSmall(filterSmall(srcArray, 'width'), 'height'),
        'density',
      );

      return smallImages.length !== 0 ? smallImages[0].url : undefined;
    }

    return placeholder;
  }

  /**
   * Render Image component.
   *
   * @returns {ReactElement<PictureProps>}
   */
  private renderImage(): ReactElement<PictureProps> {
    const {
      children,
      height,
      width,
      preload,
      theme,
      onError,
      onLoad,
      onStartLoad,
      alt,
      sizes,
      crossOrigin,
      ...other
    } = this.props as PropsWithDefaults;

    const {
      src,
      srcSetWebpArray,
      srcSetArray,
      placeholder,
      hasWebp,
      loadState,
      inViewport,
      seenBefore,
    } = this.state;

    const fadeIn = preload && !seenBefore;

    return (
      <FigureElement className="gc-image">
        <AspectRatioPlaceholder>
          <div
            style={{
              width: '100%',
              paddingBottom: `${ExtendedImage.getDimensionRatio(height, width)}%`,
            }}
          />
          {fadeIn && ExtendedImage.renderPlaceholder(theme, alt, placeholder)}
          {inViewport && (
            <Picture
              src={src}
              state={loadState}
              preload={preload}
              srcSetArray={srcSetArray}
              srcSetWebpArray={srcSetWebpArray}
              hasWebp={hasWebp}
              onLoad={onLoad}
              onError={onError}
              onStartLoad={onStartLoad}
              crossOrigin={crossOrigin}
              sizes={sizes}
              alt={alt}
              {...other}
            />
          )}
          {isSsr && (
            <noscript>
              <Picture
                src={src}
                state="loaded"
                preload={false}
                srcSetArray={srcSetArray}
                srcSetWebpArray={srcSetWebpArray}
                hasWebp
                crossOrigin={crossOrigin}
                sizes={sizes}
                alt={alt}
                {...other}
              />
            </noscript>
          )}
        </AspectRatioPlaceholder>
        {children}
      </FigureElement>
    );
  }
}

export const StyledImage = withTheme(ExtendedImage);
