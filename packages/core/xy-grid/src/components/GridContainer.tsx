import * as React from 'react';
import classNames from 'classnames';
import {rem} from '@growcss/elaborate';
import {Gutters as DefaultGutters,GuttersProps} from './Gutters';
import {GridContainerElement} from '../styled/GridContainerElement';

export interface GridContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
  type?: string,
  width?: string | number,
  gutterSizes?: string | number | GuttersProps,
}

type GridContainerDefaultProps = {
  width: string | number,
  gutterSizes: GuttersProps,
}

export default class GridContainer extends React.Component<GridContainerProps> {
  static defaultProps: GridContainerDefaultProps = {
    width: rem(1200),
    gutterSizes: DefaultGutters,
  };

  render() {
    const {
      type,
      children,
      width,
      gutterSizes,
      ...other
    } = this.props;
    const className = classNames('gc-grid-container');

    let maxWidth = width;
    let gutter = gutterSizes;

    if (type === 'fluid' || type === 'full') {
      maxWidth = '100%';
    }

    if (type === 'full') {
      gutter = '0';
    }

    return (
      <GridContainerElement
        className={className}
        maxWidth={maxWidth!}
        gutterSizes={gutter!}
        type={type}
        {...other}
      >
        {children}
      </GridContainerElement>
    );
  }
}
