import * as React from 'react';
import classNames from 'classnames';
import { withTheme } from 'styled-components';
import { getThemeValue } from '@growcss/theme';
import { CellElement } from '../styled/cell-element';
// eslint-disable-next-line no-unused-vars
import { CellBreakpointsProps, CellProps, OffsetProps } from '../../types';

interface DefaultCellProps {
  vertical: boolean;
}

type PropsWithDefaults = CellProps & DefaultCellProps;

class Cell extends React.PureComponent<CellProps & CellBreakpointsProps & OffsetProps> {
  public static defaultProps: DefaultCellProps = {
    vertical: false,
  };

  public render() {
    const { children, cellType, gutterType, vertical, align, theme, ...other } = this
      .props as PropsWithDefaults;

    return (
      <CellElement
        className={classNames('gc-cell')}
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
