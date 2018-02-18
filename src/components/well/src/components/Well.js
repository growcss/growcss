//@flow
import * as React from 'react';
import classNames from 'classnames';
import remCalc from '@growcss/util-remcalc';
import Image from './Image';
import { Gutters as DefaultGutters } from './Gutters';
import { WellElement } from '../styled/WellElement';
import type { WellType, ImagesType } from '../types';
import type { StateType } from '../states';

export default class Well extends React.Component<WellType, StateType> {
  static defaultProps = {
    gutterSizes: DefaultGutters,
    minHeight: remCalc('80px'),
  };

  well: Object;

  constructor(props: WellType) {
    super(props);

    this.state = { loadedContentHeight: 0, loadedContentWidth: 0 };
  }

  renderBackgroundImage(backgroundImages: ImagesType, previewImage?: string, alt: string) {
    if (backgroundImages !== undefined) {
      return <Image
        height={this.state.loadedContentHeight}
        width={this.state.loadedContentWidth}
        backgroundImages={backgroundImages}
        previewImage={previewImage}
        alt={alt}
      />;
    }

    return null;
  }

  componentDidMount() {
    const height = this.well.clientHeight;

    this.setState({ loadedContentHeight: height, loadedContentWidth: height });
  }

  render() {
    const {
      children,
      gutterSizes,
      minHeight,
      backgroundImages,
      previewImage,
      alt,
      ...other
    } = this.props;
    const className = classNames({
      'gc-well': true,
      'has-background-images': backgroundImages !== undefined,
    });

    return (
      <WellElement
        innerRef={well => { this.well = well; }}
        className={className}
        gutterSizes={gutterSizes}
        minHeight={minHeight}
        {...other}
      >
        {this.renderBackgroundImage(backgroundImages, previewImage, alt)}
        <section className='gc-well-content'>{children}</section>
      </WellElement>
    );
  }
}
