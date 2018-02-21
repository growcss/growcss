//@flow
import * as React from 'react';
import GridX from '../components/GridX';
import Cell from '../components/Cell';
import 'jest-styled-components';

test('the style output of GridX', () => {
  const wrapper = shallow(
    <GridX>
      <Cell>test</Cell>
    </GridX>,
  );

  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toHaveStyleRule('display', 'flex');
  expect(wrapper).toHaveStyleRule('flex-flow', 'row wrap');
  expect(wrapper).toHaveStyleRule('-webkit-box-orient', 'horizontal');
  expect(wrapper).toHaveStyleRule('-webkit-box-direction', 'normal');
  expect(wrapper).toHaveStyleRule('justify-content', 'flex-start');
});

test('the style output of GridX with alignment to right', () => {
  const wrapper = shallow(
    <GridX gutterType="padding" alignX="right">
      <Cell>test</Cell>
    </GridX>,
  );

  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toHaveStyleRule('display', 'flex');
  expect(wrapper).toHaveStyleRule('flex-flow', 'row wrap');
  expect(wrapper).toHaveStyleRule('-webkit-box-orient', 'horizontal');
  expect(wrapper).toHaveStyleRule('-webkit-box-direction', 'normal');
  expect(wrapper).toHaveStyleRule('justify-content', 'flex-end');
});

test('the style output of GridX with alignment to center', () => {
  const wrapper = shallow(
    <GridX gutterType="padding" alignX="center">
      <Cell>test</Cell>
    </GridX>,
  );

  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toHaveStyleRule('display', 'flex');
  expect(wrapper).toHaveStyleRule('flex-flow', 'row wrap');
  expect(wrapper).toHaveStyleRule('-webkit-box-orient', 'horizontal');
  expect(wrapper).toHaveStyleRule('-webkit-box-direction', 'normal');
  expect(wrapper).toHaveStyleRule('justify-content', 'center');
});

test('the style output of GridX with alignment to justify', () => {
  const wrapper = shallow(
    <GridX gutterType="padding" alignX="justify">
      <Cell>test</Cell>
    </GridX>,
  );

  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toHaveStyleRule('display', 'flex');
  expect(wrapper).toHaveStyleRule('flex-flow', 'row wrap');
  expect(wrapper).toHaveStyleRule('-webkit-box-orient', 'horizontal');
  expect(wrapper).toHaveStyleRule('-webkit-box-direction', 'normal');
  expect(wrapper).toHaveStyleRule('justify-content', 'space-between');
});

test('the style output of GridX with alignment to spaced', () => {
  const wrapper = shallow(
    <GridX gutterType="padding" alignX="spaced">
      <Cell>test</Cell>
    </GridX>,
  );

  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toHaveStyleRule('display', 'flex');
  expect(wrapper).toHaveStyleRule('flex-flow', 'row wrap');
  expect(wrapper).toHaveStyleRule('-webkit-box-orient', 'horizontal');
  expect(wrapper).toHaveStyleRule('-webkit-box-direction', 'normal');
  expect(wrapper).toHaveStyleRule('justify-content', 'space-around');
});

test('the style output of GridX with alignment to top', () => {
  const wrapper = shallow(
    <GridX gutterType="padding" alignY="top">
      <Cell>test</Cell>
    </GridX>,
  );

  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toHaveStyleRule('display', 'flex');
  expect(wrapper).toHaveStyleRule('flex-flow', 'row wrap');
  expect(wrapper).toHaveStyleRule('-webkit-box-orient', 'horizontal');
  expect(wrapper).toHaveStyleRule('-webkit-box-direction', 'normal');
  expect(wrapper).toHaveStyleRule('align-items', 'flex-start');
});

test('the style output of GridX with alignment to middle', () => {
  const wrapper = shallow(
    <GridX gutterType="padding" alignY="middle">
      <Cell>test</Cell>
    </GridX>,
  );

  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toHaveStyleRule('display', 'flex');
  expect(wrapper).toHaveStyleRule('flex-flow', 'row wrap');
  expect(wrapper).toHaveStyleRule('-webkit-box-orient', 'horizontal');
  expect(wrapper).toHaveStyleRule('-webkit-box-direction', 'normal');
  expect(wrapper).toHaveStyleRule('align-items', 'center');
});

test('the style output of GridX with alignment to bottom', () => {
  const wrapper = shallow(
    <GridX gutterType="padding" alignY="bottom">
      <Cell>test</Cell>
    </GridX>,
  );

  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toHaveStyleRule('display', 'flex');
  expect(wrapper).toHaveStyleRule('flex-flow', 'row wrap');
  expect(wrapper).toHaveStyleRule('-webkit-box-orient', 'horizontal');
  expect(wrapper).toHaveStyleRule('-webkit-box-direction', 'normal');
  expect(wrapper).toHaveStyleRule('align-items', 'flex-end');
});

test('the style output of GridX with alignment to stretch', () => {
  const wrapper = shallow(
    <GridX gutterType="padding" alignY="stretch">
      <Cell>test</Cell>
    </GridX>,
  );

  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toHaveStyleRule('display', 'flex');
  expect(wrapper).toHaveStyleRule('flex-flow', 'row wrap');
  expect(wrapper).toHaveStyleRule('-webkit-box-orient', 'horizontal');
  expect(wrapper).toHaveStyleRule('-webkit-box-direction', 'normal');
  expect(wrapper).toHaveStyleRule('align-items', 'stretch');
});
