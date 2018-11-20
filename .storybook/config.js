import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { checkA11y } from '@storybook/addon-a11y';

// Option defaults:
withOptions({
  /**
   * name to display in the top left corner
   * @type {String}
   */
  name: 'growcss',

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
  showAddonPanel: false,

  /**
   * display floating search box to search through stories
   * @type {Boolean}
   */
  showSearchBox: false,

  /**
   * show addon panel as a vertical panel on the right
   * @type {Boolean}
   */
  addonPanelInRight: false,

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
   * @type {Regex}
   */
  hierarchySeparator: null,

  /**
   * regex for finding the hierarchy root separator
   * @example:
   *   null - turn off mulitple hierarchy roots
   *   /\|/ - split by `|`
   * @type {Regex}
   */
  hierarchyRootSeparator: null,

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
});

// automatically import all files ending with *.stories.js
const stories = require.context('../packages', true, /.stories.tsx$/);

addDecorator(checkA11y);

function loadStories() {
  stories.keys().forEach(filename => stories(filename));
}

configure(loadStories, module);
