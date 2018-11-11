import mediaquery from '@growcss/behavior-media-queries';
import remCalc from '@growcss/util-remcalc';
import { GuttersProps } from '../components/Gutters';
import stripUnits from 'strip-units';

const cssBuilder = (
  gutter: string | number,
  negative: boolean,
  gutterType: string,
  gutterPosition: Array<string>,
): string => {
  let negativeBoolean = negative;
  let operator = negativeBoolean === true ? '-' : '';

  const rem = remCalc(stripUnits(gutter) / 2);

  // If the value is already negative, remove the operator and set negative to true.
  if (typeof gutter === 'number' && gutter < 0) {
    negativeBoolean = true;
    operator = '';
  }

  // If we have declared negative gutters, force type to `margin.
  const gType = negativeBoolean === true ? 'margin' : gutterType;

  let css = '';

  for (const gutterPositionItem of gutterPosition) {
    css += `${gType}-${gutterPositionItem}: ${operator}${rem};`;
  }

  return css;
};

/**
 * Create gutters for a cell/container.
 *
 * @param {string | number | GuttersProps} gutters
 * @param {string}               gutterType
 * @param {Array<string>}        gutterPosition
 * @param {boolean}              negative
 *
 * @return {Array<string>}
 */
export const Gutters = (
  gutters: string | number | GuttersProps,
  gutterType: string = 'margin',
  gutterPosition: Array<string> = ['right', 'left'],
  negative: boolean = false,
) => {
  // Output our margin gutters.
  if (typeof gutters === 'object') {
    const strings = [];

    for (const key in gutters) {
      if (
        typeof gutters[key] === 'number' ||
        typeof gutters[key] === 'string'
      ) {
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
