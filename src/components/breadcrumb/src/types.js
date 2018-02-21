// @flow
import * as React from 'react';

export type Route = {
  path: string;
  breadcrumbName: string;
};

export type BreadcrumbType = {
  children?: React.Node,
  routes?: Route[],
  ariaLabel?: string,
  role?: string,
};

export type BreadcrumbsStatelessType = {
  isExpanded?: boolean,
  maxItems?: number,
  onExpand: Event => mixed,
  children?: React.Node,
  routes?: Route[],
  ariaLabel?: string,
  role?: string,
};
