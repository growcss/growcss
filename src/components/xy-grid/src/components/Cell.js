// @flow
import * as React from 'react';
import classNames from 'classnames';
import { Gutters as DefaultGutters } from './Gutters';
import { CellElement } from '../styled/CellElement';
import type { CellType } from '../types';

export default class Cell extends React.Component<CellType> {
  static defaultProps = {
    gridColumns: 12,
    gutterSizes: DefaultGutters,
    vertical: false,
  };

  /**
   * @inheritdoc
   */
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
