import React, {Children, PureComponent, ReactNode} from 'react';
import GridContainerElement from '../styled/grid-container-element';
import { GridContainerProps } from '../../types';
import { withTheme } from 'styled-components';

class GridContainer extends PureComponent<GridContainerProps, { childrenCount:  number }> {
  public constructor(props: GridContainerProps) {
    super(props);

    this.state = {
      childrenCount: 0,
    }
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
          childrenCount: Children.count(child.props.children)
        });
      }
    });


  }

  public render(): ReactNode {
    const { type, children, ...other } = this.props;
    const { childrenCount } = this.state;

    return (
      <GridContainerElement
        type={type}
        childrenCount={childrenCount}
        {...other}
      >
        {children}
      </GridContainerElement>
    );
  }
}

export default withTheme(GridContainer);
