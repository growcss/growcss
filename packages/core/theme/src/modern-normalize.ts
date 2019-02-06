import { css } from 'styled-components';
import normalize from './normalize';

export default css`
  a,
  abbr,
  acronym,
  address,
  applet,
  article,
  aside,
  big,
  blockquote,
  body,
  caption,
  cite,
  code,
  dd,
  del,
  details,
  dfn,
  div,
  dl,
  dt,
  em,
  fieldset,
  figcaption,
  figure,
  font,
  footer,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  header,
  hgroup,
  html,
  iframe,
  ins,
  kbd,
  label,
  legend,
  li,
  menu,
  nav,
  object,
  ol,
  p,
  pre,
  q,
  s,
  samp,
  section,
  small,
  span,
  strike,
  strong,
  sub,
  sup,
  table,
  tbody,
  td,
  tfoot,
  th,
  thead,
  tr,
  tt,
  ul,
  var {
    border: 0;
    margin: 0;
    padding: 0;
    font-family: inherit;
    font-size: 100%;
    font-style: inherit;
    font-weight: inherit;
    vertical-align: baseline;
  }

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

  /* Suppress the ugly broken image styling in Firefox */
  @-moz-document url-prefix() {
    img {
      font-size: 0;
    }
    img:-moz-broken {
      font-size: inherit;
    }
  }
`;
