//@flow
import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { Cell, GridX } from '../src/index';

setAddon(JSXAddon);

storiesOf('Cell self alignment', module).addWithJSX('align self types', () => (
  <GridX gutterType='padding'>
    <Cell small={3} align='bottom'>Align bottom</Cell>
    <Cell small={3} align='middle'>Align middle</Cell>
    <Cell small={3} align='stretch'>Align stretch</Cell>
    <Cell small={3} align='top'>Align top. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non harum laborum cum voluptate vel, eius adipisci similique dignissimos nobis at excepturi incidunt fugit molestiae quaerat, consequuntur porro temporibus. Nisi, ex?</Cell>
  </GridX>
));
