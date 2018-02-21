//@flow
import * as React from 'react';
import type { BreadcrumbType } from '../types';
import type { StateType } from '../states';
import BreadcrumbsStateless from './BreadcrumbsStateless';

export default class Breadcrumbs extends React.Component<BreadcrumbType, StateType> {
  static defaultProps = {
    children: null,
  };

  state = { isExpanded: false };

  expand = () => this.setState({ isExpanded: true });

  render() {
    return (
      <BreadcrumbsStateless
        {...this.props}
        isExpanded={this.state.isExpanded}
        onExpand={this.expand}
      />
    );
  }
}
