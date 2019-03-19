import { ReactNode } from 'react';
import { ThemedStyledProps } from 'styled-components';
import { GrowCssTheme } from '@growcss/theme';

export interface DividerProps extends ThemedStyledProps<{}, GrowCssTheme> {
  className?: string;
  horizontal?: boolean;
  hidden?: boolean;
  vertical?: boolean;
  children?: ReactNode;
}
