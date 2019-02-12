import * as React from 'react';
// eslint-disable-next-line no-unused-vars
import { withTheme } from 'styled-components';
import { getThemeValue } from '@growcss/theme';
// eslint-disable-next-line no-unused-vars
import { AnimationProps, SpinnerProps, SpinnerState } from '../../types';
import FingerprintAnimation from './animations/fingerprint-animation';
import TwoHalfCircleAnimation from './animations/two-half-circle-animation';
import HalfCircleAnimation from './animations/half-circle-animation';
import { SpinnerElement } from './styled/spinner-element';

interface DefaultSpinnerProps {
  delay: number;
  size: string | number;
  animation: string;
  isCompleting: boolean;
}

type PropsWithDefaults = DefaultSpinnerProps & SpinnerProps;

class Spinner extends React.Component<SpinnerProps, SpinnerState> {
  public static defaultProps: DefaultSpinnerProps = {
    delay: 10,
    size: 'large',
    animation: 'halfCircle',
    isCompleting: false,
  };

  public render(): React.ReactNode {
    const { delay, animation, isCompleting, size, theme } = this
      .props as PropsWithDefaults;
    const animations: { [key: string]: React.ComponentClass } = {
      fingerprint: FingerprintAnimation,
      twoHalfCircle: TwoHalfCircleAnimation,
      halfCircle: HalfCircleAnimation,
    };
    const spinnerSizes = getThemeValue('spinner.size')(theme);

    return (
      <SpinnerElement className="gc-spinner">
        {React.createElement(animations[animation], {
          size: spinnerSizes[size] || size,
          delay,
          color: getThemeValue('spinner.color')(theme),
          isCompleting,
        } as React.ClassAttributes<AnimationProps>)}
      </SpinnerElement>
    );
  }
}

export default withTheme(Spinner);
