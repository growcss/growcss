//@flow
import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { Cell, GridX } from '../src/index';

setAddon(JSXAddon);

storiesOf('GridX Horizontal Alignment', module).addWithJSX('alignX left', () => (
  <GridX gutterType='padding'>
    <Cell small={4}>Aligned to</Cell>
    <Cell small={4}>the left</Cell>
  </GridX>
)).addWithJSX('alignX right', () => (
  <GridX gutterType='padding' alignX='right'>
    <Cell small={4}>Aligned to</Cell>
    <Cell small={4}>the right</Cell>
  </GridX>
)).addWithJSX('alignX center', () => (
  <GridX gutterType='padding' alignX='center'>
    <Cell small={4}>Aligned to</Cell>
    <Cell small={4}>the center</Cell>
  </GridX>
)).addWithJSX('alignX justify', () => (
  <GridX gutterType='padding' alignX='justify'>
    <Cell small={4}>Aligned to</Cell>
    <Cell small={4}>the justify</Cell>
  </GridX>
)).addWithJSX('alignX spaced', () => (
  <GridX gutterType='padding' alignX='spaced'>
    <Cell small={4}>Aligned to</Cell>
    <Cell small={4}>the spaced</Cell>
  </GridX>
));
