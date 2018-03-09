//@flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { GridX, Cell } from '@growcss/xy-grid';
import { Color } from '@growcss/theme';
import { ThemeProvider } from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee';
import exclamation from '@fortawesome/fontawesome-free-solid/faExclamation';
import arrowDown from '@fortawesome/fontawesome-free-solid/faArrowDown';
import { Button, ButtonGroup } from '../src';
import Buttons from './Components/Buttons';
import ButtonsPerformance from './Components/ButtonsPerformance';

const Icon = <FontAwesomeIcon icon={faCoffee} />;

const theme = {
  button: {
    theme: {
      primary: {
        background: {
          default: Color.deepPurple300,
          hover: Color.deepPurple200,
          active: Color.deepPurple300,
          disabled: Color.grey100,
          selected: Color.deepPurple400,
        },
        boxShadowColor: {
          focus: Color.grey100,
        },
        color: {
          default: Color.white,
          disabled: Color.grey300,
          selected: Color.white
        },
      },
    },
  },
};

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
        <Button href="//github.com/growcss/growcss">with href attribute</Button>
      </Cell>
      <Cell style={{paddingTop: '10px'}}>
        <Button href="//github.com/growcss/growcss">with href attribute + no target</Button>
      </Cell>
      <Cell style={{paddingTop: '10px'}}>
        <Button href="//github.com/growcss/growcss" iconBefore={<FontAwesomeIcon icon={exclamation} />}>with href attribute + icon</Button>
      </Cell>
      <Cell style={{paddingTop: '10px'}}>
        <Button href="//github.com/growcss/growcss" iconBefore={<FontAwesomeIcon icon={exclamation} />} target="_blank">with href attribute + icon +  target</Button>
      </Cell>
      <Cell style={{paddingTop: '10px'}}>
        <Button inline={false} shouldFitContainer>
          Fit Container
        </Button>
      </Cell>
      <Cell style={{paddingTop: '10px'}}>
        <Button iconBefore={<FontAwesomeIcon icon={exclamation} />} shouldFitContainer>Button with should fit container and before icon</Button>
      </Cell>
      <Cell style={{paddingTop: '10px'}}>
        <Button iconAfter={<FontAwesomeIcon icon={exclamation} />} shouldFitContainer>Button with should fit container and after icon</Button>
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
      <Button iconBefore={<FontAwesomeIcon icon={exclamation} />} style={{width: '30px'}}>exclamation</Button>
      <Button>I am wider than my parent</Button>
      <Button iconBefore={<FontAwesomeIcon icon={exclamation} />}>I am wider than my parent</Button>
      <Button iconAfter={<FontAwesomeIcon icon={arrowDown} />}>I am wider than my parent</Button>
    </div>
  ))
  .add('Button theming', () => (
    <div>
      <ThemeProvider theme={ theme }>
        <ButtonGroup>
          <Button appearance='primary'>Button</Button>
          <Button appearance='primary' isDisabled>
            Disabled button
          </Button>
          <Button appearance='primary' isSelected>
            Selected
          </Button>
        </ButtonGroup>
      </ThemeProvider>
      <div style={{background: Color.grey300, marginTop: '10px', padding: '20px'}}>
        <Button displayType='ghost' appearance='danger'>A Ghost button</Button>
      </div>
    </div>
  ))
  .add('Button Performance', () => (
    <ButtonsPerformance/>
  ));
