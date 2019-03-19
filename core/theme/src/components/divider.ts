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
    width: '1px',
    color: colors.white,
  },
  shadow: {
    width: '1px',
    color: colors.gray[300],
  },
  breakpoint: 'small down',
  margin: '1rem 0rem',
  section: {
    margin: '2rem',
  },
  vertical: {
    margin: '1rem',
  },
  horizontal: {
    margin: '1em',
  },
};
