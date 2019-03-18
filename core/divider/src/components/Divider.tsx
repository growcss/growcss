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
      hidden,
      horizontal,
      section,
      vertical,
      theme,
    } = this.props;

    return (
      <DividerElement
        theme={theme}
        clearing={clearing}
        hidden={hidden}
        horizontal={horizontal}
        section={section}
        vertical={vertical}
        className={classNames(
          'gc-divider',
          className,
          {
            clearing,
            hidden,
            horizontal,
            section,
            vertical
          }
        )}
        >
        { horizontal ? <div>{children}</div> : children }
      </DividerElement>
    );
  }
}

export const StyledDivider = withTheme(Divider);
