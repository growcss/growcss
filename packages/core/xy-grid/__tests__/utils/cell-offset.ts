import { GrowCss } from '@growcss/theme';
import { CellOffset } from '../../src/utils/cell-offset';

test('calculate the cell offset', () => {
  expect(CellOffset(1, 'small', GrowCss.grid.marginGutters)).toEqual([
    'margin-left: calc(8.333333333333334% + 0.625rem);',
  ]);
  expect(CellOffset(2, 'large', GrowCss.grid.marginGutters)).toEqual([
    '@media ',
    'only screen and (min-width: 64em)',
    '{',
    'margin-left: calc(16.666666666666668% + 0.9375rem);',
    '}',
  ]);

  expect(CellOffset(1, 'small', GrowCss.grid.paddingGutters, 'padding')).toEqual([
    'margin-left: 8.333333333333334%;',
  ]);
  expect(CellOffset(2, 'large', GrowCss.grid.paddingGutters, 'padding')).toEqual([
    '@media ',
    'only screen and (min-width: 64em)',
    '{',
    'margin-left: 16.666666666666668%;',
    '}',
  ]);
});

test('calculate the cell offset for vertical', () => {
  expect(CellOffset(1, 'small', GrowCss.grid.marginGutters, 'margin', true)).toEqual([
    'margin-top: calc(8.333333333333334% + 0.625rem);',
  ]);
  expect(CellOffset(2, 'large', GrowCss.grid.marginGutters, 'margin', true)).toEqual([
    '@media ',
    'only screen and (min-width: 64em)',
    '{',
    'margin-top: calc(16.666666666666668% + 0.9375rem);',
    '}',
  ]);

  expect(CellOffset(1, 'small', GrowCss.grid.paddingGutters, 'padding', true)).toEqual([
    'margin-top: 8.333333333333334%;',
  ]);
  expect(CellOffset(2, 'large', GrowCss.grid.paddingGutters, 'padding', true)).toEqual([
    '@media ',
    'only screen and (min-width: 64em)',
    '{',
    'margin-top: 16.666666666666668%;',
    '}',
  ]);
});

test('calculate the cell offset for rtl', () => {
  expect(
    CellOffset(1, 'small', GrowCss.grid.marginGutters, 'margin', false, true),
  ).toEqual(['margin-right: calc(8.333333333333334% + 0.625rem);']);
  expect(
    CellOffset(2, 'large', GrowCss.grid.marginGutters, 'margin', false, true),
  ).toEqual([
    '@media ',
    'only screen and (min-width: 64em)',
    '{',
    'margin-right: calc(16.666666666666668% + 0.9375rem);',
    '}',
  ]);

  expect(
    CellOffset(1, 'small', GrowCss.grid.paddingGutters, 'padding', false, true),
  ).toEqual(['margin-right: 8.333333333333334%;']);
  expect(
    CellOffset(2, 'large', GrowCss.grid.paddingGutters, 'padding', false, true),
  ).toEqual([
    '@media ',
    'only screen and (min-width: 64em)',
    '{',
    'margin-right: 16.666666666666668%;',
    '}',
  ]);
});
