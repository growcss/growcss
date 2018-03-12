// @flow

import { CellElementAlign, GridElementAlign } from '../../utils/FlexAlign';

test('GridElementAlign should return the right horizontal alignment css', () => {
  expect(GridElementAlign('left')).toEqual('justify-content:flex-start;');
  expect(GridElementAlign('right')).toEqual('justify-content:flex-end;');
  expect(GridElementAlign('center')).toEqual('justify-content:center;');
  expect(GridElementAlign('justify')).toEqual('justify-content:space-between;');
  expect(GridElementAlign('spaced')).toEqual('justify-content:space-around;');
});

test('GridElementAlign should return the right vertical alignment css', () => {
  expect(GridElementAlign(null, 'top')).toEqual('align-items:flex-start;');
  expect(GridElementAlign(null, 'bottom')).toEqual('align-items:flex-end;');
  expect(GridElementAlign(null, 'middle')).toEqual('align-items:center;');
  expect(GridElementAlign(null, 'stretch')).toEqual('align-items:stretch;');
});

test('GridElementAlign should throw a error if horizontal alignment dont exists', () => {
  expect(() => {
    return GridElementAlign('test');
  }).toThrow();
});

test('GridElementAlign should throw a error if vertical alignment dont exists', () => {
  expect(() => {
    return GridElementAlign(null, 'test');
  }).toThrow();
});

test('CellElementAlign should throw a error if vertical alignment dont exists', () => {
  expect(() => {
    return CellElementAlign('test');
  }).toThrow();
});

test('CellElementAlign should return the right vertical alignment css', () => {
  expect(CellElementAlign('top')).toEqual('align-self:flex-start;');
  expect(CellElementAlign('bottom')).toEqual('align-self:flex-end;');
  expect(CellElementAlign('middle')).toEqual('align-self:center;');
  expect(CellElementAlign('stretch')).toEqual('align-self:stretch;');
});
