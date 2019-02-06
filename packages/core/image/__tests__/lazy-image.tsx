import * as React from 'react';
import 'jest-styled-components';
import { shallow } from 'enzyme';
import { axe, toHaveNoViolations } from 'jest-axe';
import LazyImage from '../src/components/lazy-image';

expect.extend(toHaveNoViolations);

const sinon = require('sinon');

test('Image load small image if no preview image is set', () => {
  sinon.spy(LazyImage.prototype, 'componentDidMount');

  const wrapper = shallow(
    <LazyImage src="https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/400x/mountain.jpg" />,
  );

  expect(wrapper).toMatchSnapshot();

  const preview = wrapper.find('.gc-image .preview').html();

  expect(preview).toContain('img class="preview');
  expect(preview).toContain(
    'src="https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/400x/mountain.jpg"',
  );
  expect(preview).toContain('crossOrigin="anonymous"');
});

test('Image a11y support', async () => {
  const wrapper = shallow(
    <LazyImage
      srcSet="https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/400x/mountain.jpg"
      alt="test image"
    />,
  );

  expect(await axe(wrapper.html())).toHaveNoViolations();
});
