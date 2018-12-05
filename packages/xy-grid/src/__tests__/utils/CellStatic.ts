import { CellStatic } from '../../utils/CellStatic';
import { Gutters } from '../../components/Gutters';

test('cellStatic should return a 100% size withdrawn the margin width and margin values', () => {
  expect(CellStatic()).toEqual([
    'width: calc(100% - 1.25rem);',
    'margin-left: 0.625rem;margin-right: 0.625rem;',
  ]);
  expect(CellStatic('full', false, Gutters, 'margin', 'small', true)).toEqual([
    'height: calc(100% - 1.25rem);',
  ]);
});

test('cellStatic should return a auto width and margin values on shrink and auto', () => {
  expect(CellStatic('auto')).toEqual([
    'width: auto;',
    'margin-left: 0.625rem;margin-right: 0.625rem;',
  ]);
  expect(CellStatic('auto', true, Gutters, 'margin', 'small', true)).toEqual([
    'height: auto;',
    'margin-top: 0.625rem;margin-bottom: 0.625rem;',
  ]);
  expect(CellStatic('shrink')).toEqual([
    'width: auto;',
    'margin-left: 0.625rem;margin-right: 0.625rem;',
  ]);
  expect(CellStatic('shrink', true, Gutters, 'margin', 'small', true)).toEqual([
    'height: auto;',
    'margin-top: 0.625rem;margin-bottom: 0.625rem;',
  ]);
});

test('cellStatic can disable outputGutter output', () => {
  expect(CellStatic('full', false)).toEqual(['width: calc(100% - 1.25rem);']);
  expect(CellStatic('full', false, Gutters, 'margin', 'small', true)).toEqual([
    'height: calc(100% - 1.25rem);',
  ]);
});

test('cellStatic can get a number as gutter size', () => {
  expect(CellStatic(1, false, 16)).toEqual([
    'width: calc(8.333333333333334% - 1rem);',
  ]);
  expect(CellStatic(1, false, 16, 'margin', 'small', true)).toEqual([
    'height: calc(8.333333333333334% - 1rem);',
  ]);
});

test('cellStatic gutter size get ignored if gutterType is padding', () => {
  expect(CellStatic(1, false, 16, 'padding')).toEqual([
    'width: 8.333333333333334%;',
  ]);
  expect(CellStatic(1, false, 16, 'padding', 'small', true)).toEqual([
    'height: 8.333333333333334%;',
  ]);
});

test('cellStatic throws a error if breakpoint is not found', () => {
  expect(() => {
    return CellStatic(16, false, Gutters, 'margin', 'xlarge');
  }).toThrow();
});
