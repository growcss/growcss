import { getThemeValue } from '../src/utils/get-theme-value';

test('string argument', () => {
  expect(getThemeValue('color')({  })).toBeUndefined();
  expect(getThemeValue('color')({ color: 'red' })).toBe('red');
});

test('deep string argument', () => {
  expect(getThemeValue('color.primary')({ color: {} })).toBeUndefined();
  expect(getThemeValue('color.primary')({ color: { primary: 'red' } })).toBe(
    'red',
  );
});

test('defaultValue', () => {
  expect(getThemeValue('color', 'red')({ color: 'blue' })).toBe('blue');
  expect(getThemeValue('color.primary', 'red')({ color: {} })).toBe('red');
});
