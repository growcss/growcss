import React, { PureComponent, ReactNode } from 'react';
import classNames from 'classnames'
// eslint-disable-next-line no-unused-vars
import { withTheme } from 'styled-components';
import { DividerElement } from '../styled/DividerElement';
import { DividerProps } from '../../types';

class Divider extends PureComponent<DividerProps> {
  /**
   * {@inheritDoc}
   */
  public render(): ReactNode {
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
      theme,
    } = this.props;

    return (
      <DividerElement theme={theme} className={classNames('gc-divider', className, clearing, fitted, hidden, horizontal, inverted, section, vertical)}>
        {children}
      </DividerElement>
    );
  }
}

export const StyledDivider = withTheme(Divider);
