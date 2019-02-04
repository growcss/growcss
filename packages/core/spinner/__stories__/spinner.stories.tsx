import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import Spinner from '../src';
import SpinnerBaseUse from './example/spinner-base-use';
import LotsOfSpinner from './example/lots-of-spinner';
import StatefulSpinner from './example/stateful-spinner';

const Table = styled.div`
  td {
    width: 20%;
    padding: 10px 5px 0 5px;
  }
  td > .gc-spinner {
    margin: auto;
  }
`;

storiesOf('Core.Spinner', module)
  .add('Spinner in all sizes', () => (
    <Table>
      <tr>
        <td>
          <Spinner size="xxlarge" />
        </td>
        <td>
          <Spinner size="xlarge" />
        </td>
        <td>
          <Spinner size="large" />
        </td>
        <td>
          <Spinner size="medium" />
        </td>
        <td>
          <Spinner size="small" />
        </td>
        <td>
          <Spinner size={50} />
        </td>
      </tr>
      <tr>
        <td>xxlarge</td>
        <td>xlarge</td>
        <td>large</td>
        <td>medium</td>
        <td>small</td>
        <td>custom</td>
      </tr>
    </Table>
  ))
  .add('Spinner with different animations', () => (
    <Table>
      <tr>
        <td>
          <Spinner size="xlarge" animation="fingerprint" />
        </td>
        <td>
          <Spinner size="xlarge" animation="halfCircle" />
        </td>
        <td>
          <Spinner size="xlarge" animation="twoHalfCircle" />
        </td>
      </tr>
      <tr>
        <td>fingerprint</td>
        <td>circle</td>
        <td>halfcircle</td>
      </tr>
    </Table>
  ))
  .add('Baseline alignment', () => (
    <div>
      <div>
        <h1>
          This &lt;h1&gt; element <Spinner /> is using h800
        </h1>
        <h2>
          This &lt;h2&gt; element <Spinner /> is using h700
        </h2>
        <h3>
          This &lt;h3&gt; element <Spinner /> is using h600
        </h3>
        <h4>
          This &lt;h4&gt; element <Spinner /> is using h500
        </h4>
        <h5>
          This &lt;h5&gt; element <Spinner /> is using h400
        </h5>
        <h6>
          This &lt;h6&gt; element <Spinner /> is using h300
        </h6>
        <h6>
          The spinner should be middle-aligned with the text | <Spinner size="small" />
        </h6>
      </div>
    </div>
  ))
  .add('Stateful spinner', () => <StatefulSpinner />)
  .add('Base usage', () => [
    <SpinnerBaseUse />,
    <SpinnerBaseUse animation="fingerprint" delay={3000} />,
  ])
  .add('Lots of spinners', () => <LotsOfSpinner />);
