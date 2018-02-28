//@flow
import * as React from 'react';

export type ButtonAppearances =
  | 'default'
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'link'
  | 'subtle'
  | 'subtle-link';
export type ButtonShape = 'circle' | 'circle-outline';
export type ButtonSize = 'tiny' | 'small' | 'default' | 'large';

type Func = () => any;

export type ButtonContentElementType = {
  followsIcon: boolean,
  spacing: string,
  children: React.Node,
};

export type IconWrapperElementType = {
  spacing: string,
  isOnlyChild: boolean,
  children: React.Node,
};

export type ButtonGroupType = {
  appearance?: ButtonAppearances,
  children: React.ChildrenArray<*>,
};

export type ButtonWrapperType = {
  children: React.Node,
  onClick: (e: Event) => mixed,
  fit: boolean,
};

export type ButtonType = {
  appearance?: ButtonAppearances,
  shape?: ButtonShape,
  size?: ButtonSize,
  ariaControls?: string,
  ariaExpanded?: boolean,
  ariaHaspopup?: boolean,
  children?: React.Node | string,
  className?: string,
  component?: Func | React.Node | Class<*>,
  form?: string,
  href?: string,
  iconAfter?: React.Element<*>,
  iconBefore?: React.Element<*>,
  innerRef?: Func,
  id?: string,
  isDisabled?: boolean,
  isSelected?: boolean,
  onClick?: Func,
  spacing?: 'compact' | 'default' | 'none',
  tabIndex?: number,
  target?: string,
  type?: 'button' | 'submit',
  shouldFitContainer?: boolean,
};
