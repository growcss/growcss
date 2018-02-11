//@flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { Gutters as DefaultGutters } from './Gutters';
import { XYGridElement } from '../styled/XYGridElement';
import type { GridYType } from '../types';

export default class GridY extends Component<GridYType> {
  static defaultProps = {
    gutterSizes: DefaultGutters,
    alignX: 'left',
  };

  render() {
    const {
      children,
      height,
      gutterSizes,
      gutterType,
      alignX,
      alignY,
      ...other
    } = this.props;
    const className = classNames('gc-gridy');

    const cells = React.Children.map(children, thisArg => {
      return React.cloneElement(thisArg, {
        vertical: true,
        gutterType,
        gutterSizes,
      });
    });

    return (
      <XYGridElement
        className={className}
        gridDirection="vertical"
        gutterSizes={gutterSizes}
        gridHeight={height}
        alignX={alignX}
        alignY={alignY}
        {...other}
        wrap
      >
        {cells}
      </XYGridElement>
    );
  }
}
