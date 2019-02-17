import { css } from 'styled-components';
import { Colors } from '../../types';

export default (colors: Colors) => css`
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
