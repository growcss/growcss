// @flow
import { Button } from '@growcss/button';
import styled, { css } from 'styled-components';

export const ButtonElement = styled(Button)`
  ${({ truncationWidth }: { truncationWidth: number }) =>
    truncationWidth
      ? css`
          max-width: ${truncationWidth}px !important;
        `
      : css`
          flex-shrink: 1;
          min-width: 0;
        `};
`;
