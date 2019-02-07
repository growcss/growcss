import { BreakpointsProps } from '../../types';

export type CandidateProps = {
  url?: string;
  width?: string;
  height?: string;
  density?: string;
};

/**
 * Srcset Parser.
 *
 * By Alex Bell |  MIT License.
 *
 * JS Parser for the string value that appears in markup <img srcset="here">.
 *
 * @see https://html.spec.whatwg.org/multipage/embedded-content.html#parse-a-srcset-attribute
 *
 * @returns Array [{url: _, density: _, width: _, height:_}, ...].
 */
export default (input: string, breakpoints: BreakpointsProps = {}): object[] => {
  const inputLength = input.length;

  // (Don't use \s, to avoid matching non-breaking space)
  const regexLeadingSpaces = /^[ \t\n\r\u000c]+/; // eslint-disable-line no-control-regex

  const regexLeadingCommasOrSpaces = /^[, \t\n\r\u000c]+/; // eslint-disable-line no-control-regex

  const regexLeadingNotSpaces = /^[^ \t\n\r\u000c]+/; // eslint-disable-line no-control-regex

  const regexTrailingCommas = /[,]+$/;

  const regexNonNegativeInteger = /^\d+$/;

  // ( Positive or negative or unsigned integers or decimals, without or without exponents.
  // Must include at least one digit.
  // According to spec tests any decimal point must be followed by a digit.
  // No leading plus sign is allowed.)
  // https://html.spec.whatwg.org/multipage/infrastructure.html#valid-floating-point-number
  const regexFloatingPoint = /^-?(?:\d+|\d*\.\d+)(?:[eE][+-]?\d+)?$/;

  let url;

  let descriptors;

  let currentDescriptor;

  let state;

  let c;

  // 2. Let position be a pointer into input, initially pointing at the start
  //    of the string.

  let pos = 0;

  // 3. Let candidates be an initially empty source set.

  const candidates: CandidateProps[] = [];

  // Manual is faster than RegEx
  // http://bjorn.tipling.com/state-and-regular-expressions-in-javascript
  // http://jsperf.com/whitespace-character/5
  function isSpace(char): boolean {
    return (
      char === '\u0020' || // space
      char === '\u0009' || // horizontal tab
      char === '\u000A' || // new line
      char === '\u000C' || // form feed
      char === '\u000D'
    ); // carriage return
  }

  function collectCharacters(regEx): string | null {
    let chars;

    const match = regEx.exec(input.substring(pos));

    if (match) {
      [chars] = match;

      pos += chars.length;

      return chars;
    }

    return null;
  }

  /**
   * Adds descriptor properties to a candidate, pushes to the candidates array.
   *
   * @return Void.
   */
  function parseDescriptors(): void {
    let pError = false;

    // 10. Let width be absent.
    // 11. Let density be absent.
    // 12. Let future-compat-h be absent. (We're implementing it now as h)
    let w;
    let d;
    let h;
    let i;

    const candidate: CandidateProps = {};

    let desc;
    let lastChar;
    let value;
    let intVal;
    let floatVal;

    // 13. For each descriptor in descriptors, run the appropriate set of steps
    // from the following list:
    for (i = 0; i < descriptors.length; i++) {
      desc = descriptors[i];

      if (desc in breakpoints) {
        desc = breakpoints[desc];
      }

      lastChar = desc[desc.length - 1];
      value = desc.substring(0, desc.length - 1);
      intVal = parseInt(value, 10);
      floatVal = parseFloat(value);

      // If the descriptor consists of a valid non-negative integer followed by
      // a U+0077 LATIN SMALL LETTER W character
      if (regexNonNegativeInteger.test(value) && lastChar === 'w') {
        // If width and density are not both absent, then let error be yes.
        if (w || d) {
          pError = true;
        }

        // Apply the rules for parsing non-negative integers to the descriptor.
        // If the result is zero, let error be yes.
        // Otherwise, let width be the result.
        if (intVal === 0) {
          pError = true;
        } else {
          w = intVal;
        }

        // If the descriptor consists of a valid floating-point number followed by
        // a U+0078 LATIN SMALL LETTER X character
      } else if (regexFloatingPoint.test(value) && lastChar === 'x') {
        // If width, density and future-compat-h are not all absent, then let error
        // be yes.
        if (w || d || h) {
          pError = true;
        }

        // Apply the rules for parsing floating-point number values to the descriptor.
        // If the result is less than zero, let error be yes. Otherwise, let density
        // be the result.
        if (floatVal < 0) {
          pError = true;
        } else {
          d = floatVal;
        }

        // If the descriptor consists of a valid non-negative integer followed by
        // a U+0068 LATIN SMALL LETTER H character
      } else if (regexNonNegativeInteger.test(value) && lastChar === 'h') {
        // If height and density are not both absent, then let error be yes.
        if (h || d) {
          pError = true;
        }

        // Apply the rules for parsing non-negative integers to the descriptor.
        // If the result is zero, let error be yes. Otherwise, let future-compat-h
        // be the result.
        if (intVal === 0) {
          pError = true;
        } else {
          h = intVal;
        }

        // Anything else, Let error be yes.
      } else {
        pError = true;
      }
    }

    // 15. If error is still no, then append a new image source to candidates whose
    // URL is url, associated with a width if not absent and a pixel
    // density density if not absent. Otherwise, there is a parse error.
    if (!pError) {
      candidate.url = url;

      if (w) {
        candidate.width = w;
      }

      if (d) {
        candidate.density = d;
      }

      if (h) {
        candidate.height = h;
      }

      candidates.push(candidate);
    } else {
      throw new Error(`Invalid srcSet descriptor found in '${input}' at '${desc}'.`);
    }
  }

  /**
   * Tokenizes descriptor properties prior to parsing.
   *
   * @return Void.
   */
  function tokenize(): void {
    // 8.1. Descriptor tokeniser: Skip whitespace
    collectCharacters(regexLeadingSpaces);

    // 8.2. Let current descriptor be the empty string.
    currentDescriptor = '';

    // 8.3. Let state be in descriptor.
    state = 'in descriptor';

    while (true) {
      // 8.4. Let c be the character at position.
      c = input.charAt(pos);

      //  Do the following depending on the value of state.
      //  For the purpose of this step, "EOF" is a special character representing
      //  that position is past the end of input.

      // In descriptor
      if (state === 'in descriptor') {
        // Do the following, depending on the value of c:

        // Space character
        // If current descriptor is not empty, append current descriptor to
        // descriptors and let current descriptor be the empty string.
        // Set state to after descriptor.
        if (isSpace(c)) {
          if (currentDescriptor) {
            descriptors.push(currentDescriptor);
            currentDescriptor = '';
            state = 'after descriptor';
          }

          // U+002C COMMA (,)
          // Advance position to the next character in input. If current descriptor
          // is not empty, append current descriptor to descriptors. Jump to the step
          // labeled descriptor parser.
        } else if (c === ',') {
          pos += 1;

          if (currentDescriptor) {
            descriptors.push(currentDescriptor);
          }

          parseDescriptors();

          return;

          // U+0028 LEFT PARENTHESIS (()
          // Append c to current descriptor. Set state to in parens.
        } else if (c === '\u0028') {
          currentDescriptor += c;
          state = 'in parens';

          // EOF
          // If current descriptor is not empty, append current descriptor to
          // descriptors. Jump to the step labeled descriptor parser.
        } else if (c === '') {
          if (currentDescriptor) {
            descriptors.push(currentDescriptor);
          }

          parseDescriptors();

          return;

          // Anything else
          // Append c to current descriptor.
        } else {
          currentDescriptor += c;
        }

        // In parens
      } else if (state === 'in parens') {
        // U+0029 RIGHT PARENTHESIS ())
        // Append c to current descriptor. Set state to in descriptor.
        if (c === ')') {
          currentDescriptor += c;
          state = 'in descriptor';

          // EOF
          // Append current descriptor to descriptors. Jump to the step labeled
          // descriptor parser.
        } else if (c === '') {
          descriptors.push(currentDescriptor);

          parseDescriptors();

          return;

          // Anything else
          // Append c to current descriptor.
        } else {
          currentDescriptor += c;
        }

        // After descriptor
      } else if (state === 'after descriptor') {
        // Do the following, depending on the value of c:
        // Space character: Stay in this state.
        if (isSpace(c)) {
          // EOF: Jump to the step labeled descriptor parser.
        } else if (c === '') {
          parseDescriptors();
          return;

          // Anything else
          // Set state to in descriptor. Set position to the previous character in input.
        } else {
          state = 'in descriptor';
          pos -= 1;
        }
      }

      // Advance position to the next character in input.
      pos += 1;
    }
  }

  // 4. Splitting loop: Collect a sequence of characters that are space
  //    characters or U+002C COMMA characters. If any U+002C COMMA characters
  //    were collected, that is a parse error.
  while (true) {
    collectCharacters(regexLeadingCommasOrSpaces);

    // 5. If position is past the end of input, return candidates and abort these steps.
    if (pos >= inputLength) {
      return candidates; // (we're done, this is the sole return path)
    }

    // 6. Collect a sequence of characters that are not space characters,
    //    and let that be url.
    url = collectCharacters(regexLeadingNotSpaces);

    // 7. Let descriptors be a new empty list.
    descriptors = [];

    // 8. If url ends with a U+002C COMMA character (,), follow these substeps:
    // (1). Remove all trailing U+002C COMMA characters from url. If this removed
    // more than one character, that is a parse error.
    if (url.slice(-1) === ',') {
      url = url.replace(regexTrailingCommas, '');
      // (Jump ahead to step 9 to skip tokenization and just push the candidate).
      parseDescriptors();
    } else {
      tokenize();
    }
  }
};
