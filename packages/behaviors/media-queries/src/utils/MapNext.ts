import { BreakpointsProps } from '../components/Breakpoints';

/**
 * Find the next key in object.
 *
 * @param {BreakpointsProps} breakpoints
 * @param {string}           key
 *
 * @return {null|number}
 */
export default function(breakpoints: BreakpointsProps, key: string): number | null {
  const keys: string[] = Object.keys(breakpoints);
  const objectCount: string[] = Object.keys(breakpoints);
  let i = 0;

  // If the Key Exists, Get the index of the key within the map and add 1 to it for the next breakpoint in the map
  if (key in breakpoints) {
    i = keys.indexOf(key) + 1;
  }

  // If the key doesn't exist, or it's the last key in the map, return null
  if (i >= objectCount.length || i === 0) {
    return null;
  }

  return breakpoints[keys[i]];
};
