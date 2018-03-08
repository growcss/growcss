//@flow
import React from 'react';
import { Button } from '../../src';
import { GridX, Cell } from '@growcss/xy-grid';

const appearances = [
  'default',
  'primary',
  'success',
  'info',
  'warning',
  'danger',
  'link',
];
const selectableAppearances = [
  'default',
  'primary',
  'success',
  'info',
  'warning',
  'danger',
];

export default class Buttons extends React.Component {
  render() {
    return (
      appearances.map(a => (
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
      ))
    );
  }
}
