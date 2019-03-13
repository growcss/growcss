import { BreakpointsProps, CandidateProps } from '../../../types';

const loop = true;

/**
 * Manual is faster than RegEx
 * http://bjorn.tipling.com/state-and-regular-expressions-in-javascript
 * http://jsperf.com/whitespace-character/5
 *
 * @param {string} char
 *
 * @returns {boolean}
 */
const isSpace = (char: string): boolean => {
  return (
    char === '\u0020' || // space
    char === '\u0009' || // horizontal tab
    char === '\u000A' || // new line
    char === '\u000C' || // form feed
    char === '\u000D'
  ); // carriage return
};

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

// Regex for finding a media type in srcset.
const regexMediaQuery = /\([\s\S]+?\)/;

/**
 * By Alex Bell | MIT License.
 *
 * JS Parser for the string value that appears in markup <img srcset="here">.
 *
 * @see https://html.spec.whatwg.org/multipage/embedded-content.html#parse-a-srcset-attribute
 *
 * @returns Array[{url: _, density: _, width: _, height:_}, ...].
 */
export const parseSrcSet = (
  input: string,
  breakpoints: BreakpointsProps = {},
): CandidateProps[] => {
  const inputLength = input.length;

  let url = '';
  let descriptors: string[];
  let currentDescriptor;
  let state: string;
  let characterAtPosition: string;
  let pos = 0;
  const candidates: CandidateProps[] = [];

  /**
   * @param {RegExp} regEx
   *
   * @returns {string}
   */
  function collectCharacters(regEx: RegExp): string {
    let chars;

    const match = regEx.exec(input.substring(pos));

    if (match) {
      [chars] = match;

      pos += chars.length;

      return chars;
    }

    return '';
  }

  /**
   * Adds descriptor properties to a candidate, pushes to the candidates array.
   *
   * @return void
   */
  function parseDescriptors(): void {
    let error = false;
    let i: number;
    let width: undefined | null | number;
    let density;
    let height: undefined | null | number;
    let desc;
    let lastChar;
    let value;
    let intVal: number;
    let floatVal: number;
    let media: undefined | string;
    let extendMedia = false;

    // For each descriptor in descriptors, run the appropriate set of steps
    // from the following list:
    for (i = 0; i < descriptors.length; i++) {
      desc = descriptors[i];

      if (desc === 'and') {
        extendMedia = true;
      } else if (desc in breakpoints) {
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
        if (width || density) {
          error = true;
        }

        // Apply the rules for parsing non-negative integers to the descriptor.
        if (intVal === 0) {
          error = true;
        } else {
          width = intVal;
        }

        // If the descriptor consists of a valid floating-point number followed by
        // a U+0078 LATIN SMALL LETTER X character
      } else if (regexFloatingPoint.test(value) && lastChar === 'x') {
        // If width, density and future-compat-h are not all absent, then let error
        // be yes.
        if (width || density || height) {
          error = true;
        }

        if (floatVal < 0) {
          error = true;
        } else {
          density = floatVal;
        }

        // If the descriptor consists of a valid non-negative integer followed by
        // a U+0068 LATIN SMALL LETTER H character
      } else if (regexNonNegativeInteger.test(value) && lastChar === 'h') {
        // If height and density are not both absent, then let error be yes.
        if (height || density) {
          error = true;
        }

        if (intVal === 0) {
          error = true;
        } else {
          height = intVal;
        }
      } else if (
        regexMediaQuery.test(desc) &&
        (desc.includes('media=') || extendMedia)
      ) {
        media = (extendMedia ? `${media} and ` : '') + desc.replace('media=', '');

        extendMedia = false;
        error = false;
      } else {
        error = true;
      }
    }

    // If error is still false, then append a new image source to candidates whose
    // URL is url, associated with a width if not absent and a pixel
    // density density if not absent. Otherwise, there is a parse error.
    if (!error) {
      const candidate: { [key: string]: string | number } = {};

      candidate.url = url;

      if (width) {
        candidate.width = width;
      }

      if (density) {
        candidate.density = density;
      }

      if (height) {
        candidate.height = height;
      }

      if (media) {
        candidate.media = media;
      }

      candidates.push(candidate);
    } else {
      throw new Error(`Invalid srcSet descriptor found in '${input}' at '${desc}'.`);
    }
  }

  /**
   * Tokenizes descriptor properties prior to parsing.
   *
   * @return {void}
   */
  function tokenize(): void {
    collectCharacters(regexLeadingSpaces);

    currentDescriptor = '';
    state = 'in descriptor';

    while (loop) {
      // Let c be the character at position.
      characterAtPosition = input.charAt(pos);

      //  Do the following depending on the value of state.
      //  For the purpose of this step, "EOF" is a special character representing
      //  that position is past the end of input.
      if (state === 'in descriptor') {
        // Do the following, depending on the value of c:

        // Space character
        // If current descriptor is not empty, append current descriptor to
        // descriptors and let current descriptor be the empty string.
        // Set state to after descriptor.
        if (isSpace(characterAtPosition)) {
          if (currentDescriptor) {
            descriptors.push(currentDescriptor);
            currentDescriptor = '';
            state = 'after descriptor';
          }

          // U+002C COMMA (,)
          // Advance position to the next character in input. If current descriptor
          // is not empty, append current descriptor to descriptors. Jump to the step
          // labeled descriptor parser.
        } else if (characterAtPosition === ',') {
          pos += 1;

          if (currentDescriptor) {
            descriptors.push(currentDescriptor);
          }

          parseDescriptors();

          return;
          // U+0028 LEFT PARENTHESIS (()
          // Append c to current descriptor. Set state to in parens.
        } else if (characterAtPosition === '\u0028') {
          currentDescriptor += characterAtPosition;
          state = 'in parens';

          // EOF
          // If current descriptor is not empty, append current descriptor to
          // descriptors. Jump to the step labeled descriptor parser.
        } else if (characterAtPosition === '') {
          if (currentDescriptor) {
            descriptors.push(currentDescriptor);
          }

          parseDescriptors();

          return;
          // Anything else
          // Append c to current descriptor.
        } else {
          currentDescriptor += characterAtPosition;
        }
      } else if (state === 'in parens') {
        // U+0029 RIGHT PARENTHESIS ())
        // Append c to current descriptor. Set state to in descriptor.
        if (characterAtPosition === ')') {
          currentDescriptor += characterAtPosition;
          state = 'in descriptor';

          // EOF
          // Append current descriptor to descriptors. Jump to the step labeled
          // descriptor parser.
        } else if (characterAtPosition === '') {
          descriptors.push(currentDescriptor);

          parseDescriptors();

          return;
          // Anything else
          // Append c to current descriptor.
        } else {
          currentDescriptor += characterAtPosition;
        }
      } else if (state === 'after descriptor') {
        // Do the following, depending on the value of c:
        // Space character: Stay in this state.
        if (isSpace(characterAtPosition)) {
          // EOF: Jump to the step labeled descriptor parser.
        } else if (characterAtPosition === '') {
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

  // Splitting loop: Collect a sequence of characters that are space
  // characters or U+002C COMMA characters. If any U+002C COMMA characters
  // were collected, that is a parse error.
  while (loop) {
    collectCharacters(regexLeadingCommasOrSpaces);

    // If position is past the end of input, return candidates and abort these steps.
    if (pos >= inputLength) {
      break;
    }

    // Collect a sequence of characters that are not space characters,
    // and let that be url.
    url = collectCharacters(regexLeadingNotSpaces);

    descriptors = [];

    // If url ends with a U+002C COMMA character (,), follow these substeps:
    // (1). Remove all trailing U+002C COMMA characters from url. If this removed
    // more than one character, that is a parse error.
    if (url.slice(-1) === ',') {
      url = url.replace(regexTrailingCommas, '');

      parseDescriptors();
    } else {
      tokenize();
    }
  }

  return candidates;
};
