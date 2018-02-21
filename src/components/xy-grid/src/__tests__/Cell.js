//@flow
import * as React from 'react';
import Cell from '../components/Cell';
import 'jest-styled-components';

test('cell base layout', () => {
  const wrapper = shallow(<Cell>test</Cell>);

  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toHaveStyleRule('flex', '0 0 auto');
  expect(wrapper).toHaveStyleRule('width', '100%');
  expect(wrapper).toHaveStyleRule('min-height', '0px');
  expect(wrapper).toHaveStyleRule('min-width', '0px');
});

test('cell auto layout with padding gutter', () => {
  const wrapper = shallow(
    <Cell cellType="auto" gutterType="padding">
      test
    </Cell>,
  );

  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toHaveStyleRule('flex', '1 1 0px');
  expect(wrapper).toHaveStyleRule('width', 'auto');
  expect(wrapper).toHaveStyleRule('min-height', '0px');
  expect(wrapper).toHaveStyleRule('min-width', '0px');
  expect(wrapper).toHaveStyleRule('box-sizing', 'border-box');
});

test('cell auto layout with margin gutter', () => {
  const wrapper = shallow(
    <Cell cellType="auto" gutterType="margin">
      test
    </Cell>,
  );

  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toHaveStyleRule('flex', '1 1 0px');
  expect(wrapper).toHaveStyleRule('width', 'auto');
  expect(wrapper).toHaveStyleRule('min-height', '0px');
  expect(wrapper).toHaveStyleRule('min-width', '0px');
});

test('cell shrink layout', () => {
  const wrapper = shallow(<Cell cellType="shrink">test</Cell>);

  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toHaveStyleRule('flex', '0 0 auto');
  expect(wrapper).toHaveStyleRule('width', 'auto');
  expect(wrapper).toHaveStyleRule('min-height', '0px');
  expect(wrapper).toHaveStyleRule('min-width', '0px');
});

test('cell with 6 small layout', () => {
  const wrapper = shallow(<Cell small={6}>test</Cell>);

  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toHaveStyleRule('flex', '0 0 auto');
  expect(wrapper).toHaveStyleRule('min-height', '0px');
  expect(wrapper).toHaveStyleRule('min-width', '0px');
  expect(wrapper).toHaveStyleRule('width', '50%');
  expect(wrapper).toHaveStyleRule('flex-basis', 'auto');
});

test('cell align', () => {
  const wrapper = shallow(<Cell align="top">test</Cell>);

  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toHaveStyleRule('flex', '0 0 auto');
  expect(wrapper).toHaveStyleRule('width', '100%');
  expect(wrapper).toHaveStyleRule('min-height', '0px');
  expect(wrapper).toHaveStyleRule('min-width', '0px');
  expect(wrapper).toHaveStyleRule('align-self', 'flex-start');
});

test('cell offset', () => {
  const wrapper = shallow(<Cell smallOffset={1}>test</Cell>);

  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toHaveStyleRule('flex', '0 0 auto');
  expect(wrapper).toHaveStyleRule('width', '100%');
  expect(wrapper).toHaveStyleRule('min-height', '0px');
  expect(wrapper).toHaveStyleRule('min-width', '0px');
  expect(wrapper).toHaveStyleRule('margin-left', '8.333333333333334%');
});
