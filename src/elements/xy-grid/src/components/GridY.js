//@flow
import React, { Component } from "react";
import { XYGridElement } from '../styled/XYGridElement';
import type { GuttersType } from '../types';
import { Gutters as DefaultGutters } from './Gutters';

type GridYType = {
  children: Object,
  height: string,
  gutterSizes?: string | number | GuttersType,
  gutterType?: string,
  alignX?: string,
  alignY?: string,
};

export default class GridY extends Component<GridYType>
{
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

    const cells = React.Children.map(children, (thisArg) => {
      return React.cloneElement(
        thisArg,
        {
          vertical: true,
          gutterType,
          gutterSizes
        }
      );
    });

    return (
      <XYGridElement gridDirection='vertical' gutterSizes={gutterSizes} gridHeight={height} alignX={alignX} alignY={alignY} {...other} wrap>
        {cells}
      </XYGridElement>
    );
  }
}
