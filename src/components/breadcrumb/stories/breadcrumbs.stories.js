// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Breadcrumbs, BreadcrumbsItem } from '../../theme/src';

storiesOf('Breadcrumbs', module)
  .add('Basic', () => (
    <Breadcrumbs>
      <BreadcrumbsItem href="/pages" text="Pages" />
      <BreadcrumbsItem href="/pages/home" text="Home" />
      <BreadcrumbsItem href="/pages/breadcrumb" text="Breadcrumb"/>
    </Breadcrumbs>
  ));
