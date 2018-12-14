import * as React from 'react';
import classNames from 'classnames';
import { rem } from '@growcss/elaborate';
import { Gutters as DefaultGutters, GuttersProps } from './gutters';
import { GridContainerElement } from '../styled/grid-container-element';

export interface GridContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  type?: string;
  width?: string | number;
  gutterSizes?: string | number | GuttersProps;
}

interface DefaultGridContainerProps {
  width: string;
  gutterSizes: GuttersProps;
}

type PropsWithDefaults = GridContainerProps & DefaultGridContainerProps;

export default class GridContainer extends React.PureComponent<GridContainerProps> {
  public static defaultProps: DefaultGridContainerProps = {
    width: rem(1200),
    gutterSizes: DefaultGutters,
  };

  public render() {
    const { type, children, width, gutterSizes, ...other } = this
      .props as PropsWithDefaults;
    const className = classNames('gc-grid-container');

    let maxWidth = width;
    let gutter: string | number | GuttersProps = gutterSizes;

    if (type === 'fluid' || type === 'full') {
      maxWidth = '100%';
    }

    if (type === 'full') {
      gutter = '0';
    }

    return (
      <GridContainerElement
        className={className}
        maxWidth={maxWidth}
        gutterSizes={gutter}
        type={type}
        {...other}
      >
        {children}
      </GridContainerElement>
    );
  }
}
