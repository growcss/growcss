import { rem } from '@growcss/elaborate';
import { CellSize } from './cell-size';

/**
 *  Sets our cell widths or heights depending on gutter type.
 *
 * @param {string | number} size
 * @param {string | number} marginGutter
 * @param {boolean}         vertical
 *
 * @return {string}
 */
export const CellProperties = (
  size: string | number,
  marginGutter: string | number,
  vertical: boolean,
): string => {
  const direction: string = vertical ? 'height' : 'width';

  if (size === 'full') {
    const val =
      marginGutter === 0 ? '100%' : `calc(100% - ${rem(marginGutter)})`;

    return `${direction}: ${val};`;
  }

  if (size === 'auto' || size === 'shrink') {
    return `${direction}: auto;`;
  }

  const val =
    marginGutter === 0
      ? CellSize(size)
      : `calc(${CellSize(size)} - ${rem(marginGutter)})`;

  return `${direction}: ${val};`;
};
