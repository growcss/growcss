//@flow
import React, { Component } from 'react';
import classNames from 'classnames';
import remCalc from '@growcss/util-remcalc';
import Image from './Image';
import { Gutters as DefaultGutters } from './Gutters';
import type { WellType } from '../types';
import { WellElement } from '../styled/WellElement';

export default class Well extends Component<WellType> {
  static defaultProps = {
    gutterSizes: DefaultGutters,
    minHeight: remCalc('80px'),
  };

  render() {
    const {
      children,
      gutterSizes,
      minHeight,
      backgroundImages,
      previewImage,
      ...other
    } = this.props;

    const ComponentClassName = classNames({
      'gc-well': true,
      'has-background-images': backgroundImages !== undefined,
    });
    const ContentClassName = classNames('gc-well-content');

    return (
      <WellElement
        className={ComponentClassName}
        gutterSizes={gutterSizes}
        minHeight={minHeight}
        {...other}
      >
        {backgroundImages !== undefined ? (
          <Image
            backgroundImages={backgroundImages}
            previewImage={previewImage}
          />
        ) : (
          ''
        )}
        {backgroundImages !== undefined ? (
          <section className={ContentClassName}>{children}</section>
        ) : (
          { children }
        )}
      </WellElement>
    );
  }
}
