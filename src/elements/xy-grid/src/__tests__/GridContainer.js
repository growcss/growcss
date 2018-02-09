//@flow
import React from 'react';
import GridContainer from '../components/GridContainer';
import 'jest-styled-components'

test('if the container is centered and have a max-width of 75rem', () => {
  const wrapper = shallow(<GridContainer>test</GridContainer>);

  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toHaveStyleRule('max-width', '75rem');
  expect(wrapper).toHaveStyleRule('margin', '0 auto');
});

test('if the container is centered and has a max-width of 100%', () => {
  const wrapper = shallow(<GridContainer type='fluid'>test</GridContainer>);

  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toHaveStyleRule('max-width', '100%');
  expect(wrapper).toHaveStyleRule('margin', '0 auto');
});

test('if the container content is of the full width of the available space', () => {
  const wrapper = shallow(<GridContainer type='full'>test</GridContainer>);

  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toHaveStyleRule('max-width', '100%');
  expect(wrapper).toHaveStyleRule('overflow-x', 'hidden');
});
