//@flow
import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { Cell, GridX, GridContainer } from '../src/index';

setAddon(JSXAddon);

storiesOf('Grid Container', module).addWithJSX('Width of the available space container', () => (
  <GridContainer>
    <GridX>
      <Cell small={4}>cell</Cell>
      <Cell small={4}>cell</Cell>
      <Cell small={4}>cell</Cell>
    </GridX>
  </GridContainer>
)).addWithJSX('Fluid width container', () => (
  <GridContainer type='fluid'>
    <GridX>
      <Cell small={4}>cell</Cell>
      <Cell small={4}>cell</Cell>
      <Cell small={4}>cell</Cell>
    </GridX>
  </GridContainer>
)).addWithJSX('Full width container', () => (
  <GridContainer type='full'>
    <GridX>
      <Cell small={4}>cell</Cell>
      <Cell small={4}>cell</Cell>
      <Cell small={4}>cell</Cell>
    </GridX>
  </GridContainer>
));
