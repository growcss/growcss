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
  truncationWidth?: number,
  target?: '_blank' | '_parent' | '_self' | '_top' | '',
};

export type FunctionType = (...args: Array<any>) => mixed;
