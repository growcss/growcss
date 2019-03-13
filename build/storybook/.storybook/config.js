import * as storybook from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withInfo } from "@storybook/addon-info";
import withGlobalStyle from './../addon/styled-component-theme';

storybook.addDecorator(withGlobalStyle);
storybook.addDecorator(withInfo);
storybook.addDecorator(withA11y);

storybook.addParameters({
  options: {
    brandTitle: 'GrowCss',
    brandUrl: '#',
    panelPosition: 'right',
  },
  info: {
    inline: true,
    source: false,
    header: false
  }
});

const image = require.context('./../../../core/image/__stories__', true);
const spinner = require.context('./../../../core/spinner/__stories__', true);
const theme = require.context('./../../../core/theme/__stories__', true);
const xy = require.context('./../../../core/xy-grid/__stories__', true);


function loadStories() {
  image.keys().forEach(filename => image(filename));
  spinner.keys().forEach(filename => spinner(filename));
  theme.keys().forEach(filename => theme(filename));
  xy.keys().forEach(filename => xy(filename));
}

storybook.configure(loadStories, module);
