//@flow
import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { Cell, GridY } from '../src/index';

setAddon(JSXAddon);

storiesOf('GridY Basic', module).addWithJSX('Margin gutter', () => (
  <GridY height='500px'>
    <Cell small={6} medium={8} large={2}>6/8/2 cells</Cell>
    <Cell small={6} medium={8} large={10}>6/4/10 cells</Cell>
  </GridY>
));
