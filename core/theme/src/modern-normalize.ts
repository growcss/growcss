import { css } from 'styled-components';
import normalize from './normalize';

/**
 * 1. Prevent padding and border from affecting element width
 * https://goo.gl/pYtbK7
 * 2. Change the default font family in all browsers (opinionated)
 */

export default (
  borderColor: string,
) => css`
  html {
    box-sizing: border-box; /* 1 */
    font-family: sans-serif; /* 2 */
  }

  /* Removes the default spacing and border for appropriate elements. */
  blockquote,
  dl,
  dd,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  figure,
  p,
  pre,
  ul,
  ol {
    margin: 0;
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

  img {
    /* Get rid of gap under images by making them display: inline-block; by default */
    display: inline-block;
    vertical-align: middle;

    /* Grid defaults to get images and embeds to work properly */
    max-width: 100%;
    height: auto;
    -ms-interpolation-mode: bicubic;
    border-style: solid;
  }

  /* Make sure textarea takes on height automatically */
  textarea {
    height: auto;
    min-height: 50px;
    resize: vertical;
  }

  /* Make select elements are 100% width by default */
  select {
    box-sizing: border-box;
    width: 100%;
  }

  /* Prevent text overflow on pre */
  pre {
    overflow: auto;
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

  input::placeholder,
  textarea::placeholder {
    color: inherit;
    opacity: 0.5;
  }

  button {
    background: transparent;
    padding: 0;
  }

  /* Work around a Firefox/IE bug where the transparent \`button\` background results in a loss of the default \`button\` focus styles. */
  button:focus {
    outline: 1px dotted;
    outline: 5px auto -webkit-focus-ring-color;
  }

  button,
  [role='button'] {
    cursor: pointer;
  }

  table {
    border-collapse: collapse;
  }

  iframe {
    border: 0;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    border-width: 0;
    border-style: solid;
    border-color: ${borderColor};
  }
`;
