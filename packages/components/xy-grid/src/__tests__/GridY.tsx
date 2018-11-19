import * as React from 'react';
import GridY from '../components/GridY';
import 'jest-styled-components';
import Cell from '../components/Cell';
import { shallow } from 'enzyme';

test('the style output of GridY', () => {
  const wrapper = shallow(
    <GridY height="500px">
      <Cell>test</Cell>
    </GridY>,
  );

  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toHaveStyleRule('display', 'flex');
  expect(wrapper).toHaveStyleRule('height', '500px');
  expect(wrapper).toHaveStyleRule('flex-flow', 'column wrap');
  expect(wrapper).toHaveStyleRule('-webkit-box-orient', 'vertical');
  expect(wrapper).toHaveStyleRule('-webkit-box-direction', 'normal');
});
