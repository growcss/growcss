// @flow
import { BreakpointCell } from '../../utils/BreakpointCell';

describe('Test the BreakpointCell output', () => {
  it('Return a empty array on 0 grid count', () => {
    expect(BreakpointCell(0, 'small', false)).toEqual([]);
  });
  it('Return a empty array on not found gutters breakpoint', () => {
    expect(BreakpointCell(12, 'large', false)).toEqual([]);
  });
  it('Return a array with sizes of small 12 grid count', () => {
    expect(BreakpointCell(12, 'small', false)).toEqual(['width: calc(100% - 1.25rem);']);
  });
  it('Return a array with sizes of medium 12 grid count', () => {
    expect(BreakpointCell(12, 'medium', false)).toEqual([
      '@media ',
      '(min-width: 40em)',
      '{',
      'width: calc(100% - 1.875rem);',
      '}',
    ]);
  });
});
