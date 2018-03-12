// @flow
/**
 * Sets base flex properties for cells.
 *
 * @param {string} size The size of your cell. Accepts `auto`, `shrink` or `grow`.
 *
 * @return {string}
 */
export const CellBase = (size: string = 'full'): string => {
  let css = 'min-height: 0px;min-width: 0px;';

  if (size === 'auto') {
    css += 'flex: 1 1 0px;';
  } else if (size === 'shrink') {
    css += 'flex: 0 0 auto;';
  } else if (size === 'grow') {
    css += 'flex: 1 0 auto;';
  } else {
    css += 'flex: 0 0 auto;';
  }

  return css;
};
