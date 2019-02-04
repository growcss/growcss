import * as React from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimationProps, SpinnerProps, SpinnerState } from '../../types';
import FingerprintAnimation from './animations/fingerprint-animation';
import TwoHalfCircleAnimation from './animations/two-half-circle-animation';
import HalfCircleAnimation from './animations/half-circle-animation';
import { SpinnerElement } from './styled/spinner-element';

/**
 * A list of named sizes for spinner.
 *
 * @type {{small: number, medium: number, large: number, xlarge: number, xxlarge: number}}
 */
export const Size = {
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

export default class Spinner extends React.Component<SpinnerProps, SpinnerState> {
  public static defaultProps: DefaultSpinnerProps = {
    delay: 10,
    size: 'large',
    animation: 'halfCircle',
    color: '#000',
    isCompleting: false,
  };

  public render(): React.ReactNode {
    const { delay, animation, color, isCompleting } = this.props as DefaultSpinnerProps;
    const animations: { [key: string]: React.ComponentClass } = {
      fingerprint: FingerprintAnimation,
      twoHalfCircle: TwoHalfCircleAnimation,
      halfCircle: HalfCircleAnimation,
    };
    const size = this.getSize();

    return (
      <SpinnerElement className="gc-spinner">
        {React.createElement(animations[animation], {
          size,
          delay,
          color,
          isCompleting,
        } as React.ClassAttributes<AnimationProps>)}
      </SpinnerElement>
    );
  }

  private getSize() {
    const { size } = this.props as DefaultSpinnerProps;
    const spinnerSize = Size[size] || size;

    return typeof spinnerSize === 'number' ? spinnerSize : Size.small;
  }
}
