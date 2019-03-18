import { css } from 'styled-components';
import { ColorsProps, TypographyProps } from '../../types';

export default (
  typography: TypographyProps,
  tableBorderWidth: number,
  gutterSize: number,
  colors: ColorsProps,
) => css`
  table {
    border-collapse: collapse;
    width: 100%;
  }

  thead,
  tbody,
  tfoot {
    border-bottom: ${tableBorderWidth}px solid ${colors.gray[700]};
  }

  td,
  th {
    border: none;
    padding: ${gutterSize / 2}px ${gutterSize}px;
    text-align: left;
  }

  th {
    vertical-align: top;
  }

  td:first-child,
  th:first-child {
    padding-left: 0;
  }

  td:last-child,
  th:last-child {
    padding-right: 0;
  }

  caption {
    ${typography.h3}
    text-align: left;
  }
`;
