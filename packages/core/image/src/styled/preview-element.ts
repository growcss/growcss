import styled from 'styled-components';

export const PreviewElement = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  filter: blur(2vw);
  /* this is needed so Safari keeps sharp edges */
  transform: scale(1.05);
`;
