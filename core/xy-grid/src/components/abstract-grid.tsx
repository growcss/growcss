import React, { Component, ReactNode, ReactElement, Children } from 'react';
import classNames from 'classnames';
import { Gutters as DefaultGutters } from './gutters';
import { XYGridElement } from '../styled/xy-grid-element';
// eslint-disable-next-line no-unused-vars
import { GridProps, CellProps, GuttersProps } from '../../types';

interface DefaultGridProps {
  gutterSizes?: GuttersProps;
  alignX?: string;
}

type PropsWithDefaults = GridProps & DefaultGridProps;

export default class AbstractGrid extends Component<GridProps> {
  public static defaultProps: DefaultGridProps = {
    gutterSizes: DefaultGutters,
    alignX: 'left',
  };

  /**
   * Setting for getting a gridy or gridx type.
   *
   * @param {boolean} vertical
   */
  protected vertical: boolean;

  /**
   * @inheritdoc
   */
  public render(): ReactNode {
    const { children, gutterSizes, gutterType, alignX, alignY, height, ...other } = this
      .props as PropsWithDefaults;
    const className = classNames(`gc-grid-${this.vertical ? 'y' : 'x'}`);
    const direction = this.vertical ? 'vertical' : 'horizontal';

    if (this.vertical && height === undefined) {
      throw new Error(
        'Y-Grid needs always a height, please use "height" prop to add the grid height.',
      );
    }

    return (
      <XYGridElement
        className={className}
        gridDirection={direction}
        alignX={alignX}
        alignY={alignY}
        gridHeight={height}
        flexWrap
        {...other}
      >
        {this.renderCellChildren(children, gutterType, gutterSizes)}
      </XYGridElement>
    );
  }

  /**
   * Renders the child elements.
   *
   * @param {Component<CellProps>[]}   children
   * @param {undefined | string}       gutterType
   * @param {undefined | GuttersProps} gutterSizes
   *
   * @returns {ReactNode[]}
   */
  private renderCellChildren(
    children: ReactNode,
    gutterType?: string,
    gutterSizes?: GuttersProps,
  ): ReactNode[] {
    return Children.map(children, (thisArg: ReactElement<CellProps>) => {
      return React.cloneElement(thisArg, {
        gutterType,
        gutterSizes,
        vertical: this.vertical,
      });
    });
  }
}
