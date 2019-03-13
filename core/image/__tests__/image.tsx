import * as React from 'react';
import { mount } from 'enzyme';
import { axe, toHaveNoViolations } from 'jest-axe';
import { GrowCss } from '@growcss/theme';
import { StyledImage as Image } from '../src/components/image';

window.IntersectionObserver.prototype.USE_MUTATION_OBSERVER = false;

expect.extend(toHaveNoViolations);

test('Image load small image if no placeholder image is set', () => {
  const wrapper = mount(
    <Image
      srcSet="https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/400x/mountain.jpg medium"
      preload
      theme={GrowCss}
    />,
  );

  expect(wrapper).toMatchSnapshot();

  const placeholder = wrapper.find('.gc-image img.placeholder').html();

  expect(placeholder).toContain('img class="placeholder');
  expect(placeholder).toContain(
    'src="https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/400x/mountain.jpg"',
  );
  expect(placeholder).toContain('crossorigin="anonymous"');
});

test('Image a11y support', async () => {
  const wrapper = mount(
    <Image
      srcSet="https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/400x/mountain.jpg"
      alt="test image"
      theme={GrowCss}
    />,
  );

  expect(await axe(wrapper.html())).toHaveNoViolations();
});

test(`should have correct src, title and alt attributes`, () => {
  const wrapper = mount(
    <Image
      srcSet="https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/400x/mountain.jpg medium, https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/600x/mountain.jpg large"
      title="Title for the image"
      alt="Alt text for the image"
      theme={GrowCss}
    />,
  );

  expect(wrapper).toMatchSnapshot();

  const pictureImage = wrapper.find('.gc-image picture img').html();
  const sourcePictureImage = wrapper.find('.gc-image picture source').html();

  expect(pictureImage).toContain(
    `src="https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/600x/mountain.jpg"`,
  );
  expect(sourcePictureImage).toContain(
    `srcset="https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/400x/mountain.jpg 640w, https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/600x/mountain.jpg 1024w"`,
  );
  expect(pictureImage).toContain(`title="Title for the image"`);
  expect(pictureImage).toContain(`alt="Alt text for the image"`);
});
