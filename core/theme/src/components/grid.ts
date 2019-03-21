import { getGutterSize } from '../utils/get-gutter-size';

const gutters = {
  small: getGutterSize(2),
  medium: getGutterSize(3),
};

export default {
  //  Global width of your site. Used by the grid to determine row width.
  maxWidth: 1200,
  gutterBreakpoint: 'small',
  gutters: {
    margin: gutters,
    padding: gutters,
  },
  columns: 12,
};
