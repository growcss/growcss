import * as storybook from '@storybook/react';
import * as React from 'react';
import { withOptions } from '@storybook/addon-options';
import { checkA11y } from '@storybook/addon-a11y';
import { storybookGrowCssTheme } from "./theme";
import { withInfo } from "@storybook/addon-info";
import {
  initScreenshot,
  setScreenshotOptions,
  withScreenshot,
} from 'storybook-chrome-screenshot';
import { GrowCss, GlobalStyle } from '../packages/core/theme/src';
import { ThemeProvider } from 'styled-components';


// Option defaults:
storybook.addDecorator(
  withOptions({
    /**
     * name to display in the top left corner
     * @type {String}
     */
    name: 'GrowCss',

    /**
     * URL for name in top left corner to link to
     * @type {String}
     */
    url: '#',

    /**
     * show story component as full screen
     * @type {Boolean}
     */
    goFullScreen: false,

    /**
     * display panel that shows a list of stories
     * @type {Boolean}
     */
    showStoriesPanel: true,

    /**
     * display panel that shows addon configurations
     * @type {Boolean}
     */
    showAddonPanel: true,

    /**
     * display floating search box to search through stories
     * @type {Boolean}
     */
    showSearchBox: false,

    /**
     * show addon panel as a vertical panel on the right
     * @type {Boolean}
     */
    addonPanelInRight: true,

    /**
     * sorts stories
     * @type {Boolean}
     */
    sortStoriesByKind: false,

    /**
     * regex for finding the hierarchy separator
     * @example:
     *   null - turn off hierarchy
     *   /\// - split by `/`
     *   /\./ - split by `.`
     *   /\/|\./ - split by `/` or `.`
     * @type {RegExp}
     */
    hierarchySeparator: /\./,

    /**
     * regex for finding the hierarchy root separator
     * @example:
     *   null - turn off mulitple hierarchy roots
     *   /\|/ - split by `|`
     * @type {RegExp}
     */
    hierarchyRootSeparator: /\|/, //,

    /**
     * sidebar tree animations
     * @type {Boolean}
     */
    sidebarAnimations: true,

    /**
     * id to select an addon panel
     * @type {String}
     */
    selectedAddonPanel: undefined, // The order of addons in the "Addon panel" is the same as you import them in 'addons.js'. The first panel will be opened by default as you run Storybook

    /**
     * @type {object}
     */
    theme: storybookGrowCssTheme,
  })
);

setScreenshotOptions({
  viewport: [
    // small
    {
      width: 300,
      height: 420,
      isMobile: true,
      hasTouch: true,
    },
    // medium
    {
      width: 768,
      height: 800,
      isMobile: true,
      hasTouch: true,
    },
    // large
    {
      width: 1024,
      height: 768,
    },
    // xlarge
    {
      width: 1200,
      height: 800,
    },
    // xxlarge
    {
      width: 1440,
      height: 900,
    },
  ],
});

storybook.addDecorator(initScreenshot());
storybook.addDecorator(withScreenshot());

storybook.addDecorator(checkA11y);
storybook.addDecorator(withInfo({
  inline: true,
  source: false
}));

function withGlobalStyle(storyFn) {
  return (
    <ThemeProvider theme={GrowCss}>
      <React.Fragment>
        <GlobalStyle/>
        {storyFn()}
      </React.Fragment>
    </ThemeProvider>
  );
}

storybook.addDecorator(withGlobalStyle);

// automatically import all files ending with *.stories.js
const req = require.context('..', true, /packages\/((?!node_modules).)*__stories__\/[^\/]+\.(js|tsx)+$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

storybook.configure(loadStories, module);
