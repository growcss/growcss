import React, { Children, PureComponent, ReactNode } from 'react';
import { withTheme } from 'styled-components';
import GridContainerElement from '../styled/grid-container-element';
import { GridContainerProps } from '../../types';

class GridContainer extends PureComponent<
  GridContainerProps,
  { childrenCount: number }
> {
  /**
   * @param {GridContainerProps} props
   */
  public constructor(props: GridContainerProps) {
    super(props);

    this.state = {
      childrenCount: 0,
    };
  }

  /**
   * {@inheritdoc}
   */
  public componentDidMount(): void {
    const { children } = this.props;

    Children.toArray(children).forEach((child: ReactNode) => {
      if (
        child.type !== undefined &&
        ['GridX', 'GridY'].includes(child.type.displayName) &&
        child.props.children !== undefined
      ) {
        this.setState({
          childrenCount: Children.count(child.props.children),
        });
      }
    });
  }

  /**
   * {@inheritdoc}
   */
  public render(): ReactNode {
    const { type, children, className, ...other } = this.props;
    const { childrenCount } = this.state;

    return (
      <GridContainerElement
        type={type}
        childrenCount={childrenCount}
        className={className}
        {...other}
      >
        {children}
      </GridContainerElement>
    );
  }
}

export default withTheme(GridContainer);
