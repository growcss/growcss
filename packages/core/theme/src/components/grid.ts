import { rem } from '@growcss/elaborate';
import { getGutterSize } from '../utils/get-gutter-size';

const gutters = {
  small: `${getGutterSize(2)}px`,
  medium: `${getGutterSize(3)}px`,
};

export default {
  //  Global width of your site. Used by the grid to determine row width.
  maxWidth: rem(1200),
  gutterBreakpoint: 'small',
  marginGutters: gutters,
  paddingGutters: gutters,
  columns: 12,
};
