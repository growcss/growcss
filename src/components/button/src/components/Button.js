//@flow
import * as React from 'react';
import classNames from 'classnames';
import type { ButtonType } from '../types';
import type { ButtonState } from '../states';
import { SpanElement } from '../styled/SpanElement';
import { LinkElement } from '../styled/LinkElement';
import { ButtonElement } from '../styled/ButtonElement';
import ButtonContentElement from '../styled/ButtonContentElement';
import ButtonWrapperElement from '../styled/ButtonWrapperElement';
import IconWrapperElement from '../styled/IconWrapperElement';
import ButtonPropsResolver from '../utils/ButtonPropsResolver';

export default class Button extends React.Component<ButtonType, ButtonState> {
  static defaultProps = {
    appearance: 'default',
    isDisabled: false,
    isSelected: false,
    spacing: 'default',
    type: 'button',
    shouldFitContainer: false,
  };

  /* eslint-disable react/no-unused-state */
  state = {
    isActive: false,
    isFocus: false,
    isHover: false,
  };

  onMouseEnter = () => this.setState({ isHover: true });

  onMouseLeave = () => this.setState({ isHover: false, isActive: false });

  onMouseDown = (event: Event) => {
    event.preventDefault();

    this.setState({ isActive: true });
  };

  onMouseUp = () => this.setState({ isActive: false });

  onFocus = () => this.setState({ isFocus: true });

  onBlur = () => this.setState({ isFocus: false });
  /* eslint-enable react/no-unused-state */

  /**
   * Swallow click events when the button is disabled to prevent inner child clicks bubbling up.
   *
   * @param {Event} event
   */
  onInnerClick = (event: Event) => {
    if (this.props.isDisabled) {
      event.stopPropagation();
    }

    return true;
  };

  getStyledComponent() {
    if (this.props.href) {
      return this.props.isDisabled ? SpanElement : LinkElement;
    }

    return ButtonElement;
  }

  render() {
    const {
      children,
      iconBefore,
      iconAfter,
      innerRef,
      shouldFitContainer,
      className,
      shape,
      size,
      appearance,
      ...others
    } = this.props;

    const classes = classNames('gc-button', className, {
      'gc-button--shape': shape,
      [`gc-button--${appearance || 'default'}`]: appearance,
      [`gc-button--${size || 'default'}`]: size,
    });
    const buttonProps = ButtonPropsResolver.getButtonProps(this);
    const StyledComponent = this.getStyledComponent();

    const iconIsOnlyChild: boolean = !!(
      (iconBefore && !iconAfter && !children) ||
      (iconAfter && !iconBefore && !children)
    );

    return (
      <StyledComponent className={classes} innerRef={innerRef} {...buttonProps} {...others}>
        <ButtonWrapperElement onClick={this.onInnerClick} fit={!!shouldFitContainer}>
          {iconBefore ? (
            <IconWrapperElement spacing={buttonProps.spacing} isOnlyChild={iconIsOnlyChild}>
              {iconBefore}
            </IconWrapperElement>
          ) : null}
          {children ? (
            <ButtonContentElement followsIcon={!!iconBefore} spacing={buttonProps.spacing}>
              {children}
            </ButtonContentElement>
          ) : null}
          {iconAfter ? (
            <IconWrapperElement spacing={buttonProps.spacing} isOnlyChild={iconIsOnlyChild}>
              {iconAfter}
            </IconWrapperElement>
          ) : null}
        </ButtonWrapperElement>
      </StyledComponent>
    );
  }
}
