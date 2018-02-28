//@flow
import * as React from 'react';
import classNames from 'classnames';
import type { BreadcrumbsStatelessType } from '../types';
import EllipsisItem from './EllipsisItem';

export default class BreadcrumbsStateless extends React.Component<BreadcrumbsStatelessType> {
  static defaultProps = {
    isExpanded: false,
    children: null,
    maxItems: 0,
    separator: '/',
  };

  renderAllItems(): Array<React.Element<*>> {
    const { children } = this.props;
    const allNonEmptyItems = React.Children.toArray(children);

    return React.Children.map(allNonEmptyItems, index =>
      React.cloneElement(index, {
        hasSeparator: index < allNonEmptyItems.length - 1,
      }),
    );
  }

  renderFirstAndLast() {
    const { separator } = this.props;
    const itemsToRender = this.renderAllItems();

    return [
      itemsToRender[0],
      <EllipsisItem hasSeparator separator={separator} />,
      itemsToRender[itemsToRender.length - 1],
    ];
  }

  render() {
    const { children, isExpanded, maxItems, ariaLabel } = this.props;

    return (
      <nav ariaLabel={ariaLabel}>
        <div className={classNames('gc-breadcrumbs')}>
          {isExpanded || (maxItems && React.Children.toArray(children).length <= maxItems)
            ? this.renderAllItems()
            : this.renderFirstAndLast()}
        </div>
      </nav>
    );
  }
}
