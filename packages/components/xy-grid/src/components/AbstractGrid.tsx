import React, { Component } from 'react';
import classNames from 'classnames';
import { Gutters as DefaultGutters, GuttersProps } from './Gutters';
import { XYGridElement } from '../styled/XYGridElement';
import { CellProps } from './Cell';

export interface GridProps {
    children: React.Component<CellProps>[],
    height: string,
    gutterSizes?: string | number | GuttersProps,
    gutterType?: string,
    alignX?: string,
    alignY?: string,
}

export default class AbstractGrid extends Component<GridProps> {
  static defaultProps = {
    gutterSizes: DefaultGutters,
    alignX: 'left',
  };

  /**
   * Setting for getting a gridy or gridx type.
   *
   * @param {boolean} vertical
   */
  vertical: boolean;

  /**
   * Renders the child elements.
   *
   * @param {React.Component<CellProps>[]}   children
   * @param {null | string}                  gutterType
   * @param {string | number | GuttersProps} gutterSizes
   *
   * @return {Object}
   */
  renderCellChildren(
    children: React.Component<CellProps>[],
    gutterType?: string,
    gutterSizes?: string | number | GuttersProps,
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
      `gc-grid-${this.vertical ? 'y' : 'x'}`,
    );
    const direction = this.vertical ? 'vertical' : 'horizontal';

    if (this.vertical && height === undefined) {
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
