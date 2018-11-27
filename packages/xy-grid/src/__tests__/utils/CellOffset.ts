import { CellOffset } from '../../utils/CellOffset';

test('calculate the cell offset', () => {
  expect(CellOffset(1, 'small')).toEqual([
    'margin-left: calc(8.333333333333334% + 0.625rem);',
  ]);
  expect(CellOffset(2, 'large')).toEqual([
    '@media ',
    '(min-width: 64em)',
    ' { ',
    'margin-left: calc(16.666666666666668% + 0.9375rem);',
    ' }',
  ]);

  expect(CellOffset(1, 'small', 'padding')).toEqual([
    'margin-left: 8.333333333333334%;',
  ]);
  expect(CellOffset(2, 'large', 'padding')).toEqual([
    '@media ',
    '(min-width: 64em)',
    ' { ',
    'margin-left: 16.666666666666668%;',
    ' }',
  ]);
});

test('calculate the cell offset for vertical', () => {
  expect(CellOffset(1, 'small', 'margin', true)).toEqual([
    'margin-top: calc(8.333333333333334% + 0.625rem);',
  ]);
  expect(CellOffset(2, 'large', 'margin', true)).toEqual([
    '@media ',
    '(min-width: 64em)',
    ' { ',
    'margin-top: calc(16.666666666666668% + 0.9375rem);',
    ' }',
  ]);

  expect(CellOffset(1, 'small', 'padding', true)).toEqual([
    'margin-top: 8.333333333333334%;',
  ]);
  expect(CellOffset(2, 'large', 'padding', true)).toEqual([
    '@media ',
    '(min-width: 64em)',
    ' { ',
    'margin-top: 16.666666666666668%;',
    ' }',
  ]);
});

test('calculate the cell offset for rtl', () => {
  expect(CellOffset(1, 'small', 'margin', false, true)).toEqual([
    'margin-right: calc(8.333333333333334% + 0.625rem);',
  ]);
  expect(CellOffset(2, 'large', 'margin', false, true)).toEqual([
    '@media ',
    '(min-width: 64em)',
    ' { ',
    'margin-right: calc(16.666666666666668% + 0.9375rem);',
    ' }',
  ]);

  expect(CellOffset(1, 'small', 'padding', false, true)).toEqual([
    'margin-right: 8.333333333333334%;',
  ]);
  expect(CellOffset(2, 'large', 'padding', false, true)).toEqual([
    '@media ',
    '(min-width: 64em)',
    ' { ',
    'margin-right: 16.666666666666668%;',
    ' }',
  ]);
});
