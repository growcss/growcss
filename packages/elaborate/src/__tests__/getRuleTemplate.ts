import GetRuleTemplate from './../components/mediaquery/_getRuleTemplate';

describe('Breakpoint (Named Default/Up Range)', () => {
  it('Converts a named breakpoint to an em value', () => {
    expect(GetRuleTemplate('medium')).toBe('(min-width: 40em)');
  });
});

describe('Breakpoint (Named Only Range)', () => {
  it('Creates a min/max-width range out of a named breakpoint', () => {
    expect(GetRuleTemplate('medium only')).toBe(
      '(min-width: 40em) and (max-width: 63.9375em)',
    );
  });

  it('Creates a max-width range if the breakpoint is the lowest', () => {
    expect(GetRuleTemplate('small only')).toBe('(max-width: 39.9375em)');
  });

  it('Creates a min-width range if the breakpoint is the highest', () => {
    expect(GetRuleTemplate('xxlarge only')).toBe('(min-width: 90em)');
  });
});

describe('Breakpoint (Named Down Range)', () => {
  it('Creates a down range out of a medium breakpoint', () => {
    expect(GetRuleTemplate('medium down')).toBe('(max-width: 63.9375em)');
  });

  it('Creates a down range out of a small breakpoint', () => {
    expect(GetRuleTemplate('small down')).toBe('(max-width: 39.9375em)');
  });

  it('Skips media query creation for xxlarge down', () => {
    expect(GetRuleTemplate('xxlarge down')).toBe('');
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
    expect(GetRuleTemplate('retina')).toBe(
      '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
    );
  });
});

describe('Breakpoint (HIDPI Default/Up Range)', () => {
  const expect15 = 'only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min--moz-device-pixel-ratio: 1.5), only screen and (-o-min-device-pixel-ratio: 1.5/1), only screen and (min-resolution: 144dpi)';

  it('Creates a x1.5 HiDPI up range out of a x1.5 HiDPI breakpoint', () => {
    expect(GetRuleTemplate('hidpi-1-5 up')).toBe(expect15);
  });

  it('Creates a x1.5 HiDPI up range out of a x1.5 HiDPI breakpoint', () => {
    expect(GetRuleTemplate('hidpi-1-5')).toBe(expect15);
  });

  const expect2 = 'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-resolution: 192dpi)';

  it('Creates a x1.5 HiDPI up range out of a x2 HiDPI breakpoint', () => {
    expect(GetRuleTemplate('hidpi-2')).toBe(expect2);
  });

  it('Creates a x1.5 HiDPI up range out of a x2 HiDPI breakpoint', () => {
    expect(GetRuleTemplate('hidpi-2 up')).toBe(expect2);
  });
});

describe('Breakpoint (HIDPI Only Range)', () => {
  it('Creates a x1.5 HiDPI only range out of a x1.5 HiDPI breakpoint', () => {
    expect(GetRuleTemplate('hidpi-1-5 only')).toBe(
      '(-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 1.98958), (min-resolution: 144dpi) and (max-resolution: 191dpi)',
    );
  });

  it('Creates a x2 HiDPI only range out of a x2 HiDPI breakpoint', () => {
    expect(GetRuleTemplate('hidpi-2 only')).toBe(
      '(-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.98958), (min-resolution: 192dpi) and (max-resolution: 287dpi)',
    );
  });

  it('Creates an up range if the HiDPI breakpoint is the highest', () => {
    expect(GetRuleTemplate('hidpi-3 only')).toBe(
      '(-webkit-min-device-pixel-ratio: 3), (min-resolution: 288dpi)',
    );
  });
});

describe('Breakpoint (HIDPI Only Range)', () => {
  it('Creates a x1.5 HiDPI down range out of a x1.5 HiDPI breakpoint', () => {
    expect(GetRuleTemplate('hidpi-1-5 down')).toBe(
      '(-webkit-max-device-pixel-ratio: 1.98958), (max-resolution: 191dpi)',
    );
  });

  it('Creates a x2 HiDPI down range out of a x2 HiDPI breakpoint', () => {
    expect(GetRuleTemplate('hidpi-2 down')).toBe(
      '(-webkit-max-device-pixel-ratio: 2.98958), (max-resolution: 287dpi)',
    );
  });

  it('Skips media query creation for highest HiDPI breakpoint down', () => {
    expect(GetRuleTemplate('hidpi-3 down')).toBe('');
  });
});

describe('Breakpoint (Value Default/Up Range)', () => {
  const expectedString = '(min-width: 1em)';

  it('Converts a pixel breakpoint to em', () => {
    expect(GetRuleTemplate('16px')).toBe(expectedString);
  });

  it('Converts a rem breakpoint to em', () => {
    expect(GetRuleTemplate('1rem')).toBe(expectedString);
  });

  it('Converts a em breakpoint to em', () => {
    expect(GetRuleTemplate('1em')).toBe(expectedString);
  });
});

describe('Breakpoint (Value Down Range)', () => {
  const expectedString = '(max-width: 1em)';

  it('Creates a down range out of a pixel value', () => {
    expect(GetRuleTemplate('16px down')).toBe(expectedString);
  });

  it('Creates a down range out of a rem value', () => {
    expect(GetRuleTemplate('1rem down')).toBe(expectedString);
  });

  it('Creates a down range out of an em value', () => {
    expect(GetRuleTemplate('1em down')).toBe(expectedString);
  });
});

describe('Breakpoint (Orientation)', () => {
  it('Creates special media query for landscape', () => {
    expect(GetRuleTemplate('landscape')).toBe('(orientation: landscape)');
  });

  it('Creates special media query for portrait', () => {
    expect(GetRuleTemplate('portrait')).toBe('(orientation: portrait)');
  });
});

describe('Breakpoint (Empty String)', () => {
  it('Returns an empty string for the value small up', () => {
    expect(GetRuleTemplate('small up')).toBe('');
  });

  it('Returns an empty string for the value 0 down', () => {
    expect(GetRuleTemplate('0 down')).toBe('');
  });

  it('Returns an empty string for the value 0 up', () => {
    expect(GetRuleTemplate('0 up')).toBe('');
  });
});

describe('Breakpoint (Unknown Value)', () => {
  it('Returns an empty string for non-existant media queries', () => {
    expect(GetRuleTemplate('xxxxlarge')).toBe('');
  });
});
