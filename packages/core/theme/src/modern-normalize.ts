import { css } from 'styled-components';
import normalize from './normalize';

export default css`
  html {
    box-sizing: border-box;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  :root {
    -moz-tab-size: 4;
    tab-size: 4;
  }

  ${normalize}

  html,
  body,
  div,
  img,
  fieldset {
    margin: 0;
    padding: 0;
  }

  img,
  fieldset {
    border: 0;
  }

  p:first-child,
  ul:first-child,
  ol:first-child,
  dl:first-child,
  h1:first-child,
  h2:first-child,
  h3:first-child,
  h4:first-child,
  h5:first-child,
  h6:first-child,
  blockquote:first-child,
  pre:first-child,
  form:first-child,
  table:first-child {
    margin-top: 0;
  }
`;
