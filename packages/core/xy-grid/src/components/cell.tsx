import * as React from 'react';
import classNames from 'classnames';
import { Gutters as DefaultGutters, GuttersProps } from './gutters';
import { CellElement } from '../styled/cell-element';

export interface CellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gridColumns?: number;
  vertical?: boolean;
  gutterSizes?: GuttersProps;
  cellType?: string;
  gutterType?: string;
  align?: string;
}

export interface OffsetProps {
  smallOffset?: number;
  mediumOffset?: number;
  largeOffset?: number;
  xlargeOffset?: number;
  xxlargeOffset?: number;
}

export interface CellBreakpointsProps {
  small?: number | string;
  medium?: number | string;
  large?: number | string;
  xlarge?: number | string;
  xxlarge?: number | string;
}

export default class Cell extends React.PureComponent<
  CellProps & CellBreakpointsProps & OffsetProps
> {
  static defaultProps = {
    gridColumns: 12,
    gutterSizes: DefaultGutters,
    vertical: false,
  };

  render() {
    const {
      children,
      gridColumns,
      cellType,
      gutterType,
      gutterSizes,
      vertical,
      align,
      ...other
    } = this.props;
    const className = classNames('gc-cell');

    return (
      <CellElement
        className={className}
        gridColumns={gridColumns!}
        cellType={cellType}
        gutterType={gutterType}
        gutterSizes={gutterSizes!}
        vertical={vertical!}
        align={align}
        {...other}
      >
        {children}
      </CellElement>
    );
  }
}
