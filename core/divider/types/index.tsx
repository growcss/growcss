import { ThemedStyledProps } from 'styled-components';
import { GrowCssTheme } from '@growcss/theme';

export interface DividerProps extends ThemedStyledProps<HTMLDivElement, GrowCssTheme> {
  className?: string;
  clearing?: boolean;
}
