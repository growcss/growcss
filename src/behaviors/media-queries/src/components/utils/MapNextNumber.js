//@flow
import type { BreakpointsType } from '../../types';

/**
 * Find the next number in object.
 *
 * @param {BreakpointsType} breakpoints
 * @param {number}          number      Number to use as a starting point
 *
 * @return {null | number} The number following `number`, if `number` was found. If `number` was not found, or `number` was the biggest number in the map, returns `null`.
 */
export const mapNextNumber = (breakpoints: BreakpointsType, number: number): null | number => {
  let nextNumber = null;

  for (const key in breakpoints) {
    if (typeof breakpoints[key] === 'number') {
      if (breakpoints[key] > number && (nextNumber === null || breakpoints[key] < nextNumber)) {
        nextNumber = breakpoints[key];
      }
    }
  }

  return nextNumber;
};
