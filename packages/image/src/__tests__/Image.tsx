import * as React from 'react';
import 'jest-styled-components';
import LazyImage from '../components/LazyImage';
import { shallow } from 'enzyme';
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations);

const sinon = require('sinon');

test('Image load small image if no preview image is set', () => {
  sinon.spy(LazyImage.prototype, 'componentDidMount');

  const wrapper = shallow(
    <LazyImage
      backgroundImages={{
        small:
          'https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/400x/mountain.jpg',
      }}
    />,
  );

  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('.gc-image .preview').html()).toEqual(
    '<img class="preview PreviewElement-sc-1t6xf7x-0 HqctH" src="https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/400x/mountain.jpg" crossOrigin="anonymous"/>',
  );
});

test('Image a11y support', async () => {
  const wrapper = shallow(
    <LazyImage
      backgroundImages={{
        small:
          'https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/400x/mountain.jpg',
      }}
      alt="test image"
    />,
  );

  expect(await axe(wrapper.html())).toHaveNoViolations();
});