import React, { PureComponent, ReactNode } from 'react';
import classNames from 'classnames';
// eslint-disable-next-line no-unused-vars
import { withTheme } from 'styled-components';
import { DividerElement } from '../styled/divider-element';
import { DividerProps } from '../../types';

class Divider extends PureComponent<DividerProps> {
  /**
   * {@inheritDoc}
   */
  public render(): ReactNode {
    const { children, className, hidden, horizontal, vertical, theme } = this.props;

    return (
      <DividerElement
        theme={theme}
        hidden={hidden}
        horizontal={horizontal}
        vertical={vertical}
        className={classNames('gc-divider', className, {
          hidden,
          horizontal,
          vertical,
        })}
      >
        {children}
      </DividerElement>
    );
  }
}

export const StyledDivider = withTheme(Divider);
