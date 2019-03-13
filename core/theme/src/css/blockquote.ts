import { css } from 'styled-components';

export default (gutterSize: number) => css`
  blockquote,
  q {
    color: inherit;
  }
  blockquote {
    border: none;
    padding-left: ${gutterSize}px;
  }
  [dir='rtl'] blockquote {
    padding-left: 0;
    padding-right: ${gutterSize}px;
  }
  blockquote::before,
  q::before {
    content: '\\201C';
  }
  blockquote::after,
  q::after {
    content: '\\201D';
  }
  blockquote::before {
    float: left;
    /* to keep the quotes left of any child elements like blockquote > p */
    margin-left: -1em;
    text-align: right;
    width: 1em;
  }
  [dir='rtl'] blockquote::before {
    float: right;
    margin-right: -1em;
    text-align: left;
  }
  blockquote > :last-child {
    display: inline-block; /* so the quotes added via pseudos follow it immediately. */
  }
`;
