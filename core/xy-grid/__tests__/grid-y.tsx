import * as React from 'react';
import { mount } from 'enzyme';
//import renderer from 'react-test-renderer';
import { GridY } from '../src/components/grid-y';
import { Cell } from '../src/components/cell';

test('the style output of GridY', () => {
  const container = (
    <GridY height="500px">
      <Cell>test</Cell>
    </GridY>
  );
  // const tree = renderer.create(container).toJSON();

  expect(mount(container)).toMatchSnapshot();
  // @todo waiting for enzyme fix
  //expect(tree).toHaveStyleRule('display', 'flex');
  //expect(tree).toHaveStyleRule('height', '500px');
  //expect(tree).toHaveStyleRule('flex-flow', 'column wrap');
  //expect(tree).toHaveStyleRule('-webkit-box-orient', 'vertical');
  //expect(tree).toHaveStyleRule('-webkit-box-direction', 'normal');
});
