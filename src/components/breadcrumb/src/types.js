// @flow
import * as React from 'react';

export type Route = {
  path: string,
  breadcrumbName: string,
};

export type EllipsisItemType = {
  hasSeparator: boolean,
  separator: string,
};

export type BreadcrumbType = {
  children?: React.Node,
  routes?: Route[],
  ariaLabel?: string,
};

export type BreadcrumbsStatelessType = {
  onExpand: Event => mixed,
  separator: string,
  isExpanded?: boolean,
  maxItems?: number,
  children?: React.Node,
  routes?: Route[],
  ariaLabel?: string,
  role?: string,
};

export type BreadcrumbsItemType = {
  hasSeparator?: boolean,
  href?: string,
  iconBefore?: Node,
  iconAfter?: Node,
  text: string,
  /** The maximum width in pixels that an item can have before it is truncated.
   If this is not set, truncation will only occur when it cannot fit alone on a
   line. If there is no truncationWidth, tooltips are not provided on truncation. */
  truncationWidth?: number,
  target?: '_blank' | '_parent' | '_self' | '_top' | '',
};

export type FunctionType = (...args: Array<any>) => mixed;
