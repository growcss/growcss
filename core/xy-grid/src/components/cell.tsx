import React, { PureComponent, ReactNode } from 'react';
import { getThemeValue } from '@growcss/theme';
import { withTheme } from 'styled-components';
import { CellElement } from '../styled/cell-element';
// eslint-disable-next-line no-unused-vars
import { CellBreakpointsProps, CellProps, OffsetProps } from '../../types';

interface DefaultCellProps {
  vertical: boolean;
}

type PropsWithDefaults = CellProps & DefaultCellProps;

class Cell extends PureComponent<CellProps & CellBreakpointsProps & OffsetProps> {
  public static defaultProps: DefaultCellProps = {
    vertical: false,
  };

  public render(): ReactNode {
    const { children, cellType, gutterType, vertical, align, theme, ...other } = this
      .props as PropsWithDefaults;

    return (
      <CellElement
        className="gc-cell"
        gridColumns={getThemeValue('grid.columns')(theme)}
        cellType={cellType}
        gutterType={gutterType}
        vertical={vertical}
        align={align}
        theme={theme}
        {...other}
      >
        {children}
      </CellElement>
    );
  }
}

export default withTheme(Cell);
