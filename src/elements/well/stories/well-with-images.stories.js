//@flow
import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { Well } from '../src/index';

setAddon(JSXAddon);

storiesOf('Well Background Images', module).addWithJSX('Well with background images', () => (
  <Well backgroundImages={{
    small: 'https://dummyimage.com/320x200/000/fff',
    medium: 'https://dummyimage.com/600x400/000/fff',
    large: 'https://dummyimage.com/1024x768/000/fff',
    xlarge: 'https://dummyimage.com/1280x800/000/fff',
    xxlarge: 'https://dummyimage.com/1440x900/000/fff',
  }}></Well>
));
