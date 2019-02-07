import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Image, Figcaption } from '../src';

storiesOf('Core.Image', module)
  .add('Simple image', () => (
    <Image
      width={1024}
      height={256}
      alt="test"
      src="https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/1024x/mountain.jpg"
    />
  ))
  .add('Image with a preview url', () => (
    <Image
      width={1024}
      height={256}
      alt="test"
      previewImage="https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/32x/-/grayscale/-/quality/lightest/mountain.jpg"
      srcSet="https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/300x/mountain.jpg medium, https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/1024x/mountain.jpg large"
    />
  ))
  .add('Image with figcaption', () => (
    <Image
      width={1024}
      height={256}
      alt="test"
      previewImage="https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/32x/-/grayscale/-/quality/lightest/mountain.jpg"
      srcSet="https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/300x/mountain.jpg medium, https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/1024x/mountain.jpg large"
    >
      <Figcaption>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Figcaption>
    </Image>
  ))
  .add('Image with figcaption to the right', () => (
    <Image
      width={1024}
      height={256}
      alt="test"
      previewImage="https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/32x/-/grayscale/-/quality/lightest/mountain.jpg"
      srcSet="https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/300x/mountain.jpg medium, https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/1024x/mountain.jpg large"
    >
      <Figcaption align="right">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Figcaption>
    </Image>
  ))
  .add('Image with default visible on true', () => (
    <Image
      width={1024}
      height={256}
      alt="test"
      srcSet="https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/300x/mountain.jpg medium, https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/1024x/mountain.jpg large"
    />
  ));
