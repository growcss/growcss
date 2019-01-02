import styled, { keyframes } from 'styled-components';

const animation = keyframes`
  0% {
    transform: scale(1.05);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const ImageElement = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: block;
  border: 0 none;
  visibility: hidden;
  opacity: 0;
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  &.loaded {
    will-change: transform, opacity;
    animation: ${animation} 1s ease-out;
    visibility: visible;
    opacity: 1;
  }
  
  &.visible {
    visibility: visible;
    opacity: 1;
  }

  @media only screen and (prefers-reduced-motion: reduce) {
    &.loaded {
      will-change: unset;
      animation: none;
    }
  }
`;
