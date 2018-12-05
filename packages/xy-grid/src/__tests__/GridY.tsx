import * as React from 'react';
import GridY from '../components/GridY';
import 'jest-styled-components';
import Cell from '../components/Cell';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

test('the style output of GridY', () => {
  const container = <GridY height="500px">
    <Cell>test</Cell>
  </GridY>;
  const tree = renderer.create(container).toJSON();

  expect(shallow(container)).toMatchSnapshot();
  expect(tree).toHaveStyleRule('display', 'flex');
  expect(tree).toHaveStyleRule('height', '500px');
  expect(tree).toHaveStyleRule('flex-flow', 'column wrap');
  expect(tree).toHaveStyleRule('-webkit-box-orient', 'vertical');
  expect(tree).toHaveStyleRule('-webkit-box-direction', 'normal');
});
