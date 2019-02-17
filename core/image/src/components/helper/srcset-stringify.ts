import { CandidateProps } from '../../../types';

/**
 * Converts a srcset array to a srcset string.
 *
 * @param {CandidateProps[]} array
 */
export const srcSetStringify = (array: CandidateProps[]): string => {
  return array
    .map(el => {
      if (!el.url) {
        throw new Error('URL is required.');
      }

      const ret = [el.url];

      if (el.width) {
        ret.push(`${el.width}w`);
      }

      if (el.height) {
        ret.push(`${el.height}h`);
      }

      if (el.density) {
        ret.push(`${el.density}x`);
      }

      return ret.join(' ');
    })
    .join(', ');
};
