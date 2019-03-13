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

  img {
    /* Get rid of gap under images by making them display: inline-block; by default */
    display: inline-block;
    vertical-align: middle;

    /* Grid defaults to get images and embeds to work properly */
    max-width: 100%;
    height: auto;
    -ms-interpolation-mode: bicubic;
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

  button,
  [role='button'] {
    cursor: pointer;
  }

  table {
    border-collapse: collapse;
  }
`;
