import { Gutters } from './gutters';
import { CellProperties } from './cell-properties';
import { GuttersProps, GutterType } from '../../types';

/**
 * Creates a single breakpoint sized grid.
 *
 * @param {string | number}       size           - The size of your cell. Can be `full` (default) for 100% width, `auto` to use up available space and `shrink` to use up only required space.
 * @param {boolean}               outputGutter   - Whether or not to output gutters.
 * @param {number | GuttersProps} gutters        - Array of gutter values.
 * @param {GutterType}            gutterType     - The gutter type padding or margin.
 * @param {string}                breakpoint     - The name of the breakpoint size in your gutters array to get the size from.
 * @param {boolean}               vertical       - Set to true to output vertical (height) styles rather than widths.
 *
 * @return {Array<string>}
 */
export const CellStatic = (
  gutters: number | GuttersProps,
  size: string | number = 'full',
  outputGutter: boolean = true,
  gutterType: GutterType = 'margin',
  breakpoint: string = 'small',
  vertical: boolean = false,
): string[] => {
  let gutter;
  let gutterPosition = ['left', 'right'];

  if (typeof gutters === 'object' && breakpoint in gutters) {
    gutter = gutters[breakpoint];
  } else if (typeof gutters === 'number') {
    gutter = gutters;
  } else {
    const value = typeof gutters === 'object' ? JSON.stringify(gutters) : gutters;

    throw new Error(
      `No gutters were found in "${value}" for "breakpoint: ${breakpoint}", cell was not generated.`,
    );
  }

  if (vertical) {
    gutterPosition = ['top', 'bottom'];
  }

  let css: string[] = [];

  if (gutterType === 'margin') {
    css.push(CellProperties(size, gutter, vertical));
  } else {
    css.push(CellProperties(size, 0, vertical));
  }

  if (outputGutter) {
    css = css.concat(Gutters(gutter, gutterType, gutterPosition));
  }

  return css;
};
