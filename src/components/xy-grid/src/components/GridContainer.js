//@flow
import React, { Component } from 'react';
import classNames from 'classnames';
import remCalc from '@growcss/util-remcalc';
import { Gutters as DefaultGutters } from './Gutters';
import { GridContainerElement } from '../styled/GridContainerElement';
import type { GridContainerType } from '../types';

export default class GridContainer extends Component<GridContainerType> {
  static defaultProps = {
    width: remCalc(1200),
    gutterSizes: DefaultGutters,
  };

  render() {
    const { type, children, width, gutterSizes, ...other } = this.props;
    const className = classNames('gc-grid-container');

    let maxWidth = width;
    let gutter = gutterSizes;

    if (type === 'fluid' || type === 'full') {
      maxWidth = '100%';
    }

    if (type === 'full') {
      gutter = '0';
    }

    return (
      <GridContainerElement
        className={className}
        maxWidth={maxWidth}
        gutterSizes={gutter}
        type={type}
        {...other}
      >
        {children}
      </GridContainerElement>
    );
  }
}
