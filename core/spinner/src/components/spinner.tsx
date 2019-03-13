import React, { Component, ReactNode, ComponentClass, ClassAttributes } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimationProps, SpinnerProps, SpinnerState } from '../../types';
import { FingerprintAnimation } from './animations/fingerprint-animation';
import { TwoHalfCircleAnimation } from './animations/two-half-circle-animation';
import { HalfCircleAnimation } from './animations/half-circle-animation';
import { SpinnerElement } from './styled/spinner-element';

/**
 * A list of named sizes for spinner.
 *
 * @type {{small: number, medium: number, large: number, xlarge: number, xxlarge: number}}
 */
export const Size: { [key: string]: number } = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 48,
  xxlarge: 96,
};

interface DefaultSpinnerProps extends SpinnerProps {
  delay: number;
  size: string | number;
  animation: string;
  isCompleting: boolean;
}

export class Spinner extends Component<SpinnerProps, SpinnerState> {
  public static defaultProps: DefaultSpinnerProps = {
    delay: 10,
    size: 'large',
    animation: 'halfCircle',
    color: '#000',
    isCompleting: false,
  };

  public render(): ReactNode {
    const { delay, animation, color, isCompleting } = this.props as DefaultSpinnerProps;
    const animations: { [key: string]: ComponentClass } = {
      fingerprint: FingerprintAnimation,
      twoHalfCircle: TwoHalfCircleAnimation,
      halfCircle: HalfCircleAnimation,
    };
    const size = this.getSize();

    return (
      <SpinnerElement className="gc-spinner">
        {React.createElement(
          animations[animation] as ComponentClass,
          // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
          {
            size,
            delay,
            color,
            isCompleting,
          } as ClassAttributes<AnimationProps>,
        )}
      </SpinnerElement>
    );
  }

  /**
   * Returns spinner size number.
   *
   * @returns number
   */
  private getSize(): number {
    const { size } = this.props as DefaultSpinnerProps;
    const spinnerSize = Size[size] || size;

    return typeof spinnerSize === 'number' ? spinnerSize : Size.small;
  }
}
