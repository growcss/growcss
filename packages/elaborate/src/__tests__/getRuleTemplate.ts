import GetRuleTemplate, {allowedTypes} from './../components/mediaquery/_getRuleTemplate';
import {MediaQueryOptions} from './../components/mediaquery/mediaQuery';

describe('Media query allowed types', () => {
  it('allowed types', () => {
    allowedTypes.forEach(function (value) {
      expect(GetRuleTemplate(value, MediaQueryOptions)).toBe(value);
      expect(GetRuleTemplate(`not ${value}`, MediaQueryOptions)).toBe(`not ${value}`);
    })
  });
});

describe('Level 3 Media query types', () => {
  it('css3 media queries', () => {
    expect(GetRuleTemplate('all', MediaQueryOptions)).toBe('all');
    expect(GetRuleTemplate('all and (min-width:500px)', MediaQueryOptions)).toBe('all and (min-width:500px)');
    expect(GetRuleTemplate('(min-width:500px)', MediaQueryOptions)).toBe('(min-width:500px)');
    expect(GetRuleTemplate('all and (orientation:portrait)', MediaQueryOptions)).toBe('all and (orientation:portrait)');
    expect(GetRuleTemplate('screen and (device-aspect-ratio: 16/9)', MediaQueryOptions)).toBe('screen and (device-aspect-ratio: 16/9)');
    expect(GetRuleTemplate('screen and (color), projection and (color)', MediaQueryOptions)).toBe('screen and (color), projection and (color)');
    expect(GetRuleTemplate('all and (min-color: 1)', MediaQueryOptions)).toBe('all and (min-color: 1)');
    expect(GetRuleTemplate('all and (color-index)', MediaQueryOptions)).toBe('all and (color-index)');
    expect(GetRuleTemplate('all and (min-color-index: 1)', MediaQueryOptions)).toBe('all and (min-color-index: 1)');
    expect(GetRuleTemplate('all and (monochrome)', MediaQueryOptions)).toBe('all and (monochrome)');
    expect(GetRuleTemplate('all and (min-monochrome: 1)', MediaQueryOptions)).toBe('all and (min-monochrome: 1)');
    expect(GetRuleTemplate('print and (min-resolution: 300dpi)', MediaQueryOptions)).toBe('print and (min-resolution: 300dpi)');
    expect(GetRuleTemplate('tv and (scan: progressive)', MediaQueryOptions)).toBe('tv and (scan: progressive)');
    expect(GetRuleTemplate('handheld and (grid) and (max-width: 15em)', MediaQueryOptions)).toBe('handheld and (grid) and (max-width: 15em)');
    expect(GetRuleTemplate('handheld and (grid) and (device-max-height: 7em)', MediaQueryOptions)).toBe('handheld and (grid) and (device-max-height: 7em)');
    expect(GetRuleTemplate('screen and (min-width: 400px) and (max-width: 700px)', MediaQueryOptions)).toBe('screen and (min-width: 400px) and (max-width: 700px)');
    expect(GetRuleTemplate('handheld and (min-width: 20em), screen and (min-width: 20em)', MediaQueryOptions)).toBe('handheld and (min-width: 20em), screen and (min-width: 20em)');
  });

  it('not allowed css3 media queries', () => {
    expect(GetRuleTemplate('(min-width: -100px)', MediaQueryOptions)).toThrowError('Negative lengths are not allowed for the ‘width’ media feature');
    expect(GetRuleTemplate('all and(color)', MediaQueryOptions)).toThrowError('Having no space between "and" and the expression is not allowed');
    expect(GetRuleTemplate('(min-resolution: 118d)', MediaQueryOptions)).toThrowError('The resolution value must be followed by a unit identifier ("dpi" or "dpcm").');
  });
});


describe('Level 4 Media query features', () => {
  it('Media features with a “range” type', () => {
    expect(GetRuleTemplate('(height > 600px)', MediaQueryOptions)).toBe('(height > 600px)');
    expect(GetRuleTemplate('(600px < height)', MediaQueryOptions)).toBe('(600px < height)');
    expect(GetRuleTemplate('(400px < width < 1000px)', MediaQueryOptions)).toBe('(400px < width < 1000px)');
    expect(GetRuleTemplate('not (width <= -100px)', MediaQueryOptions)).toBe('not (width <= -100px)');
  });
});

describe('Breakpoint (Named Default/Up Range)', () => {
  it('Converts a named breakpoint to an em value', () => {
    expect(GetRuleTemplate('medium', MediaQueryOptions)).toBe('only screen and (min-width: 40em)');
  });
});

describe('Breakpoint (Named Only Range)', () => {
  it('Creates a min/max-width range out of a named breakpoint', () => {
    expect(GetRuleTemplate('medium only', MediaQueryOptions)).toBe(
      'only screen and (min-width: 40em) and (max-width: 63.9375em)',
    );
  });

  it('Creates a max-width range if the breakpoint is the lowest', () => {
    expect(GetRuleTemplate('small only', MediaQueryOptions)).toBe('only screen and (max-width: 39.9375em)');
  });

  it('Creates a min-width range if the breakpoint is the highest', () => {
    expect(GetRuleTemplate('xxlarge only', MediaQueryOptions)).toBe('only screen and (min-width: 90em)');
  });
});

describe('Breakpoint (Named Down Range)', () => {
  it('Creates a down range out of a medium breakpoint', () => {
    expect(GetRuleTemplate('medium down', MediaQueryOptions)).toBe('only screen and (max-width: 63.9375em)');
  });

  it('Creates a down range out of a small breakpoint', () => {
    expect(GetRuleTemplate('small down', MediaQueryOptions)).toBe('only screen and (max-width: 39.9375em)');
  });

  it('Skips media query creation for xxlarge down', () => {
    expect(GetRuleTemplate('xxlarge down', MediaQueryOptions)).toBe('');
  });
});

/**
 * Note for the following "magic numbers":
 *
 * We expect maximum values to have 1 dot less (dot it is the most precise web unit we have there).
 * But sinces values are not in pixels, we have to calculate what 1px is in these units.
 * See https://www.w3.org/TR/css-values-3/#absolute-lengths
 *
 * For a x2 resolution (device pixels per web pixels - or Dots Per PiXel)
 * 2dppx - 1 dot
 * = 2 - (1 / 96)
 * = 1.98958(...)dppx
 *
 * For a x3 resolution
 * 3dppx - 1 dot
 * = 3 - (1 / 96)
 * = 2.98958(...)dppx
 *
 * etc...
 */
describe('Breakpoint (Retina)', () => {
  it('Creates a x2 HiDPI range out of the retina alias breakpoint', () => {
    expect(GetRuleTemplate('retina', MediaQueryOptions)).toBe(
      'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi)',
    );
  });
});

describe('Breakpoint (HIDPI Default/Up Range)', () => {
  const expect15 = 'only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min--moz-device-pixel-ratio: 1.5), only screen and (-o-min-device-pixel-ratio: 3/2), only screen and (min-resolution: 144dpi)';

  it('Creates a x1.5 HiDPI up range out of a x1.5 HiDPI breakpoint', () => {
    expect(GetRuleTemplate('hidpi-1-5 up', MediaQueryOptions)).toBe(expect15);
  });

  it('Creates a x1.5 HiDPI up range out of a x1.5 HiDPI breakpoint', () => {
    expect(GetRuleTemplate('hidpi-1-5', MediaQueryOptions)).toBe(expect15);
  });

  const expect2 = 'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 4/2), only screen and (min-resolution: 192dpi)';

  it('Creates a x1.5 HiDPI up range out of a x2 HiDPI breakpoint', () => {
    expect(GetRuleTemplate('hidpi-2', MediaQueryOptions)).toBe(expect2);
  });

  it('Creates a x1.5 HiDPI up range out of a x2 HiDPI breakpoint', () => {
    expect(GetRuleTemplate('hidpi-2 up', MediaQueryOptions)).toBe(expect2);
  });
});

describe('Breakpoint (HIDPI Only Range)', () => {
  it('Creates a x1.5 HiDPI only range out of a x1.5 HiDPI breakpoint', () => {
    expect(GetRuleTemplate('hidpi-1-5 only', MediaQueryOptions)).toBe(
      'only screen and (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 1.98958), only screen and (min--moz-device-pixel-ratio: 1.5) and (max--moz-device-pixel-ratio: 1.98958), only screen and (-o-min-device-pixel-ratio: 3/2) and (-o-max-device-pixel-ratio: 3.97916/2), only screen and (min-resolution: 144dpi) and (max-resolution: 191dpi)',
    );
  });

  it('Creates a x2 HiDPI only range out of a x2 HiDPI breakpoint', () => {
    expect(GetRuleTemplate('hidpi-2 only', MediaQueryOptions)).toBe(
      'only screen and (-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.98958), only screen and (min--moz-device-pixel-ratio: 2) and (max--moz-device-pixel-ratio: 2.98958), only screen and (-o-min-device-pixel-ratio: 4/2) and (-o-max-device-pixel-ratio: 5.97916/2), only screen and (min-resolution: 192dpi) and (max-resolution: 287dpi)',
    );
  });

  it('Creates an up range if the HiDPI breakpoint is the highest', () => {
    expect(GetRuleTemplate('hidpi-3 only', MediaQueryOptions)).toBe(
      'only screen and (-webkit-min-device-pixel-ratio: 3), only screen and (min--moz-device-pixel-ratio: 3), only screen and (-o-min-device-pixel-ratio: 6/2), only screen and (min-resolution: 288dpi)',
    );
  });
});

describe('Breakpoint (HIDPI Only Range)', () => {
  it('Creates a x1.5 HiDPI down range out of a x1.5 HiDPI breakpoint', () => {
    expect(GetRuleTemplate('hidpi-1-5 down', MediaQueryOptions)).toBe(
      'only screen and (-webkit-max-device-pixel-ratio: 1.98958), only screen and (max--moz-device-pixel-ratio: 1.98958), only screen and (-o-max-device-pixel-ratio: 3.97916/2), only screen and (max-resolution: 191dpi)',
    );
  });

  it('Creates a x2 HiDPI down range out of a x2 HiDPI breakpoint', () => {
    expect(GetRuleTemplate('hidpi-2 down', MediaQueryOptions)).toBe(
      'only screen and (-webkit-max-device-pixel-ratio: 2.98958), only screen and (max--moz-device-pixel-ratio: 2.98958), only screen and (-o-max-device-pixel-ratio: 5.97916/2), only screen and (max-resolution: 287dpi)',
    );
  });

  it('Skips media query creation for highest HiDPI breakpoint down', () => {
    expect(GetRuleTemplate('hidpi-3 down', MediaQueryOptions)).toBe('');
  });
});

describe('Breakpoint (Value Default/Up Range)', () => {
  const expectedString = 'only screen and (min-width: 1em)';

  it('Converts a pixel breakpoint to em', () => {
    expect(GetRuleTemplate('16px', MediaQueryOptions)).toBe(expectedString);
  });

  it('Converts a rem breakpoint to em', () => {
    expect(GetRuleTemplate('1rem', MediaQueryOptions)).toBe(expectedString);
  });

  it('Converts a em breakpoint to em', () => {
    expect(GetRuleTemplate('1em', MediaQueryOptions)).toBe(expectedString);
  });
});

describe('Breakpoint (Value Down Range)', () => {
  const expectedString = 'only screen and (max-width: 1em)';

  it('Creates a down range out of a pixel value', () => {
    expect(GetRuleTemplate('16px down', MediaQueryOptions)).toBe(expectedString);
  });

  it('Creates a down range out of a rem value', () => {
    expect(GetRuleTemplate('1rem down', MediaQueryOptions)).toBe(expectedString);
  });

  it('Creates a down range out of an em value', () => {
    expect(GetRuleTemplate('1em down', MediaQueryOptions)).toBe(expectedString);
  });
});

describe('Breakpoint (Orientation)', () => {
  it('Creates special media query for landscape', () => {
    expect(GetRuleTemplate('landscape', MediaQueryOptions)).toBe('(orientation: landscape)');
  });

  it('Creates special media query for portrait', () => {
    expect(GetRuleTemplate('portrait', MediaQueryOptions)).toBe('(orientation: portrait)');
  });
});

describe('Breakpoint (Empty String)', () => {
  it('Returns an empty string for the value small up', () => {
    expect(GetRuleTemplate('small up', MediaQueryOptions)).toBe('');
  });

  it('Returns an empty string for the value 0 down', () => {
    expect(GetRuleTemplate('0 down', MediaQueryOptions)).toBe('');
  });

  it('Returns an empty string for the value 0 up', () => {
    expect(GetRuleTemplate('0 up', MediaQueryOptions)).toBe('');
  });
});

describe('Breakpoint (Unknown Value)', () => {
  it('Returns an empty string for non-existant media queries', () => {
    expect(GetRuleTemplate('xxxxlarge', MediaQueryOptions)).toBe('');
  });
});
