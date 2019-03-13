import * as React from 'react';
import { mount } from 'enzyme';
//import renderer from 'react-test-renderer';
import { GridX } from '../src/components/grid-x';
import { Cell } from '../src/components/cell';

test('the style output of GridX', () => {
  const grid = (
    <GridX>
      <Cell>test</Cell>
    </GridX>
  );
  // const tree = renderer.create(grid).toJSON();

  expect(mount(grid)).toMatchSnapshot();
  // @todo waiting for enzyme fix
  // expect(tree).toHaveStyleRule('display', 'flex');
  // expect(tree).toHaveStyleRule('flex-flow', 'row wrap');
  // expect(tree).toHaveStyleRule('-webkit-box-orient', 'horizontal');
  // expect(tree).toHaveStyleRule('-webkit-box-direction', 'normal');
  // expect(tree).toHaveStyleRule('justify-content', 'flex-start');
});

test('the style output of GridX with alignment to right', () => {
  const grid = (
    <GridX gutterType="padding" alignX="right">
      <Cell>test</Cell>
    </GridX>
  );
  // const tree = renderer.create(grid).toJSON();

  expect(mount(grid)).toMatchSnapshot();
  // expect(tree).toHaveStyleRule('display', 'flex');
  // expect(tree).toHaveStyleRule('flex-flow', 'row wrap');
  // expect(tree).toHaveStyleRule('-webkit-box-orient', 'horizontal');
  // expect(tree).toHaveStyleRule('-webkit-box-direction', 'normal');
  // expect(tree).toHaveStyleRule('justify-content', 'flex-end');
});

test('the style output of GridX with alignment to center', () => {
  const grid = (
    <GridX gutterType="padding" alignX="center">
      <Cell>test</Cell>
    </GridX>
  );
  // const tree = renderer.create(grid).toJSON();

  expect(mount(grid)).toMatchSnapshot();
  // expect(tree).toHaveStyleRule('display', 'flex');
  // expect(tree).toHaveStyleRule('flex-flow', 'row wrap');
  // expect(tree).toHaveStyleRule('-webkit-box-orient', 'horizontal');
  // expect(tree).toHaveStyleRule('-webkit-box-direction', 'normal');
  // expect(tree).toHaveStyleRule('justify-content', 'center');
});

test('the style output of GridX with alignment to justify', () => {
  const grid = (
    <GridX gutterType="padding" alignX="justify">
      <Cell>test</Cell>
    </GridX>
  );
  // const tree = renderer.create(grid).toJSON();

  expect(mount(grid)).toMatchSnapshot();
  // expect(tree).toHaveStyleRule('display', 'flex');
  // expect(tree).toHaveStyleRule('flex-flow', 'row wrap');
  // expect(tree).toHaveStyleRule('-webkit-box-orient', 'horizontal');
  // expect(tree).toHaveStyleRule('-webkit-box-direction', 'normal');
  // expect(tree).toHaveStyleRule('justify-content', 'space-between');
});

test('the style output of GridX with alignment to spaced', () => {
  const grid = (
    <GridX gutterType="padding" alignX="spaced">
      <Cell>test</Cell>
    </GridX>
  );
  // const tree = renderer.create(grid).toJSON();

  expect(mount(grid)).toMatchSnapshot();
  // expect(tree).toHaveStyleRule('display', 'flex');
  // expect(tree).toHaveStyleRule('flex-flow', 'row wrap');
  // expect(tree).toHaveStyleRule('-webkit-box-orient', 'horizontal');
  // expect(tree).toHaveStyleRule('-webkit-box-direction', 'normal');
  // expect(tree).toHaveStyleRule('justify-content', 'space-around');
});

test('the style output of GridX with alignment to top', () => {
  const grid = (
    <GridX gutterType="padding" alignY="top">
      <Cell>test</Cell>
    </GridX>
  );
  // const tree = renderer.create(grid).toJSON();

  expect(mount(grid)).toMatchSnapshot();
  // expect(tree).toHaveStyleRule('display', 'flex');
  // expect(tree).toHaveStyleRule('flex-flow', 'row wrap');
  // expect(tree).toHaveStyleRule('-webkit-box-orient', 'horizontal');
  // expect(tree).toHaveStyleRule('-webkit-box-direction', 'normal');
  // expect(tree).toHaveStyleRule('align-items', 'flex-start');
});

test('the style output of GridX with alignment to middle', () => {
  const grid = (
    <GridX gutterType="padding" alignY="middle">
      <Cell>test</Cell>
    </GridX>
  );
  // const tree = renderer.create(grid).toJSON();

  expect(mount(grid)).toMatchSnapshot();
  // expect(tree).toHaveStyleRule('display', 'flex');
  // expect(tree).toHaveStyleRule('flex-flow', 'row wrap');
  // expect(tree).toHaveStyleRule('-webkit-box-orient', 'horizontal');
  // expect(tree).toHaveStyleRule('-webkit-box-direction', 'normal');
  // expect(tree).toHaveStyleRule('align-items', 'center');
});

test('the style output of GridX with alignment to bottom', () => {
  const grid = (
    <GridX gutterType="padding" alignY="bottom">
      <Cell>test</Cell>
    </GridX>
  );
  // const tree = renderer.create(grid).toJSON();

  expect(mount(grid)).toMatchSnapshot();
  // expect(tree).toHaveStyleRule('display', 'flex');
  // expect(tree).toHaveStyleRule('flex-flow', 'row wrap');
  // expect(tree).toHaveStyleRule('-webkit-box-orient', 'horizontal');
  // expect(tree).toHaveStyleRule('-webkit-box-direction', 'normal');
  // expect(tree).toHaveStyleRule('align-items', 'flex-end');
});

test('the style output of GridX with alignment to stretch', () => {
  const grid = (
    <GridX gutterType="padding" alignY="stretch">
      <Cell>test</Cell>
    </GridX>
  );
  // const tree = renderer.create(grid).toJSON();

  expect(mount(grid)).toMatchSnapshot();
  // expect(tree).toHaveStyleRule('display', 'flex');
  // expect(tree).toHaveStyleRule('flex-flow', 'row wrap');
  // expect(tree).toHaveStyleRule('-webkit-box-orient', 'horizontal');
  // expect(tree).toHaveStyleRule('-webkit-box-direction', 'normal');
  // expect(tree).toHaveStyleRule('align-items', 'stretch');
});
