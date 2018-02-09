//@flow
import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import styled from 'styled-components';
import { Cell, GridX } from '../src/index';

setAddon(JSXAddon);

const CustomGridX = styled(GridX)`
  height: 200px;
  text-align: center;
`;

storiesOf('GridX Central Alignment', module).addWithJSX('alignX center alignY middle', () => (
  <CustomGridX gutterType='padding' alignX='center' alignY='middle'>
    <Cell small={4}>I am in the center-middle</Cell>
    <Cell small={4}>I am also centrally located</Cell>
  </CustomGridX>
));
