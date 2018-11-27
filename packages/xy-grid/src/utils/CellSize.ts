/**
 * Calculate the percentage size of a cell.
 *
 * @param {string|number} size
 * @param {number}        gridColumns
 *
 * @return {string}
 */
export const CellSize = (size: string | number, gridColumns: number = 12): string => {
  if (typeof size === 'string' && size.includes('%')) {
    return size;
  } else if (+size < 1) {
    return `${Number(size) * 100}%`;
  }

  return `${(Number(size) * 100) / gridColumns}%`;
};
