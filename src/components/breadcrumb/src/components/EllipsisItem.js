//@flow
import React, { Component } from 'react';
import type { EllipsisItemType } from '../types';
import { SeparatorElement } from '../styled/SeparatorElement';

export default class EllipsisItem extends Component<EllipsisItemType> {
  static defaultProps = {
    hasSeparator: false,
  };

  render() {
    const { hasSeparator, separator } = this.props;

    return (
      // &hellip;
      hasSeparator ? <SeparatorElement>{separator}</SeparatorElement> : null
    );
  }
}
