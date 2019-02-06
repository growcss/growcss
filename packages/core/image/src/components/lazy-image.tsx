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

interface DefaultImageProps {
  afterLoad: Function;
  beforeLoad: Function;
  visibleByDefault: boolean;
}

type PropsWithDefaults = ImageType &
  DefaultImageProps &
  ThemedStyledProps<{}, GrowCssTheme>;
type BreakpointsProps = {
  [key: string]: string;
};

class LazyImage extends React.Component<ImageType, StateType> {
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
      afterLoad,
      beforeLoad,
      visibleByDefault,
      // src,
      // srcSet,
    } = props as PropsWithDefaults;
    this.src = '';
    this.srcSet = '';

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
              className="preview"
              src={previewImage || this.src}
              crossOrigin="anonymous"
              alt={alt}
            />
          )}
          <ImageElement
            className={classNames({
              loaded: imageLoaded && !visibleByDefault,
              visible: visibleByDefault,
            })}
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
}

export default withTheme(LazyImage);
