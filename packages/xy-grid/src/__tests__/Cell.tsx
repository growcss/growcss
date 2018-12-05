import * as React from 'react';
import Cell from '../components/Cell';
import 'jest-styled-components';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

test('cell base layout', () => {
  const container = <Cell>test</Cell>;
  const tree = renderer.create(container).toJSON();

  expect(shallow(container)).toMatchSnapshot();
  expect(tree).toHaveStyleRule('flex', '0 0 auto');
  expect(tree).toHaveStyleRule('width', '100%');
  expect(tree).toHaveStyleRule('min-height', '0px');
  expect(tree).toHaveStyleRule('min-width', '0px');
});

test('cell auto layout with padding gutter', () => {
  const container = <Cell cellType="auto" gutterType="padding">
    test
  </Cell>;
  const tree = renderer.create(container).toJSON();

  expect(shallow(container)).toMatchSnapshot();
  expect(tree).toHaveStyleRule('flex', '1 1 0px');
  expect(tree).toHaveStyleRule('width', 'auto');
  expect(tree).toHaveStyleRule('min-height', '0px');
  expect(tree).toHaveStyleRule('min-width', '0px');
  expect(tree).toHaveStyleRule('box-sizing', 'border-box');
});

test('cell auto layout with margin gutter', () => {
  const container = <Cell cellType="auto" gutterType="margin">
    test
  </Cell>;
  const tree = renderer.create(container).toJSON();

  expect(shallow(container)).toMatchSnapshot();
  expect(tree).toHaveStyleRule('flex', '1 1 0px');
  expect(tree).toHaveStyleRule('width', 'auto');
  expect(tree).toHaveStyleRule('min-height', '0px');
  expect(tree).toHaveStyleRule('min-width', '0px');
});

test('cell shrink layout', () => {
  const container = <Cell cellType="shrink">test</Cell>;
  const tree = renderer.create(container).toJSON();

  expect(shallow(container)).toMatchSnapshot();
  expect(tree).toHaveStyleRule('flex', '0 0 auto');
  expect(tree).toHaveStyleRule('width', 'auto');
  expect(tree).toHaveStyleRule('min-height', '0px');
  expect(tree).toHaveStyleRule('min-width', '0px');
});

test('cell with 6 small layout', () => {
  const container = <Cell small={6}>test</Cell>;
  const tree = renderer.create(container).toJSON();

  expect(shallow(container)).toMatchSnapshot();
  expect(tree).toHaveStyleRule('flex', '0 0 auto');
  expect(tree).toHaveStyleRule('min-height', '0px');
  expect(tree).toHaveStyleRule('min-width', '0px');
  expect(tree).toHaveStyleRule('width', '50%');
  expect(tree).toHaveStyleRule('flex-basis', 'auto');
});

test('cell align', () => {
  const container = <Cell align="top">test</Cell>;
  const tree = renderer.create(container).toJSON();

  expect(shallow(container)).toMatchSnapshot();
  expect(tree).toHaveStyleRule('flex', '0 0 auto');
  expect(tree).toHaveStyleRule('width', '100%');
  expect(tree).toHaveStyleRule('min-height', '0px');
  expect(tree).toHaveStyleRule('min-width', '0px');
  expect(tree).toHaveStyleRule('align-self', 'flex-start');
});

test('cell offset', () => {
  const container = <Cell smallOffset={1}>test</Cell>;
  const tree = renderer.create(container).toJSON();

  expect(shallow(container)).toMatchSnapshot();
  expect(tree).toHaveStyleRule('flex', '0 0 auto');
  expect(tree).toHaveStyleRule('width', '100%');
  expect(tree).toHaveStyleRule('min-height', '0px');
  expect(tree).toHaveStyleRule('min-width', '0px');
  expect(tree).toHaveStyleRule('margin-left', '8.333333333333334%');
});
