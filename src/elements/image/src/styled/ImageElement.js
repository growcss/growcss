// @flow
import styled, { keyframes } from 'styled-components';

const animation = keyframes`
  0% { transform: scale(1.05); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

export const ImageElement = styled.img`
  background-position: 50%;
  background-size: cover;

  height: 100%;
  width: 100%;
  max-width: none;

  display: block;
  border: 0 none;

  position: absolute;
  left: 0;
  top: 0;

  &.reveal {
    will-change: transform, opacity;
    animation: ${animation} 1s ease-out;
  }

  &.preview {
    filter: blur(2vw);
    transform: scale(1.05);
  }
`;
