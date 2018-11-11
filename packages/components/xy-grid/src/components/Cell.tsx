import * as React from 'react';
import classNames from 'classnames';
import { Gutters as DefaultGutters } from './Gutters';
import { CellElement } from '../styled/CellElement';

export interface CellProps {
    children: React.Node,
    gridColumns?: number,
    vertical?: boolean,
    gutterSizes?: string | number | GuttersType,
    cellType?: string,
    gutterType?: string,
    small?: number | string,
    smallOffset?: number,
    medium?: number | string,
    mediumOffset?: number,
    large?: number | string,
    largeOffset?: number,
    xlarge?: number | string,
    xlargeOffset?: number,
    xxlarge?: number | string,
    xxlargeOffset?: number,
    align?: string,
}

export default class Cell extends React.Component<CellProps> {
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
      small,
      smallOffset,
      medium,
      mediumOffset,
      large,
      largeOffset,
      xlarge,
      xlargeOffset,
      xxlarge,
      xxlargeOffset,
      align,
      ...other
    } = this.props;
    const className = classNames('gc-cell');

    return (
      <CellElement
        className={className}
        gridColumns={gridColumns}
        cellType={cellType}
        gutterType={gutterType}
        gutterSizes={gutterSizes}
        vertical={vertical}
        small={small}
        smallOffset={smallOffset}
        medium={medium}
        mediumOffset={mediumOffset}
        large={large}
        largeOffset={largeOffset}
        xlarge={xlarge}
        xlargeOffset={xlargeOffset}
        xxlarge={xxlarge}
        xxlargeOffset={xxlargeOffset}
        align={align}
        {...other}
      >
        {children}
      </CellElement>
    );
  }
}
