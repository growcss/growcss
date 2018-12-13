import * as React from 'react';
import 'jest-styled-components';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import GridContainer from '../src/components/grid-container';

test('if the container is centered and have a max-width of 75rem', () => {
  const container = <GridContainer>test</GridContainer>;
  const tree = renderer.create(container).toJSON();

  expect(shallow(container)).toMatchSnapshot();
  expect(tree).toHaveStyleRule('max-width', '75rem');
  expect(tree).toHaveStyleRule('margin', '0 auto');
});

test('if the container is centered and has a max-width of 100%', () => {
  const container = <GridContainer type="fluid">test</GridContainer>;
  const tree = renderer.create(container).toJSON();

  expect(shallow(container)).toMatchSnapshot();
  expect(tree).toHaveStyleRule('max-width', '100%');
  expect(tree).toHaveStyleRule('margin', '0 auto');
});

test('if the container content is of the full width of the available space', () => {
  const container = <GridContainer type="full">test</GridContainer>;
  const tree = renderer.create(container).toJSON();

  expect(shallow(container)).toMatchSnapshot();
  expect(tree).toHaveStyleRule('max-width', '100%');
  expect(tree).toHaveStyleRule('overflow-x', 'hidden');
});
