import { css } from 'styled-components';
import { ColorsProps } from '../../types';

export default (colors: ColorsProps) => css`
  a {
    color: ${colors.blue[500]};
    text-decoration: none;
  }
  a:hover {
    color: ${colors.blue[700]};
    text-decoration: underline;
  }
  a:active {
    color: ${colors.blue[300]};
  }
  a:focus {
    outline: 2px solid ${colors.blue[700]};
    outline-offset: 2px;
  }
`;
