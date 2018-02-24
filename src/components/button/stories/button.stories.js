//@flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { GridX, Cell } from '@growcss/xy-grid';

storiesOf('Button', module)
  .add('Button appearances', () => (
    <GridX>
      <Cell small={6}>
        dsa
      </Cell>
      <Cell small={6}>
        dasdsa
      </Cell>
    </GridX>
));
