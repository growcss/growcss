import { getThemeValue } from '../src';

test('string argument', () => {
  expect(getThemeValue('color')({ theme: {} })).toBeUndefined();
  expect(getThemeValue('color')({ theme: { color: 'red' } })).toBe('red');
});

test('deep string argument', () => {
  expect(getThemeValue('color.primary')({ theme: { color: {} } })).toBeUndefined();
  expect(getThemeValue('color.primary')({ theme: { color: { primary: 'red' } } })).toBe(
    'red',
  );
});

test('defaultValue', () => {
  expect(getThemeValue('color', 'red')({ theme: { color: 'blue' } })).toBe('blue');
  expect(getThemeValue('color.primary', 'red')({ theme: { color: {} } })).toBe('red');
});
