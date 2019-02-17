import React, { PureComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { rem } from '@growcss/elaborate';
import { Gutters as DefaultGutters } from './gutters';
import { GridContainerElement } from '../styled/grid-container-element';
import { GridContainerProps, GuttersProps } from '../../types';

interface DefaultGridContainerProps {
  width: string;
  gutterSizes: GuttersProps;
}

type PropsWithDefaults = GridContainerProps & DefaultGridContainerProps;

export class GridContainer extends PureComponent<GridContainerProps> {
  public static defaultProps: DefaultGridContainerProps = {
    width: rem(1200),
    gutterSizes: DefaultGutters,
  };

  public render(): ReactNode {
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
