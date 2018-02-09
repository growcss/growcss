//@flow
import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { Cell, GridX } from '../src/index';

setAddon(JSXAddon);

storiesOf('GridX Gutters', module).addWithJSX('Margin gutter', () => (
  <GridX gutterType='margin'>
    <Cell medium={6} large={4}>12/6/4 cells</Cell>
    <Cell medium={6} large={8}>12/6/8 cells</Cell>
  </GridX>
)).addWithJSX('Padding gutter', () => (
  <GridX gutterType='padding'>
    <Cell medium={6} large={4}>12/6/4 cells</Cell>
    <Cell medium={6} large={8}>12/6/8 cells</Cell>
  </GridX>
));
