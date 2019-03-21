import colors from '../css/colors';
import { typography } from '../css/typography';

export default {
  typography: {
    color: colors.black,
    transform: 'uppercase',
    weight: typography.weightBold,
    size: typography.fontSize,
  },
  highlight: {
    width: 1,
    color: colors.white,
  },
  shadow: {
    width: 1,
    color: colors.gray[300],
  },
  breakpoint: 'small down',
  margin: '1rem 0rem',
  vertical: {
    margin: 16,
  },
  horizontal: {
    margin: 16,
  },
};
