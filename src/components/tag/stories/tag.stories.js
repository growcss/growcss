//@flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Tag } from '../src/index';

storiesOf('Image', module)
  .add('Add Tag with coloured background and white font color', () => (
    <Tag
      style={{
        backgroundColor: 'rgb(255, 255, 255)',
        fontColor: 'rgb(0, 0, 0)'
    }}>Tag text</Tag>
  )).add('Add Tag with coloured background and white font color and remove button', () => (
    <Tag
      style={{
        backgroundColor: 'rgb(255, 255, 255)',
        fontColor: 'rgb(0, 0, 0)'
    }}>Tag text <Remove>x</Remove></Tag>
  ));
