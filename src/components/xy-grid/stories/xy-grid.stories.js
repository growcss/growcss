//@flow
import * as React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { Cell, GridX, GridY } from '../src/index';

const CustomGridX = styled(GridX)`
  height: 200px;
  text-align: center;
`;

storiesOf('XY-Grid', module)
  .add('GridX with a full width cell', () => (
    <GridX>
      <Cell>full width cell</Cell>
      <Cell>full width cell</Cell>
    </GridX>
  )).add('GridX with two 6 small cells', () => (
    <GridX>
      <Cell small={6}>6 cells</Cell>
      <Cell small={6}>6 cells</Cell>
    </GridX>
  )).add('GridX with 12/6/4 and 12/6/8 cells', () => (
    <GridX>
      <Cell medium={6} large={4}>12/6/4 cells</Cell>
      <Cell medium={6} large={8}>12/6/8 cells</Cell>
    </GridX>
  )).add('GridY with 6/8/2 and 6/4/10 cells', () => (
    <GridY height='500px'>
      <Cell small={6} medium={8} large={2}>6/8/2 cells</Cell>
      <Cell small={6} medium={8} large={10}>6/4/10 cells</Cell>
    </GridY>
  )).add('GridX gutter type with margin', () => (
    <GridX gutterType='margin'>
      <Cell medium={6} large={4}>12/6/4 cells</Cell>
      <Cell medium={6} large={8}>12/6/8 cells</Cell>
    </GridX>
  )).add('GridX gutter type with padding', () => (
    <GridX gutterType='padding'>
      <Cell medium={6} large={4}>12/6/4 cells</Cell>
      <Cell medium={6} large={8}>12/6/8 cells</Cell>
    </GridX>
  )).add('GridX with offset of 2 to a large cell', () => (
    <GridX gutterType='margin'>
      <Cell small={4} largeOffset={2}>Offset 2 on large</Cell>
      <Cell small={4}>4 cells</Cell>
    </GridX>
  )).add('GridX horizontal default left alignment', () => (
    <GridX gutterType='padding'>
      <Cell small={4}>Aligned to</Cell>
      <Cell small={4}>the left</Cell>
    </GridX>
  )).add('GridX horizontal right alignment', () => (
    <GridX gutterType='padding' alignX='right'>
      <Cell small={4}>Aligned to</Cell>
      <Cell small={4}>the right</Cell>
    </GridX>
  )).add('GridX horizontal center alignment', () => (
    <GridX gutterType='padding' alignX='center'>
      <Cell small={4}>Aligned to</Cell>
      <Cell small={4}>the center</Cell>
    </GridX>
  )).add('GridX horizontal justify alignment', () => (
    <GridX gutterType='padding' alignX='justify'>
      <Cell small={4}>Aligned to</Cell>
      <Cell small={4}>the justify</Cell>
    </GridX>
  )).add('GridX horizontal spaced alignment', () => (
    <GridX gutterType='padding' alignX='spaced'>
      <Cell small={4}>Aligned to</Cell>
      <Cell small={4}>the spaced</Cell>
    </GridX>
  )).add('GridX vertical top alignment', () => (
    <GridX gutterType='padding' alignY='top'>
      <Cell small={4}>I'm at the top (default)</Cell>
      <Cell small={4}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, tempora. Impedit eius officia possimus laudantium? Molestiae eaque, sapiente atque doloremque placeat! In sint, fugiat saepe sunt dolore tempore amet cupiditate.</Cell>
    </GridX>
  )).add('GridX vertical middle alignment', () => (
    <GridX gutterType='padding' alignY='middle'>
      <Cell small={4}>I'm in the middle</Cell>
      <Cell small={4}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, tempora. Impedit eius officia possimus laudantium? Molestiae eaque, sapiente atque doloremque placeat! In sint, fugiat saepe sunt dolore tempore amet cupiditate.</Cell>
    </GridX>
  )).add('GridX vertical bottom alignment', () => (
    <GridX gutterType='padding' alignY='bottom'>
      <Cell small={4}>I'm at the bottom</Cell>
      <Cell small={4}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, tempora. Impedit eius officia possimus laudantium? Molestiae eaque, sapiente atque doloremque placeat! In sint, fugiat saepe sunt dolore tempore amet cupiditate.</Cell>
    </GridX>
  )).add('GridX vertical stretch alignment', () => (
    <GridX gutterType='padding' alignY='stretch'>
      <Cell small={4}>These cells have the same height</Cell>
      <Cell small={4}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, tempora. Impedit eius officia possimus laudantium? Molestiae eaque, sapiente atque doloremque placeat! In sint, fugiat saepe sunt dolore tempore amet cupiditate.</Cell>
    </GridX>
  )).add('GridX central alignment with alignX center and alignY middle', () => (
    <CustomGridX gutterType='padding' alignX='center' alignY='middle'>
      <Cell small={4}>I am in the center-middle</Cell>
      <Cell small={4}>I am also centrally located</Cell>
    </CustomGridX>
  )).add('GridX cell with self align types', () => (
    <GridX gutterType='padding'>
      <Cell small={3} align='bottom'>Align bottom</Cell>
      <Cell small={3} align='middle'>Align middle</Cell>
      <Cell small={3} align='stretch'>Align stretch</Cell>
      <Cell small={3} align='top'>Align top. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non harum laborum cum voluptate vel, eius adipisci similique dignissimos nobis at excepturi incidunt fugit molestiae quaerat, consequuntur porro temporibus. Nisi, ex?</Cell>
    </GridX>
  )).add('GridX cell will take up the remaining space', () => (
    <GridX>
      <Cell small={4}>4 cells</Cell>
      <Cell cellType='auto'>Whatever's left!</Cell>
    </GridX>
  )).add('GridX Multiple expanding cells will share the leftover space equally.', () => (
    <GridX>
      <Cell small={4}>4 cell</Cell>
      <Cell cellType='auto'>Whatever's left!</Cell>
      <Cell cellType='auto'>Whatever's left!</Cell>
    </GridX>
  )).add('GridX Shrink means it will only take up the space its contents need', () => (
    <GridX>
      <Cell cellType='shrink'>Shrink!</Cell>
      <Cell cellType='auto'>Expand!</Cell>
    </GridX>
  )).add('GridX To switch back to the auto behavior from a percentage or shrink behavior', () => (
    <GridX>
      <Cell large='auto'>One</Cell>
      <Cell large='auto'>Two</Cell>
      <Cell large='auto'>Three</Cell>
      <Cell large='auto'>Four</Cell>
      <Cell large='auto'>Five</Cell>
      <Cell large='auto'>Six</Cell>
    </GridX>
  )).add('GridX with gutter type padding and auto/shrink with static widths', () => (
    <GridX gutterType='padding'>
      <Cell cellType='shrink' medium='auto' large={7}>Shrink, medium:auto, large:7</Cell>
      <Cell cellType='auto' medium='shrink' large={5}>Auto, medium:shrink, large:5</Cell>
    </GridX>
  )).add('GridX with gutter type margin and auto/shrink with static widths', () => (
    <GridX gutterType='margin'>
      <Cell cellType='shrink' medium={6} large={12}>Shrink, medium:6, large:12</Cell>
      <Cell cellType='auto' medium={6} large={12}>Auto, medium:6, large:12</Cell>
    </GridX>
  )).add('GridX without paddings/margins and auto/shrink with static widths', () => (
    <GridX gutterType='padding'>
      <Cell medium='auto' large={12}>medium:auto, large:12</Cell>
      <Cell medium='shrink' large={12}>medium:shrink, large:12</Cell>
    </GridX>
  ));
