import _mapNext from '../src/components/mediaquery/_map-next';
import { Breakpoints } from '../src/components/mediaquery/media-query';

describe('Map Next', () => {
  it('Returns the next value in a map', () => {
    expect(_mapNext(Breakpoints, 'small')).toBe(640);
    expect(_mapNext(Breakpoints, 'xxlarge')).toBeNull();
  });

  it('Returns null if the key is last in the map', () => {
    expect(_mapNext(Breakpoints, 'xxlarge')).toBeNull();
  });

  it('Returns null if the key is not in the map', () => {
    expect(_mapNext(Breakpoints, 'test')).toBeNull();
  });
});
