//@flow
import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('Foundations', module)
  .add('Color', () => (
    <div>
    </div>
  ))
  .add('Typography', () => (
    <div>
      <h1>Typography</h1>

      <h2>Font stacks</h2>
      <p>Use sans-serif fonts for most of our type, the exception being when you want to display code then you should defer to monospace fonts.</p>
    </div>
  ));
