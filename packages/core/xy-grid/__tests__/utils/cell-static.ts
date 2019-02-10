import { GrowCss } from '@growcss/theme';
import { CellStatic } from '../../src/utils/cell-static';

test('cellStatic should return a 100% size withdrawn the margin width and margin values', () => {
  expect(CellStatic(GrowCss.grid.marginGutters)).toEqual([
    'width: calc(100% - 1.25rem);',
    'margin-left: 0.625rem;margin-right: 0.625rem;',
  ]);
  expect(
    CellStatic(GrowCss.grid.marginGutters, 'full', false, 'margin', 'small', true),
  ).toEqual(['height: calc(100% - 1.25rem);']);
});

test('cellStatic should return a auto width and margin values on shrink and auto', () => {
  expect(CellStatic(GrowCss.grid.marginGutters, 'auto')).toEqual([
    'width: auto;',
    'margin-left: 0.625rem;margin-right: 0.625rem;',
  ]);
  expect(
    CellStatic(GrowCss.grid.marginGutters, 'auto', true, 'margin', 'small', true),
  ).toEqual(['height: auto;', 'margin-top: 0.625rem;margin-bottom: 0.625rem;']);
  expect(CellStatic(GrowCss.grid.marginGutters, 'shrink')).toEqual([
    'width: auto;',
    'margin-left: 0.625rem;margin-right: 0.625rem;',
  ]);
  expect(
    CellStatic(GrowCss.grid.marginGutters, 'shrink', true, 'margin', 'small', true),
  ).toEqual(['height: auto;', 'margin-top: 0.625rem;margin-bottom: 0.625rem;']);
});

test('cellStatic can disable outputGutter output', () => {
  expect(CellStatic(GrowCss.grid.marginGutters, 'full', false)).toEqual([
    'width: calc(100% - 1.25rem);',
  ]);
  expect(
    CellStatic(GrowCss.grid.marginGutters, 'full', false, 'margin', 'small', true),
  ).toEqual(['height: calc(100% - 1.25rem);']);
});

test('cellStatic can get a number as gutter size', () => {
  expect(CellStatic(16, 1, false)).toEqual(['width: calc(8.333333333333334% - 1rem);']);
  expect(CellStatic(16, 1, false, 'margin', 'small', true)).toEqual([
    'height: calc(8.333333333333334% - 1rem);',
  ]);
});

test('cellStatic gutter size get ignored if gutterType is padding', () => {
  expect(CellStatic(16, 1, false, 'padding')).toEqual(['width: 8.333333333333334%;']);
  expect(CellStatic(16, 1, false, 'padding', 'small', true)).toEqual([
    'height: 8.333333333333334%;',
  ]);
});

test('cellStatic throws a error if breakpoint is not found', () => {
  expect(() => {
    return CellStatic(GrowCss.grid.marginGutters, 16, false, 'margin', 'xlarge');
  }).toThrow();
});
