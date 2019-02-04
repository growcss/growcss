import * as React from 'react';
import { PoseGroup } from 'react-pose';
import styled from 'styled-components';
import { AnimationProps } from '../../../types';
import { AnimatedTwoHalfCircleElement } from '../styled/animated-two-half-circle-element';
import { AnimationElement } from '../styled/animation-element';

const CircleBox = styled(AnimationElement)`
  border-radius: 100%;
`;

export default class TwoHalfCircleAnimation extends React.Component<AnimationProps> {
  public render(): React.ReactNode {
    const { size, color, delay, isCompleting } = this.props;
    const items: Array<number> = [0, 1];

    return (
      <CircleBox className="two-half-circle-animation" size={size}>
        <PoseGroup animateOnMount>
          {!isCompleting &&
            items.map((id: number) => (
              <AnimatedTwoHalfCircleElement
                key={id}
                itemId={id}
                delay={delay}
                size={size}
                color={color}
                initialPose="none"
              />
            ))}
        </PoseGroup>
      </CircleBox>
    );
  }
}
