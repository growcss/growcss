import { createMediaQueryOptions } from '../src/utils/create-mediaquery-options';
import { GrowCss } from '../src';

test('string argument', () => {
  const theme = GrowCss;
  const createdObject = createMediaQueryOptions(theme);

  expect(createdObject.printBreakpoint).toBe(theme.global.breakpoint.print);
  expect(createdObject.breakpoints).toBe(theme.global.breakpoints);
  expect(createdObject.hidpiBreakpoints).toBe(theme.global.hidpiBreakpoints);
  expect(createdObject.stdWebDpi).toBe(theme.global.stdWebDpi);
});
