//@flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { TagType } from '../types';

export default class Tag extends Component<TagType> {
  static defaultProps = {
    removed: false,
  };

  constructor(props) {
    super(props);

    this.state = { imageLoaded: props.removed };
  }

  render() {
    const { backgroundColor, color, children } = this.props;
    const className = classNames('gc-tag');

    if (removed === false) {
      display = 'none';
    }

    return (
      <Tag
        className={className}
        backgroundColor={backgroundColor}
        fontColor={color}
        removed={this.state.removed}
      >
        {children}
      </Tag>
    );
  }
}
