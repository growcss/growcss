import * as React from 'react';
import classNames from 'classnames';
import { XYGridElement } from '../styled/xy-grid-element';
// eslint-disable-next-line no-unused-vars
import { GridProps, CellProps } from '../../types';

interface DefaultGridProps {
  alignX?: string;
}

type PropsWithDefaults = GridProps & DefaultGridProps;

export default class AbstractGrid extends React.Component<GridProps> {
  public static defaultProps: DefaultGridProps = {
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
  public render() {
    const { children, gutterType, alignX, alignY, height, ...other } = this
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
        wrap
        {...other}
      >
        {this.renderCellChildren(children, gutterType)}
      </XYGridElement>
    );
  }

  /**
   * Renders the child elements.
   *
   * @param {React.Component<CellProps>[]} children
   * @param {undefined | string}           gutterType
   *
   * @return {Object}
   */
  private renderCellChildren(children: React.ReactNode, gutterType?: string) {
    return React.Children.map(children, (thisArg: React.ReactElement<CellProps>) => {
      return React.cloneElement(thisArg, {
        gutterType,
        vertical: this.vertical,
      });
    });
  }
}
