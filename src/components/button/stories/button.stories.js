//@flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { GridX, Cell } from '@growcss/xy-grid';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee'
import exclamation from '@fortawesome/fontawesome-free-solid/faExclamation'
import arrowDown from '@fortawesome/fontawesome-free-solid/faArrowDown'
import { Button, ButtonGroup } from '../src';

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

class Buttons extends React.Component {
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

const Icon = <FontAwesomeIcon icon={faCoffee} />;

storiesOf('Button', module)
  .add('Button appearances', () => (<Buttons/>))
  .add('Button group', () => (
    <GridX>
      <Cell>
        <ButtonGroup>
          <Button>First Button</Button>
          <Button>Second Button</Button>
          <Button>Button Tertius</Button>
          <Button>Fourth Button</Button>
        </ButtonGroup>
      </Cell>
      <Cell style={{paddingTop: '10px'}}>
        <ButtonGroup>
          <Button appearance="primary">Alpha</Button>
          <Button appearance="default">Beta</Button>
          <Button appearance="warning">Delta</Button>
          <Button appearance="link">Delta</Button>
        </ButtonGroup>
      </Cell>
      <Cell style={{paddingTop: '10px'}}>
        <ButtonGroup appearance="link">
          <Button>Vuejs</Button>
          <Button>Angular</Button>
          <Button>React</Button>
        </ButtonGroup>
      </Cell>
    </GridX>
  ))
  .add('Button options', () => (
    <GridX>
      <Cell>
        <Button iconBefore={Icon}>Icon Before</Button>
      </Cell>
      <Cell style={{paddingTop: '10px'}}>
        <Button iconAfter={Icon}>Icon After</Button>
      </Cell>
      <Cell style={{paddingTop: '10px'}}>
        <Button inline={false} shouldFitContainer>
          Fit Container
        </Button>
      </Cell>
    </GridX>
  )).add('Button spacing', () => (
    <div>
      <GridX>
        <Cell small={6}>
          <Button>Default</Button>
        </Cell>
        <Cell small={6}>
          <Button spacing="compact">Compact</Button>
        </Cell>
      </GridX>
      <GridX>
        <Cell small={4}>
          <Button appearance="link">Default</Button>
        </Cell>
        <Cell small={4}>
          <Button appearance="link" spacing="compact">Compact</Button>
        </Cell>
        <Cell small={4}>
          <Button appearance="link" spacing="none">None</Button>
        </Cell>
      </GridX>
    </div>
  ))
  .add('Button truncation', () => (
    <div style={{width: '190px'}}>
      <Button appearance="primary" iconBefore={<FontAwesomeIcon icon={exclamation} />} style={{width: '30px'}}>exclamation</Button>
      <Button appearance="primary">I am wider than my parent</Button>
      <Button appearance="primary" iconBefore={<FontAwesomeIcon icon={exclamation} />}>I am wider than my parent</Button>
      <Button appearance="primary" iconAfter={<FontAwesomeIcon icon={arrowDown} />}>I am wider than my parent</Button>
    </div>
  ));
