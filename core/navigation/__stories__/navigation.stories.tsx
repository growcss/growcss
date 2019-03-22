import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Navigation } from '../src/components/Navigation';

storiesOf('Core.Navigation', module)
  .add('Simple navigation', () => (
    <Navigation/>
  ));
