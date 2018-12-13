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

interface DefaultCellProps {
  gridColumns: number;
  gutterSizes: GuttersProps;
  vertical: boolean;
}

type PropsWithDefaults = CellProps & DefaultCellProps;

export default class Cell extends React.PureComponent<
  CellProps & CellBreakpointsProps & OffsetProps
> {
  public static defaultProps: DefaultCellProps = {
    gridColumns: 12,
    gutterSizes: DefaultGutters,
    vertical: false,
  };

  public render() {
    const {
      children,
      gridColumns,
      cellType,
      gutterType,
      gutterSizes,
      vertical,
      align,
      ...other
    } = this.props as PropsWithDefaults;
    const className = classNames('gc-cell');

    return (
      <CellElement
        className={className}
        gridColumns={gridColumns}
        cellType={cellType}
        gutterType={gutterType}
        gutterSizes={gutterSizes}
        vertical={vertical}
        align={align}
        {...other}
      >
        {children}
      </CellElement>
    );
  }
}
