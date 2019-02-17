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
        values: itemId === 0 ? ['0deg', '360deg'] : ['360deg', '0deg', '360deg'],
        duration: itemId === 0 ? 1000 : 2000,
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

interface CircleElementProps {
  itemId: number;
  size: number;
  color: string;
}

const CircleElement = styled.div<CircleElementProps>`
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: ${props => Math.ceil(props.size / 12)}px solid transparent;
  box-sizing: border-box;
  ${props =>
    props.itemId === 0
      ? `border-top-color: ${props.color};`
      : `border-bottom-color: ${props.color};`}
`;

export const AnimatedTwoHalfCircleElement = posed(CircleElement)(Setting);
