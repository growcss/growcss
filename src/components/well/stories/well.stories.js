//@flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Well } from '../src/index';

storiesOf('Well', module)
  .add('Default well element with text', () => (
    <Well>test</Well>
  ))
  .add('Well with background images', () => (
    <Well
      previewImage='https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/32x/-/grayscale/-/quality/lightest/mountain.jpg'
      backgroundImages={{
        small: 'https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/400x/mountain.jpg',
        medium: 'https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/600x/mountain.jpg',
        large: 'https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/1024x/mountain.jpg',
        xlarge: 'https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/-/resize/1280x/mountain.jpg',
        xxlarge: 'https://ucarecdn.com/1b73ebf8-b2d6-40cc-abd6-945d4df883c9/mountain.jpg ',
      }}>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    </Well>
  ));
