import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Cell, GridX, GridContainer } from '../src';

storiesOf('Grid Container', module)
  .add('Width of the available space container', () => (
    <GridContainer>
      <GridX>
        <Cell small={4}>cell</Cell>
        <Cell small={4}>cell</Cell>
        <Cell small={4}>cell</Cell>
      </GridX>
    </GridContainer>
  ))
  .add('Fluid width container', () => (
    <GridContainer type="fluid">
      <GridX>
        <Cell small={4}>cell</Cell>
        <Cell small={4}>cell</Cell>
        <Cell small={4}>cell</Cell>
      </GridX>
    </GridContainer>
  ))
  .add('Full width container', () => (
    <GridContainer type="full">
      <GridX>
        <Cell small={4}>cell</Cell>
        <Cell small={4}>cell</Cell>
        <Cell small={4}>cell</Cell>
      </GridX>
    </GridContainer>
  ));
