import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { GrowCss } from '../src';

const ColorCell = styled.div`
  display: block;
  width: 100%;
  height: 2rem;
`;

storiesOf('Core.Theme', module)
  .add('Color', () => (
    <React.Fragment>
      <ColorCell style={{ backgroundColor: GrowCss.colors.black }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.greyDarkest }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.greyDarker }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.greyDark }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.grey }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.greyLight }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.greyLighter }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.greyLightest }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.white }} />
      <ColorCell />
      <ColorCell style={{ backgroundColor: GrowCss.colors.redDarkest }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.redDarker }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.redDark }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.red }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.redLight }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.redLighter }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.redLightest }} />
      <ColorCell />
      <ColorCell style={{ backgroundColor: GrowCss.colors.orangeDarkest }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.orangeDarker }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.orangeDark }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.orange }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.orangeLight }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.orangeLighter }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.orangeLightest }} />
      <ColorCell />
      <ColorCell style={{ backgroundColor: GrowCss.colors.yellowDarkest }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.yellowDarker }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.yellowDark }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.yellow }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.yellowLight }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.yellowLighter }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.yellowLightest }} />
      <ColorCell />
      <ColorCell style={{ backgroundColor: GrowCss.colors.greenDarkest }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.greenDarker }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.greenDark }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.green }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.greenLight }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.greenLighter }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.greenLightest }} />
      <ColorCell />
      <ColorCell style={{ backgroundColor: GrowCss.colors.tealDarkest }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.tealDarker }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.tealDark }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.teal }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.tealLight }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.tealLighter }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.tealLightest }} />
      <ColorCell />
      <ColorCell style={{ backgroundColor: GrowCss.colors.blueDarkest }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.blueDarker }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.blueDark }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.blue }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.blueLight }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.blueLighter }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.blueLightest }} />
      <ColorCell />
      <ColorCell style={{ backgroundColor: GrowCss.colors.indigoDarkest }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.indigoDarker }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.indigoDark }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.indigo }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.indigoLight }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.indigoLighter }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.indigoLightest }} />
      <ColorCell />
      <ColorCell style={{ backgroundColor: GrowCss.colors.purpleDarkest }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.purpleDarker }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.purpleDark }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.purple }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.purpleLight }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.purpleLighter }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.purpleLightest }} />
      <ColorCell />
      <ColorCell style={{ backgroundColor: GrowCss.colors.pinkDarkest }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.pinkDarker }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.pinkDark }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.pink }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.pinkLight }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.pinkLighter }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.pinkLightest }} />
      <ColorCell />
    </React.Fragment>
  ))
  .add('Font Size', () => (
    <React.Fragment>
      <h1>This is a &lt;h1&gt; element</h1>
      <h2>This is a &lt;h2&gt; element</h2>
      <h3>This is a &lt;h3&gt; element</h3>
      <h4>This is a &lt;h4&gt; element</h4>
      <h5>This is a &lt;h5&gt; element</h5>
      <h6>This is a &lt;h6&gt; element</h6>
    </React.Fragment>
  ))
  .add('Links', () => (
    <React.Fragment>
      <p>
        <a href=".">Standard link</a>
      </p>
      <p>
        Link with descenders: <a href=".">jump quickly!</a>
      </p>
      <h3>
        Link in a <a href=".">heading</a>
      </h3>
      <ul>
        <li>
          <a href=".">links can also</a>
        </li>
        <li>
          <a href=".">appear in lists</a>
        </li>
        <li>
          <a href=".">like this</a>
        </li>
      </ul>
    </React.Fragment>
  ))
  .add('Lists - flat', () => (
    <React.Fragment>
      <h2>{`<ul>`}</h2>
      <ul>
        <li>First list item</li>
        <li>Second list item</li>
        <li>Third list item</li>
      </ul>
      <h2>&lt;ol&gt;</h2>
      <ol>
        <li>First list item</li>
        <li>Second list item</li>
        <li>Third list item</li>
      </ol>
      <h2>&lt;dl&gt;</h2>
      <dl>
        <dt>First definition</dt>
        <dd>Definition description</dd>
        <dd>Definition description</dd>
        <dt>Second definition</dt>
        <dd>Definition description</dd>
        <dt>Third definition</dt>
      </dl>
    </React.Fragment>
  ))
  .add('Lists - nested', () => (
    <React.Fragment>
      <h2>&lt;ul&gt;</h2>
      <ul>
        <li>First list item</li>
        <li>Second list item</li>
        <li>
          <p>Third list item</p>
          <ul>
            <li>Nested lists as well</li>
            <li>Nested lists as well</li>
            <li>Nested lists as well</li>
          </ul>
        </li>
        <li>
          <p>Fourth list item</p>
          <ol>
            <li>Nested ordered lists as well</li>
            <li>Nested ordered lists as well</li>
            <li>Nested ordered lists as well</li>
          </ol>
        </li>
      </ul>
      <h2>&lt;ol&gt;</h2>
      <ol>
        <li>First list item</li>
        <li>Second list item</li>
        <li>
          <p>Third list item</p>
          <ul>
            <li>Nested lists as well</li>
            <li>Nested lists as well</li>
            <li>Nested lists as well</li>
          </ul>
        </li>
        <li>
          <p>Fourth list item</p>
          <ol>
            <li>Nested ordered lists as well</li>
            <li>Nested ordered lists as well</li>
            <li>Nested ordered lists as well</li>
          </ol>
        </li>
      </ol>
      <h2>&lt;dl&gt;</h2>
      <dl>
        <dt>First definition</dt>
        <dd>Definition description</dd>
        <dd>Definition description</dd>
        <dt>Second definition</dt>
        <dd>Definition description</dd>
        <dt>Third definition</dt>
        <dd>
          <p>Paragraphs should be fine when followed by</p>
          <ul>
            <li>lists like</li>
            <li>this one</li>
          </ul>
          <ol>
            <li>or ordered lists</li>
            <li>like this one</li>
          </ol>
        </dd>
      </dl>
    </React.Fragment>
  ))
  .add('Table - simple', () => (
    <React.Fragment>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Apple</td>
            <td>3</td>
            <td>€1.42</td>
          </tr>
          <tr>
            <td>Orange</td>
            <td>6</td>
            <td>€6.60</td>
          </tr>
          <tr>
            <td>Banana</td>
            <td>12</td>
            <td>€9.79</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  ))
  .add('Table - complex', () => (
    <React.Fragment>
      <table>
        <caption>Table captions are like headings for tabular data</caption>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Total</th>
            <td>21</td>
            <td>$13.81</td>
          </tr>
        </tfoot>
        <tbody>
          <tr>
            <td>Apple</td>
            <td>3</td>
            <td>$5.42</td>
          </tr>
          <tr>
            <td>Orange</td>
            <td>6</td>
            <td>$4.60</td>
          </tr>
          <tr>
            <td>Banana</td>
            <td>12</td>
            <td>$3.79</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  ))
  .add('Blockquote', () => (
    <React.Fragment>
      <h2>
        {`<blockquote>`} with {`<cite>`}
      </h2>
      <blockquote>
        <p>
          All that is gold does not glitter, not all those who wander are lost; The old
          that is strong does not wither, deep roots are not reached by the frost.
        </p>
        <p>
          {' '}
          From the ashes a fire shall be woken, a light from the shadows shall spring;
          Renewed shall be blade that was broken, the crownless again shall be king.
        </p>
        <p>
          <cite>J.R.R. Tolkien, The Fellowship of the Ring</cite>.
        </p>
      </blockquote>
      <h2>
        Inline quotes with {`<q>`} and {`<cite>`}
      </h2>
      <p>
        The old addage{' '}
        <q>
          Be yourself; everyone else is already taken. <cite>Oscar Wilde</cite>
        </q>{' '}
        is very fitting.
      </p>
    </React.Fragment>
  ))
  .add('Code / Pre', () => (
    <React.Fragment>
      <h2>Preformatted text using {`<pre>`}</h2>
      <pre> Item | Qty | Apples | 5 Oranges | 10 Grapes | 99</pre>
      <h2>Code blocks with {`<pre> and <code>`}</h2>
      <pre>
        <code>
          {`<div class="foo">
<h1>Example markup snippet</h1>
<p>Sona si Latine loqueris. Si <b>Hoc Legere</b> Scis Nimium Eruditionis Habes. Sentio aliquos togatos contra me conspirare.</p>
</div>`}
        </code>
      </pre>
      <h2>Inline {`<code>`}</h2>
      <p>
        Simply paste <code>{`body { font-weight: bold; }`}</code> into your file.
      </p>
    </React.Fragment>
  ))
  .add('Miscellaneous', () => (
    <React.Fragment>
      <h2>{`<time>`}</h2>
      <p>
        Can you move that meeting on <time dateTime="20220101 10:00">May 15</time> to the
        pub?
      </p>
      <h2>
        {`<dfn>`} and {`<abbr>`}
      </h2>
      <p>
        <dfn>Recursion</dfn>: the repeated application of a recursive procedure or
        definition.See also: recursion.
      </p>
      <p>
        The <abbr title="GrowCss">GC</abbr> library provides a typography component
        &mdash; make sure you put a title (or Tooltip) on your {`<abbr>`} elements.
      </p>
      <h2>
        {`<ins>`} and {`<del>`}
      </h2>
      <p>
        Ice cream <del>sucks</del>
        <ins>is awesome</ins>!
      </p>
      <h2>
        {`<sub>`} and {`<sup>`}
      </h2>
      <p>
        These elements
        <a href=".">
          <sup>1</sup>
        </a>{' '}
        should still
        <a href=".">
          <sub>2</sub>
        </a>{' '}
        have default styling<sup>3</sup> as well<sub>4</sub>
      </p>
      <h2>Keyboard commands with {`<kbd>`}</h2>
      <p>
        Simply press <kbd>Alt</kbd> + <kbd>F4</kbd> to preview your changes.
      </p>
      <h2>Variables in a mathematical expression with {`<var>`}</h2>
      <p>
        A simple equation: <var>x</var> = <var>y</var> + 2
      </p>
      <h2>{`<small>`} text</h2>
      <p>
        <small>Only use this size text if there is a good rationale.</small>
      </p>
    </React.Fragment>
  ));
