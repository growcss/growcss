import { css } from 'styled-components';

export default colors => css`
  a {
    color: ${colors.blue};
    text-decoration: none;
  }
  a:hover {
    color: ${colors.blueLight};
    text-decoration: underline;
  }
  a:active {
    color: ${colors.blueDark};
  }
  a:focus {
    outline: 2px solid ${colors.blueLighter};
    outline-offset: 2px;
  }
`;
