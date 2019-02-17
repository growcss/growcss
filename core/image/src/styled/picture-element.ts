import styled, { keyframes, css } from 'styled-components';

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

const imageSize = css`
  display: block;
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
  max-width: 100%;
  box-sizing: border-box;
  object-fit: cover;
  object-position: center;
`;

export const PictureElement = styled.picture`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  ${imageSize}

  > img {
    border: 0 none;
    ${imageSize}
  }

  &.preload {
    visibility: hidden;
    opacity: 0;
  }

  &.loaded > img {
    will-change: transform, opacity;
    animation: ${animation} 1s ease-out;
    visibility: visible;
    opacity: 1;
  }

  &.visible > img {
    visibility: visible;
    opacity: 1;
  }

  @media only screen and (prefers-reduced-motion: reduce) {
    &.loaded > img {
      will-change: unset;
      animation: none;
    }
  }
`;
