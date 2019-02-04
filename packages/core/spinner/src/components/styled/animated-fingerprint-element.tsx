import styled from 'styled-components';
import posed from 'react-pose';
import { easeIn } from '@popmotion/easing';

const Setting = {
  enter: {
    rotate: '0deg',
    opacity: 1,
    transition: {
      rotate: ({ itemId, delay }) => ({
        type: 'keyframes',
        values: ['360deg', '0deg', '360deg'],
        duration: 1500,
        elapsed: itemId * 100,
        delay,
        ease: easeIn,
        loop: Infinity,
      }),
      default: {
        duration: 300,
      },
    },
  },
  exit: {
    opacity: 0,
    transition: {
      delay: 200,
      duration: 300,
    },
  },
};

type FingerprintElementProps = {
  itemId: number;
  rings: number;
  size: number;
  color: string;
};

const FingerprintElement = styled.div<FingerprintElementProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: ${props => props.color};
  margin: auto;
  height: ${props =>
    (props.size - 10) / props.rings +
    (props.itemId * (props.size - 10)) / props.rings}px;
  width: ${props =>
    (props.size - 10) / props.rings +
    (props.itemId * (props.size - 10)) / props.rings}px;
  box-sizing: border-box;
`;

export const AnimatedFingerprintElement = posed(FingerprintElement)(Setting);
