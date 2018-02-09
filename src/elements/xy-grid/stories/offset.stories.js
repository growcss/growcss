//@flow
import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { Cell, GridX } from '../src/index';

setAddon(JSXAddon);

storiesOf('Offset', module).addWithJSX('Add offset of 2 to large cell', () => (
  <GridX gutterType='margin'>
    <Cell small={4} largeOffset={2}>Offset 2 on large</Cell>
    <Cell small={4}>4 cells</Cell>
  </GridX>
));
