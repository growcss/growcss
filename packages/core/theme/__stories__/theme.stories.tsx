import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { GridContainer, GridX, Cell } from '@growcss/xy-grid';
import { GrowCss } from '../src';

const ColorCell = styled(Cell)`
  height: 2rem;
`;

storiesOf('Core.Theme', module)
  .add('Color', () => (
    <React.Fragment>
      <GridContainer>
        <GridX>
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.black }} />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.greyDarkest }}
          />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.greyDarker }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.greyDark }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.grey }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.greyLight }} />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.greyLighter }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.greyLightest }}
          />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.white }} />
          <ColorCell small={12} />
        </GridX>
        <GridX>
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.redDarkest }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.redDarker }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.redDark }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.red }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.redLight }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.redLighter }} />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.redLightest }}
          />
          <ColorCell small={12} />
        </GridX>
        <GridX>
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.orangeDarkest }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.orangeDarker }}
          />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.orangeDark }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.orange }} />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.orangeLight }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.orangeLighter }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.orangeLightest }}
          />
          <ColorCell small={12} />
        </GridX>
        <GridX>
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.yellowDarkest }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.yellowDarker }}
          />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.yellowDark }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.yellow }} />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.yellowLight }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.yellowLighter }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.yellowLightest }}
          />
          <ColorCell small={12} />
        </GridX>
        <GridX>
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.greenDarkest }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.greenDarker }}
          />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.greenDark }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.green }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.greenLight }} />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.greenLighter }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.greenLightest }}
          />
          <ColorCell small={12} />
        </GridX>
        <GridX>
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.tealDarkest }}
          />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.tealDarker }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.tealDark }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.teal }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.tealLight }} />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.tealLighter }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.tealLightest }}
          />
          <ColorCell small={12} />
        </GridX>
        <GridX>
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.blueDarkest }}
          />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.blueDarker }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.blueDark }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.blue }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.blueLight }} />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.blueLighter }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.blueLightest }}
          />
          <ColorCell small={12} />
        </GridX>
        <GridX>
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.indigoDarkest }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.indigoDarker }}
          />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.indigoDark }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.indigo }} />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.indigoLight }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.indigoLighter }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.indigoLightest }}
          />
          <ColorCell small={12} />
        </GridX>
        <GridX>
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.purpleDarkest }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.purpleDarker }}
          />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.purpleDark }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.purple }} />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.purpleLight }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.purpleLighter }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.purpleLightest }}
          />
          <ColorCell small={12} />
        </GridX>
        <GridX>
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.pinkDarkest }}
          />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.pinkDarker }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.pinkDark }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.pink }} />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.colors.pinkLight }} />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.pinkLighter }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.colors.pinkLightest }}
          />
          <ColorCell small={12} />
        </GridX>
      </GridContainer>
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
