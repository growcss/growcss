import { rem, mediaquery } from '@growcss/elaborate';
import { GuttersProps, GutterType } from '../../types';

/**
 * Builds the css for gutters.
 *
 * @param {number}        gutter
 * @param {boolean}       negative
 * @param {GutterType}    gutterType
 * @param {Array<string>} gutterPosition
 *
 * @return {string}
 */
const cssBuilder = (
  gutter: number,
  negative: boolean,
  gutterType: GutterType,
  gutterPosition: string[],
): string => {
  let negativeBoolean = negative;
  let operator = negativeBoolean ? '-' : '';
  const gutterSize = gutter;

  const remValue = rem(+gutterSize / 2);

  // If the value is already negative, remove the operator and set negative to true.
  if (gutterSize < 0) {
    negativeBoolean = true;
    operator = '';
  }

  // If we have declared negative gutters, force type to `margin.
  const gType = negativeBoolean ? 'margin' : gutterType;

  let css = '';

  for (const gutterPositionItem of gutterPosition) {
    css += `${gType}-${gutterPositionItem}: ${operator}${remValue};`;
  }

  return css;
};

/**
 * Create gutters for a cell/container.
 *
 * @param {number | GuttersProps} gutters
 * @param {GutterType}            gutterType
 * @param {Array<string>}         gutterPosition
 * @param {boolean}               negative
 *
 * @return {Array<string>}
 */
export const Gutters = (
  gutters: number | GuttersProps,
  gutterType: GutterType = 'margin',
  gutterPosition: string[] = ['right', 'left'],
  negative: boolean = false,
): string[] => {
  // Output our margin gutters.
  if (typeof gutters === 'object') {
    const strings: string[] = [];

    for (const key in gutters) {
      if (typeof gutters[key] === 'number' || typeof gutters[key] === 'string') {
        strings.push(
          mediaquery(key)`${cssBuilder(
            gutters[key],
            negative,
            gutterType,
            gutterPosition,
          )}`,
        );
      }
    }

    return strings;
  }

  return [cssBuilder(gutters, negative, gutterType, gutterPosition)];
};
