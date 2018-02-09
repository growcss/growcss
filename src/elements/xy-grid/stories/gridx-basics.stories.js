//@flow
import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { Cell, GridX } from '../src/index';

setAddon(JSXAddon);

storiesOf('GridX Basics', module).addWithJSX('Full width cell', () => (
  <GridX>
    <Cell>full width cell</Cell>
    <Cell>full width cell</Cell>
  </GridX>
)).addWithJSX('6 cells', () => (
  <GridX>
    <Cell small={6}>6 cells</Cell>
    <Cell small={6}>6 cells</Cell>
  </GridX>
)).addWithJSX('12/6/4 and 12/6/8 cells', () => (
  <GridX>
    <Cell medium={6} large={4}>12/6/4 cells</Cell>
    <Cell medium={6} large={8}>12/6/8 cells</Cell>
  </GridX>
));
