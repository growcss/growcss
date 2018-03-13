// @flow
import * as React from 'react';
import classNames from 'classnames';
import { ButtonElement } from '../styled/ButtonElement';
import { BreadcrumbsItemElement } from '../styled/BreadcrumbsItemElement';
import { SeparatorElement } from '../styled/SeparatorElement';
import type { BreadcrumbsItemType } from '../types';
import type { BreadcrumbsItemStateType } from '../states';

export default class BreadcrumbsItem extends React.Component<
  BreadcrumbsItemType,
  BreadcrumbsItemStateType,
> {
  button: ?HTMLButtonElement;

  static defaultProps = {
    hasSeparator: false,
    href: '#',
    truncationWidth: 0,
    onClick: () => {},
    target: '',
  };

  state = { hasOverflow: false };

  componentDidMount() {
    this.updateOverflow();
  }

  componentWillReceiveProps() {
    this.setState({ hasOverflow: false });
  }

  componentDidUpdate() {
    this.updateOverflow();
  }

  updateOverflow() {
    // const { truncationWidth } = this.props;
    // const button = this.button;
    // if (truncationWidth && button) {
    //   // We need to find the DOM node for the button component in order to measure its size.
    //   const el = ReactDOM.findDOMNode(button); // eslint-disable-line react/no-find-dom-node
    //   if (!el || !(el instanceof HTMLElement)) {
    //     // eslint-disable-next-line no-console
    //     console.warn('Could not find button included in breadcrumb when calculating overflow');
    //     return false;
    //   }
    //   const overflow = el.clientWidth >= truncationWidth;
    //   if (overflow !== this.state.hasOverflow) {
    //     this.setState({ hasOverflow: overflow });
    //   }
    //   return overflow;
    // }
    // return false;
  }

  renderButton = () => {
    const { href, iconAfter, iconBefore, onClick, target, children, truncationWidth } = this.props;
    const { hasOverflow } = this.state;

    return (
      <ButtonElement
        truncationWidth={truncationWidth}
        appearance="subtle-link"
        iconAfter={truncationWidth && hasOverflow ? null : iconAfter}
        iconBefore={truncationWidth && hasOverflow ? null : iconBefore}
        onClick={onClick}
        spacing="none"
        href={href}
        target={target}
        ref={(el: HTMLButtonElement) => {
          this.button = el;
        }}
      >
        {children}
      </ButtonElement>
    );
  };

  render() {
    const { hasSeparator } = this.props;

    return (
      <BreadcrumbsItemElement className={classNames('gc-breadcrumbs-item')}>
        {this.renderButton()}
        {hasSeparator ? <SeparatorElement>/</SeparatorElement> : null}
      </BreadcrumbsItemElement>
    );
  }
}
