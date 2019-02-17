import { CellSize } from '../../src/utils/cell-size';

describe('cellsize should always return a percent value', () => {
  it('should return the same percent as given', () => {
    expect(CellSize('100%')).toEqual('100%');
  });
  it('should return percent value if number is given under 1', () => {
    expect(CellSize('0.1')).toEqual('10%');
  });
  it('should return percent value divided the gutter number if number is given about 1', () => {
    expect(CellSize(12)).toEqual('100%');
  });
});
