// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import Color from '../src/components/base/Color';

class ColorTable extends React.Component {
  render() {
    const trContents = {
      '50': [],
      '100': [],
      '200': [],
      '300': [],
      '400': [],
      '500': [],
      '600': [],
      '700': [],
      '800': [],
      '900': [],
      A100: [],
      A200: [],
      A400: [],
      A700: [],
    };
    const regex = /[A-Z]\d+|\d+/;

    for (let colorName in Color) {
      const number = colorName.match(regex);

      if (number !== null) {
        trContents[number[0]].push(
          <td style={{
            background: Color[colorName],
            fontSize: '11px',
            padding: '10px',
            verticalAlign: 'bottom',
            position: 'relative',
            color: 'rgba(255,255,255,.8)'
          }}>
            {number[0]}
          </td>
        );
      }
    }

    const content = [];

    for (let id in trContents) {
      content.push(<tr>{trContents[id]}</tr>)
    }

    return (
      <table cellspacing="0" cellpadding="0" style={{tableLayout: 'fixed', width: '100%', border: 0, boxSizing: 'border-box'}}>
        <tbody>
        {content}
        </tbody>
      </table>
    );
  }
}

storiesOf('Foundations', module)
  .add('Color', () => (
    <div>
      <h1>Material Design Colors</h1>

      <ColorTable/>
    </div>
  ))
  .add('Typography', () => (
    <div>
      <h1>Typography</h1>

      <h2>Font stacks</h2>
      <p>Use sans-serif fonts for most of our type, the exception being when you want to display code then you should defer to monospace fonts.</p>
    </div>
  ));
