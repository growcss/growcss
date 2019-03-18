import { ReactNode } from 'react';
import { ThemedStyledProps } from 'styled-components';
import { GrowCssTheme } from '@growcss/theme';

export interface DividerProps extends ThemedStyledProps<{}, GrowCssTheme> {
  className?: string;
  clearing?: boolean;
  horizontal?: boolean;
  hidden?: boolean;
  section?: boolean;
  vertical?: boolean;
  children?: ReactNode;
}
