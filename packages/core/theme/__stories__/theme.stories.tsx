import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { GridContainer, GridX, Cell } from '@growcss/xy-grid';
import { GrowCss, GlobalStyle } from '../src';

const ColorCell = styled(Cell)`
  height: 2rem;
`;

storiesOf('Core.Theme', module)
  .add('Color', () => (
    <React.Fragment>
      <GlobalStyle />
      <GridContainer>
        <GridX>
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.black }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.greyDarkest }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.greyDarker }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.greyDark }}
          />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.theme.colors.grey }} />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.greyLight }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.greyLighter }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.greyLightest }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.white }}
          />
          <ColorCell small={12} />
        </GridX>
        <GridX>
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.redDarkest }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.redDarker }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.redDark }}
          />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.theme.colors.red }} />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.redLight }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.redLighter }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.redLightest }}
          />
          <ColorCell small={12} />
        </GridX>
        <GridX>
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.orangeDarkest }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.orangeDarker }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.orangeDark }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.orange }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.orangeLight }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.orangeLighter }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.orangeLightest }}
          />
          <ColorCell small={12} />
        </GridX>
        <GridX>
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.yellowDarkest }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.yellowDarker }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.yellowDark }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.yellow }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.yellowLight }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.yellowLighter }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.yellowLightest }}
          />
          <ColorCell small={12} />
        </GridX>
        <GridX>
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.greenDarkest }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.greenDarker }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.greenDark }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.green }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.greenLight }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.greenLighter }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.greenLightest }}
          />
          <ColorCell small={12} />
        </GridX>
        <GridX>
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.tealDarkest }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.tealDarker }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.tealDark }}
          />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.theme.colors.teal }} />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.tealLight }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.tealLighter }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.tealLightest }}
          />
          <ColorCell small={12} />
        </GridX>
        <GridX>
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.blueDarkest }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.blueDarker }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.blueDark }}
          />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.theme.colors.blue }} />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.blueLight }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.blueLighter }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.blueLightest }}
          />
          <ColorCell small={12} />
        </GridX>
        <GridX>
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.indigoDarkest }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.indigoDarker }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.indigoDark }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.indigo }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.indigoLight }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.indigoLighter }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.indigoLightest }}
          />
          <ColorCell small={12} />
        </GridX>
        <GridX>
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.purpleDarkest }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.purpleDarker }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.purpleDark }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.purple }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.purpleLight }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.purpleLighter }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.purpleLightest }}
          />
          <ColorCell small={12} />
        </GridX>
        <GridX>
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.pinkDarkest }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.pinkDarker }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.pinkDark }}
          />
          <ColorCell small={12} style={{ backgroundColor: GrowCss.theme.colors.pink }} />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.pinkLight }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.pinkLighter }}
          />
          <ColorCell
            small={12}
            style={{ backgroundColor: GrowCss.theme.colors.pinkLightest }}
          />
          <ColorCell small={12} />
        </GridX>
      </GridContainer>
    </React.Fragment>
  ))
  .add('Font Size', () => (
    <React.Fragment>
      <GlobalStyle />
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
      <GlobalStyle />
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
  ));
