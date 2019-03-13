import React, { PureComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { Gutters as DefaultGutters } from './gutters';
import { CellElement } from '../styled/cell-element';
// eslint-disable-next-line no-unused-vars
import { CellBreakpointsProps, CellProps, GuttersProps, OffsetProps } from '../../types';

interface DefaultCellProps {
  gridColumns: number;
  gutterSizes: GuttersProps;
  vertical: boolean;
}

type PropsWithDefaults = CellProps & DefaultCellProps;

export class Cell extends PureComponent<CellProps & CellBreakpointsProps & OffsetProps> {
  public static defaultProps: DefaultCellProps = {
    gridColumns: 12,
    gutterSizes: DefaultGutters,
    vertical: false,
  };

  public render(): ReactNode {
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
