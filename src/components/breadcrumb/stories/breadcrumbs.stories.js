// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Breadcrumbs, BreadcrumbsItem } from '../src';

storiesOf('Breadcrumbs', module)
  .add('Basic', () => (
    <Breadcrumbs>
      <BreadcrumbsItem href="/pages">Pages</BreadcrumbsItem>
      <BreadcrumbsItem href="/pages/home">Home</BreadcrumbsItem>
      <BreadcrumbsItem href="/pages/breadcrumb">Breadcrumb</BreadcrumbsItem>
    </Breadcrumbs>
  ));
