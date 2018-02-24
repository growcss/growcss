// @flow
import styled from 'styled-components';

// Target the <a> here to override a:hover specificity.
export const ButtonElement = styled.button`
  a& {
  }
`;
