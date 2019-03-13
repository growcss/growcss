import styled from 'styled-components';

export const PlaceholderElement = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  filter: blur(2vw);
  background-size: cover;
  background-repeat: no-repeat;
  /* this is needed so Safari keeps sharp edges */
  transform: scale(1.05);
`;
