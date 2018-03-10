// @flow
import styled from 'styled-components';

export const TagElement = styled.div`
  color: ${props => props.color || '#000'};
  background: ${props => props.backgroundColor || '#fff'};
`;
