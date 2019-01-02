import * as React from 'react';
import classNames from 'classnames';
import { Gutters as DefaultGutters } from './gutters';
import { CellElement } from '../styled/cell-element';
import { CellBreakpointsProps, CellProps, GuttersProps, OffsetProps } from '../../types';

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
