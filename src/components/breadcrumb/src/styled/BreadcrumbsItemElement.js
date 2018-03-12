// @flow
import styled from 'styled-components';
import { Breadcrumbs as BreadcrumbsStyle, getStyle } from '@growcss/theme';

export const BreadcrumbsItemElement = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 ${props => getStyle(props, BreadcrumbsStyle, 'gridSize') || 8 / 2};
  box-sizing: border-box;
  max-width: 100%;
`;
