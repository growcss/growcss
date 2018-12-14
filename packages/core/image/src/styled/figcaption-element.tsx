import styled from 'styled-components';

export type FigcaptionProps = {
  align?: 'start' | 'left' | 'end' | 'right' | 'center';
};

export const FigcaptionElement = styled.figcaption<FigcaptionProps>`
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  outline: 0;
  text-align: ${props => props.align || 'center'};
  margin: 10px auto 0;
`;
