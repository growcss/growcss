import styled from 'styled-components';
import posed from 'react-pose';
import { easeInOut } from '@popmotion/easing';

const Setting = {
  enter: {
    rotate: '360deg',
    opacity: 1,
    transition: {
      rotate: ({ delay }) => ({
        duration: 1000,
        ease: easeInOut,
        delay,
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

type HalfCircleElementProps = {
  size: number;
  color: string;
};

const HalfCircleElement = styled.div<HalfCircleElementProps>`
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: ${props => Math.ceil(props.size / 12)}px solid transparent;
  box-sizing: border-box;
  border-top-color: ${props => props.color};
`;

export const AnimatedHalfCircleElement = posed(HalfCircleElement)(Setting);
