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
      <ColorCell style={{ backgroundColor: GrowCss.colors.white }} />
      <ColorCell />
      <ColorCell style={{ backgroundColor: GrowCss.colors.gray[100] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.gray[200] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.gray[300] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.gray[400] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.gray[500] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.gray[600] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.gray[700] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.gray[800] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.gray[900] }} />
      <ColorCell />
      <ColorCell style={{ backgroundColor: GrowCss.colors.red[100] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.red[200] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.red[300] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.red[400] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.red[500] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.red[600] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.red[700] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.red[800] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.red[900] }} />
      <ColorCell />
      <ColorCell style={{ backgroundColor: GrowCss.colors.orange[100] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.orange[200] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.orange[300] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.orange[400] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.orange[500] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.orange[600] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.orange[700] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.orange[800] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.orange[900] }} />
      <ColorCell />
      <ColorCell style={{ backgroundColor: GrowCss.colors.yellow[100] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.yellow[200] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.yellow[300] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.yellow[400] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.yellow[500] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.yellow[600] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.yellow[700] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.yellow[800] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.yellow[900] }} />
      <ColorCell />
      <ColorCell style={{ backgroundColor: GrowCss.colors.green[100] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.green[200] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.green[300] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.green[400] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.green[500] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.green[600] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.green[700] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.green[800] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.green[900] }} />
      <ColorCell />
      <ColorCell style={{ backgroundColor: GrowCss.colors.teal[100] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.teal[200] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.teal[300] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.teal[400] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.teal[500] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.teal[600] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.teal[700] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.teal[800] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.teal[900] }} />
      <ColorCell />
      <ColorCell style={{ backgroundColor: GrowCss.colors.blue[100] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.blue[200] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.blue[300] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.blue[400] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.blue[500] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.blue[600] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.blue[700] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.blue[800] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.blue[900] }} />
      <ColorCell />
      <ColorCell style={{ backgroundColor: GrowCss.colors.indigo[100] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.indigo[200] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.indigo[300] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.indigo[400] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.indigo[500] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.indigo[600] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.indigo[700] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.indigo[800] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.indigo[900] }} />
      <ColorCell />
      <ColorCell style={{ backgroundColor: GrowCss.colors.purple[100] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.purple[200] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.purple[300] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.purple[400] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.purple[500] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.purple[600] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.purple[700] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.purple[800] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.purple[900] }} />
      <ColorCell />
      <ColorCell style={{ backgroundColor: GrowCss.colors.pink[100] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.pink[200] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.pink[300] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.pink[400] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.pink[500] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.pink[600] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.pink[700] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.pink[800] }} />
      <ColorCell style={{ backgroundColor: GrowCss.colors.pink[900] }} />
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
