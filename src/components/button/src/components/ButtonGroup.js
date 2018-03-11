//@flow
import * as React from 'react';
import { ButtonGroupElement } from '../styled/ButtonGroupElement';
import { ButtonGroupItemElement } from '../styled/ButtonGroupItemElement';
import type { ButtonGroupType } from '../types';

export default class ButtonGroup extends React.Component<ButtonGroupType> {
  render() {
    const { appearance, children, ...other } = this.props;

    return (
      <ButtonGroupElement {...other}>
        {React.Children.map(children, (child, idx) => {
          if (child === null || child === false) {
            return child;
          }

          return (
            <ButtonGroupItemElement key={idx}>
              {appearance ? React.cloneElement(child, { appearance }) : child}
            </ButtonGroupItemElement>
          );
        })}
      </ButtonGroupElement>
    );
  }
}
