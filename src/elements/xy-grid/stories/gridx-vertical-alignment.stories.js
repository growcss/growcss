//@flow
import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { Cell, GridX } from '../src/index';

setAddon(JSXAddon);

storiesOf('GridX Vertical Alignment', module).addWithJSX('aligny top', () => (
  <GridX gutterType='padding' alignY='top'>
    <Cell small={4}>I'm at the top (default)</Cell>
    <Cell small={4}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, tempora. Impedit eius officia possimus laudantium? Molestiae eaque, sapiente atque doloremque placeat! In sint, fugiat saepe sunt dolore tempore amet cupiditate.</Cell>
  </GridX>
)).addWithJSX('alignY middle', () => (
  <GridX gutterType='padding' alignY='middle'>
    <Cell small={4}>I'm in the middle</Cell>
    <Cell small={4}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, tempora. Impedit eius officia possimus laudantium? Molestiae eaque, sapiente atque doloremque placeat! In sint, fugiat saepe sunt dolore tempore amet cupiditate.</Cell>
  </GridX>
)).addWithJSX('alignY bottom', () => (
  <GridX gutterType='padding' alignY='bottom'>
    <Cell small={4}>I'm at the bottom</Cell>
    <Cell small={4}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, tempora. Impedit eius officia possimus laudantium? Molestiae eaque, sapiente atque doloremque placeat! In sint, fugiat saepe sunt dolore tempore amet cupiditate.</Cell>
  </GridX>
)).addWithJSX('alignY stretch', () => (
  <GridX gutterType='padding' alignY='stretch'>
    <Cell small={4}>These cells have the same height</Cell>
    <Cell small={4}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, tempora. Impedit eius officia possimus laudantium? Molestiae eaque, sapiente atque doloremque placeat! In sint, fugiat saepe sunt dolore tempore amet cupiditate.</Cell>
  </GridX>
));
