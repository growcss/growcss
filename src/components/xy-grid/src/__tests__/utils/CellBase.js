// @flow
import { CellBase } from '../../utils/CellBase';

describe('Return the base style of a cell', () => {
  it('Return the full style of a cell', () => {
    expect(CellBase()).toEqual('min-height: 0px;min-width: 0px;flex: 0 0 auto;');
  });
  it('Return the auto style of a cell', () => {
    expect(CellBase('auto')).toEqual('min-height: 0px;min-width: 0px;flex: 1 1 0px;');
  });
  it('Return the shrink style of a cell', () => {
    expect(CellBase('shrink')).toEqual('min-height: 0px;min-width: 0px;flex: 0 0 auto;');
  });
  it('Return the shrink style of a cell', () => {
    expect(CellBase('grow')).toEqual('min-height: 0px;min-width: 0px;flex: 1 0 auto;');
  });
});
