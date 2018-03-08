//@flow
import type { ButtonType } from '../types';
import type { ButtonState } from '../states';

export default class ButtonPropsResolver {
  static getAppearanceProps = (props: ButtonType, state: ButtonState) => {
    const { isDisabled, isSelected, spacing, shouldFitContainer } = props;

    const { isActive, isFocus, isHover } = state;

    return {
      disabled: isDisabled,
      isActive,
      isFocus,
      isHover,
      isSelected,
      spacing,
      fit: shouldFitContainer,
    };
  };

  static getLinkElementProps = (props: ButtonType) => {
    const { href, target } = props;

    return { href, target };
  };

  static getButtonElementProps = (props: ButtonType) => {
    const { ariaHaspopup, ariaExpanded, ariaControls, form, type } = props;

    return {
      'aria-haspopup': ariaHaspopup,
      'aria-expanded': ariaExpanded,
      'aria-controls': ariaControls,
      form,
      type,
    };
  };

  static getInteractionProps = (component: any) => {
    const { onBlur, onFocus, onMouseDown, onMouseEnter, onMouseLeave, onMouseUp } = component;

    const { onClick, tabIndex } = component.props;

    return {
      onBlur,
      onClick,
      onFocus,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onMouseUp,
      tabIndex,
    };
  };

  static getButtonProps = (component: any) => {
    const { props, state } = component;

    const defaultProps = {
      id: props.id,
      appearance: props.appearance,
      size: props.size,
      ...ButtonPropsResolver.getAppearanceProps(props, state),
      ...ButtonPropsResolver.getInteractionProps(component),
    };

    if (props.href) {
      if (props.isDisabled) {
        return defaultProps;
      }

      return {
        ...defaultProps,
        ...ButtonPropsResolver.getLinkElementProps(props),
      };
    }

    return {
      ...defaultProps,
      ...ButtonPropsResolver.getButtonElementProps(props),
    };
  };
}
