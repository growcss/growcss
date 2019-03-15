import React, { PureComponent, ReactNode, ReactElement } from 'react';
import classnames from 'classnames'
// eslint-disable-next-line no-unused-vars
import { withTheme, DefaultTheme } from 'styled-components';
import { DividerElement } from '../styled/DividerElement';

class Divider extends PureComponent<{}> {
  /**
   * {@inheritDoc}
   */
  public render(): React.ReactNode {
    const {
      children,
      className,
      clearing,
      fitted,
      hidden,
      horizontal,
      inverted,
      section,
      vertical,
    } = this.props;

    return (
      <DividerElement>
        {children}
      </DividerElement>
    );
  }
}

export const StyledDivider = withTheme(Divider);
