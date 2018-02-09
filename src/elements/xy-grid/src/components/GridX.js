//@flow
import React, { Component } from "react";
import { XYGridElement } from '../styled/XYGridElement';
import type { GuttersType } from '../types';
import { Gutters as DefaultGutters } from './Gutters';

type GridXType = {
  children: Object,
  gutterSizes?: string | number | GuttersType,
  gutterType?: string,
  alignX?: string,
  alignY?: string,
};

export default class GridX extends Component<GridXType>
{
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

    const cells = React.Children.map(children, (thisArg) => {
      return React.cloneElement(
        thisArg,
        {
          vertical: false,
          gutterType,
          gutterSizes
        }
      );
    });

    return (
      <XYGridElement gridDirection='horizontal' gutterSizes={gutterSizes} alignX={alignX} alignY={alignY} {...other} wrap>
        {cells}
      </XYGridElement>
    );
  }
}
