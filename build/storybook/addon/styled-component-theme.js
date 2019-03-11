import * as React from 'react';

import { GrowCss, GlobalStyle } from '../../../core/theme/dist/index.umd';
import { ThemeProvider } from 'styled-components';

export default function (storyFn) {
  return (
    <ThemeProvider theme={GrowCss}>{storyFn()}</ThemeProvider>
  );
}

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
