import { css } from 'styled-components';

interface LinkColors {
  [key: string]: string;
}

export default (linkColors: LinkColors) => css`
  a {
    color: ${linkColors.main};
    text-decoration: none;
  }
  a:hover {
    color: ${linkColors.hover};
    text-decoration: underline;
  }
  a:active {
    color: ${linkColors.active};
  }

  a:focus {
    color: ${linkColors.focus};
  }
`;
