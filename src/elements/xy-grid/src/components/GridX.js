//@flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { Gutters as DefaultGutters } from './Gutters';
import { XYGridElement } from '../styled/XYGridElement';
import type { GridXType } from '../types';

export default class GridX extends Component<GridXType> {
  static defaultProps = {
    gutterSizes: DefaultGutters,
    alignX: 'left',
  };

  render() {
    const {
      children,
      gutterSizes,
      gutterType,
      alignX,
      alignY,
      ...other
    } = this.props;
    const className = classNames('gc-gridx');

    const cells = React.Children.map(children, thisArg => {
      return React.cloneElement(thisArg, {
        vertical: false,
        gutterType,
        gutterSizes,
      });
    });

    return (
      <XYGridElement
        className={className}
        gridDirection="horizontal"
        gutterSizes={gutterSizes}
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
