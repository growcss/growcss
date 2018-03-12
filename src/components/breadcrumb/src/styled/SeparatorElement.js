// @flow
import styled from 'styled-components';
import remCalc from '@growcss/util-remcalc';
import { Breadcrumbs as BreadcrumbsStyle, getStyle } from '@growcss/theme';

export const SeparatorElement = styled.div`
  color: ${props => getStyle(props, BreadcrumbsStyle, 'color.separator')};
  padding-left: ${props => remCalc(getStyle(props, BreadcrumbsStyle, 'gridSize'))};
  text-align: center;
  width: ${props => remCalc(getStyle(props, BreadcrumbsStyle, 'gridSize'))};
  flex-shrink: 0;
`;
