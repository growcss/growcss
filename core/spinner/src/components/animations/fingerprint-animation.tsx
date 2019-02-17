import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import { PoseGroup } from 'react-pose';
import { AnimationProps } from '../../../types';
import { AnimationElement } from '../styled/animation-element';
import { AnimatedFingerprintElement } from '../styled/animated-fingerprint-element';

const FingerprintBox = styled(AnimationElement)`
  overflow: hidden;
`;

export class FingerprintAnimation extends Component<AnimationProps> {
  public render(): ReactNode {
    const { size, color, delay, isCompleting } = this.props;

    const rings = Math.ceil(size / 12);
    const items: number[] = [];

    for (let i = 1; i <= rings; i++) {
      items.push(i);
    }

    return (
      <FingerprintBox className="fingerprint-animation" size={size}>
        <PoseGroup animateOnMount>
          {!isCompleting &&
            items.map((id: number) => (
              <AnimatedFingerprintElement
                key={id}
                itemId={id}
                size={size}
                delay={delay}
                color={color}
                rings={rings}
                initialPose="none"
              />
            ))}
        </PoseGroup>
      </FingerprintBox>
    );
  }
}
