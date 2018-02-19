//@flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { Gutters as DefaultGutters } from './Gutters';
import { XYGridElement } from '../styled/XYGridElement';
import type { GridType, GuttersType } from '../types';

export default class AbstractGrid extends Component<GridType> {
  static defaultProps = {
    gutterSizes: DefaultGutters,
    alignX: 'left',
  };

  /**
   * Setting for getting a gridy or gridx type.
   *
   * @
   */
  vertical: boolean;

  /**
   *
   * @param children
   * @param gutterType
   * @param gutterSizes
   * @return {Object}
   */
  renderCellChildren(
    children: any,
    gutterType?: string,
    gutterSizes?: string | number | GuttersType,
  ) {
    return React.Children.map(children, thisArg => {
      return React.cloneElement(thisArg, {
        vertical: this.vertical,
        gutterType,
        gutterSizes,
      });
    });
  }

  /**
   * @inheritdoc
   */
  render() {
    const {
      children,
      gutterSizes,
      gutterType,
      alignX,
      alignY,
      height,
      ...other
    } = this.props;
    const className = classNames(
      `gc-grid-${this.vertical === true ? 'y' : 'x'}`,
    );
    const direction = this.vertical === true ? 'vertical' : 'horizontal';

    if (this.vertical === true && height === undefined) {
      throw new Error('');
    }

    return (
      <XYGridElement
        className={className}
        gridDirection={direction}
        gutterSizes={gutterSizes}
        alignX={alignX}
        alignY={alignY}
        gridHeight={height}
        wrap
        {...other}
      >
        {this.renderCellChildren(children, gutterType, gutterSizes)}
      </XYGridElement>
    );
  }
}
