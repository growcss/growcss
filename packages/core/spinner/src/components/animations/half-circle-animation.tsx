import * as React from 'react';
import { PoseGroup } from 'react-pose';
import styled from 'styled-components';
import { AnimationProps } from '../../../types';
import { AnimatedHalfCircleElement } from '../styled/animated-half-circle-element';
import { AnimationElement } from '../styled/animation-element';

const CircleBox = styled(AnimationElement)`
  border-radius: 100%;
`;

export default class TwoHalfCircleAnimation extends React.Component<AnimationProps> {
  public render(): React.ReactNode {
    const { size, color, delay, isCompleting } = this.props;

    return (
      <CircleBox className="half-circle-animation" size={size}>
        <PoseGroup animateOnMount>
          {!isCompleting && (
            <AnimatedHalfCircleElement
              key="circle"
              size={size}
              delay={delay}
              color={color}
              initialPose="none"
            />
          )}
        </PoseGroup>
      </CircleBox>
    );
  }
}
