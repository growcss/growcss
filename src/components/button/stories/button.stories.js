//@flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { GridX, Cell } from '@growcss/xy-grid';
import { Button } from '../src';

const appearances = [
  'default',
  'primary',
  'success',
  'info',
  'warning',
  'danger',
  'link',
  'subtle',
  'subtle-link',
];
const selectableAppearances = ['default', 'primary'];

const AppearanceStorie = () => {
  return appearances.map(a => (
    <GridX>
      <Cell small={4}>
        <Button appearance={a}>{a}</Button>
      </Cell>
      <Cell small={4}>
        <Button appearance={a} isDisabled>Disabled</Button>
      </Cell>
      <Cell small={4}>
        {selectableAppearances.includes(a) ? (
          <Button appearance={a} isSelected>
            Selected
          </Button>
        ) : null}
      </Cell>
    </GridX>
  ));
};

storiesOf('Button', module)
  .add('Button appearances', () => (
    AppearanceStorie()
  ));
