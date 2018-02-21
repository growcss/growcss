//@flow
import * as React from 'react';
import classNames from 'classnames';
import type { BreadcrumbsStatelessType } from '../types';

export default class BreadcrumbsStateless extends React.Component<BreadcrumbsStatelessType> {
  static defaultProps = {
    isExpanded: false,
    children: null,
    maxItems: 0,
  };

  render() {
    const {
      children,
      isExpanded,
      maxItems
    } = this.props;

    return (
      <nav role={role} ariaLabel={ariaLabel}>
        <ul className={classNames('gc-breadcrumbs')}>
          {children}
        </ul>
      </nav>
    );
  }
}
