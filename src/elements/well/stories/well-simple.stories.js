//@flow
import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { Well } from '../src/index';

setAddon(JSXAddon);

storiesOf('Well Simple', module).addWithJSX('Default well element with text', () => (
  <Well>test</Well>
));
