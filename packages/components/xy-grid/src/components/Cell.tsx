import * as React from 'react';
import classNames from 'classnames';
import { Gutters as DefaultGutters, GuttersProps } from './Gutters';
import { CellElement } from '../styled/CellElement';
import { BreakpointsProps } from '@growcss/image/src/components/Breakpoints';

export interface CellProps {
  children: React.Component<CellProps>[],
  gridColumns?: number,
  vertical?: boolean,
  gutterSizes?: GuttersProps,
  cellType?: string,
  gutterType?: string,
  align?: string,
}

export interface OffsetProps {
  [key: string]: number | undefined
}

export default class Cell extends React.Component<CellProps & BreakpointsProps & OffsetProps> {
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
