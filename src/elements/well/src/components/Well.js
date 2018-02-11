//@flow
import React, { Component } from 'react';
import classNames from 'classnames';
import remCalc from '@growcss/util-remcalc';
import type { WellType } from '../types';
import { WellElement } from '../styled/WellElement'
import { Gutters as DefaultGutters } from './Gutters';

export default class Well extends Component<WellType>
{
  static defaultProps = {
    gutterSizes: DefaultGutters,
    minHeight: remCalc('80px')
  };

  render() {
    const {
      children,
      gutterSizes,
      minHeight,
      backgroundImages,
      ...other
    } = this.props;
    const className = classNames({
      'gc-well': true,
      'has-background-images': backgroundImages !== undefined
    });

    return (
      <WellElement
        className={className}
        gutterSizes={gutterSizes}
        minHeight={minHeight}
        backgroundImages={backgroundImages}
        {...other}
      >
        {children}
      </WellElement>
    );
  }
}
