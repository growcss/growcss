import MediaQueryTemplate from '../components/mediaquery/_media-query-template';
import {MediaQueryOptions} from '../components/mediaquery/media-query';

const template = new MediaQueryTemplate(MediaQueryOptions);

describe('Media query allowed types', () => {
  it('allowed types', () => {
    MediaQueryTemplate.allowedTypes.forEach(function (value) {
      expect(template.render(value)).toBe(value);
      expect(template.render(`not ${value}`)).toBe(`not ${value}`);
    })
  });
});

describe('Level 3 Media query types', () => {
  it('css3 media queries', () => {
    expect(template.render('all')).toBe('all');
    expect(template.render('only all')).toBe('only all');
    expect(template.render('all and (min-width:500px)')).toBe('all and (min-width: 31.25em)');
    expect(template.render('(min-width:500px)')).toBe('(min-width: 31.25em)');
    expect(template.render('all and (orientation:portrait)')).toBe('all and (orientation:portrait)');
    expect(template.render('screen and (device-aspect-ratio: 16/9)')).toBe('screen and (device-aspect-ratio: 16/9)');
    expect(template.render('screen and (color), projection and (color)')).toBe('screen and (color), projection and (color)');
    expect(template.render('all and (min-color: 1)')).toBe('all and (min-color: 1)');
    expect(template.render('all and (color-index)')).toBe('all and (color-index)');
    expect(template.render('all and (min-color-index: 1)')).toBe('all and (min-color-index: 1)');
    expect(template.render('all and (monochrome)')).toBe('all and (monochrome)');
    expect(template.render('all and (min-monochrome: 1)')).toBe('all and (min-monochrome: 1)');
    expect(template.render('print and (min-resolution: 300dpi)')).toBe('print and (min-resolution: 300dpi)');
    expect(template.render('tv and (scan: progressive)')).toBe('tv and (scan: progressive)');
    expect(template.render('handheld and (grid) and (max-width: 15em)')).toBe('handheld and (grid) and (max-width: 15em)');
    expect(template.render('handheld and (grid) and (device-max-height: 7em)')).toBe('handheld and (grid) and (device-max-height: 7em)');
    expect(template.render('screen and (min-width: 400px) and (max-width: 700px)')).toBe('screen and (min-width: 25em) and (max-width: 43.75em)');
    expect(template.render('handheld and (min-width: 20em), screen and (min-width: 20em)')).toBe('handheld and (min-width: 20em), screen and (min-width: 20em)');
  });

  const negativeTemplate = new MediaQueryTemplate({...MediaQueryOptions, ...{breakpoints: {small: 100, medium: -100}}});

  it('not allowed css3 media queries', () => {
    expect(() => {
      negativeTemplate.render('medium');
    }).toThrowError(new Error('Negative lengths "-100" are not allowed for the "width" or "height" media feature.'));

    expect(() => {
      negativeTemplate.render('(min-width: -100px)');
    }).toThrowError(new Error('Negative lengths "-100px" are not allowed for the "width", "height" or "color" media feature.'));

    expect(() => {
      negativeTemplate.render('all and(color)');
    }).toThrowError(new Error('Having no space between "and" and the expression is not allowed.'));

    expect(() => {
      negativeTemplate.render('(min-resolution: 118d)');
    }).toThrowError(new Error('The resolution value must be followed by a unit identifier ("dpi", "dpcm" or "dppx").'));
  });
});

describe('Breakpoint (Named Default/Up Range)', () => {
  it('Converts a named breakpoint to an em value', () => {
    expect(template.render('medium')).toBe('only screen and (min-width: 40em)');
  });
});

describe('Breakpoint (Named Only Range)', () => {
  it('Creates a min/max-width range out of a named breakpoint', () => {
    expect(template.render('medium only')).toBe(
      'only screen and (min-width: 40em) and (max-width: 63.9375em)',
    );
  });

  it('Creates a max-width range if the breakpoint is the lowest', () => {
    expect(template.render('small only')).toBe('only screen and (max-width: 39.9375em)');
  });

  it('Creates a min-width range if the breakpoint is the highest', () => {
    expect(template.render('xxlarge only')).toBe('only screen and (min-width: 90em)');
  });
});

describe('Breakpoint (Named Down Range)', () => {
  it('Creates a down range out of a medium breakpoint', () => {
    expect(template.render('medium down')).toBe('only screen and (max-width: 63.9375em)');
  });

  it('Creates a down range out of a small breakpoint', () => {
    expect(template.render('small down')).toBe('only screen and (max-width: 39.9375em)');
  });

  it('Skips media query creation for xxlarge down', () => {
    expect(template.render('xxlarge down')).toBe('');
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
    expect(template.render('retina')).toBe(
      'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi)',
    );
  });
});

describe('Breakpoint (HIDPI Default/Up Range)', () => {
  it('Creates a x1 HiDPI up range out of a x1 HiDPI breakpoint', () => {
    expect(template.render('hidpi-1')).toBe('only screen and (-webkit-min-device-pixel-ratio: 1), only screen and (min--moz-device-pixel-ratio: 1), only screen and (min-resolution: 96dpi), only screen and (min-resolution: 1dppx)');
  });

  const expect15 = 'only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min--moz-device-pixel-ratio: 1.5), only screen and (-o-min-device-pixel-ratio: 3/2), only screen and (min-resolution: 144dpi), only screen and (min-resolution: 1.5dppx)';

  it('Creates a x1.5 HiDPI up range out of a x1.5 HiDPI breakpoint', () => {
    expect(template.render('hidpi-1-5 up')).toBe(expect15);
  });

  it('Creates a x1.5 HiDPI up range out of a x1.5 HiDPI breakpoint', () => {
    expect(template.render('hidpi-1-5')).toBe(expect15);
  });

  const expect2 = 'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 4/2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)';

  it('Creates a x1.5 HiDPI up range out of a x2 HiDPI breakpoint', () => {
    expect(template.render('hidpi-2')).toBe(expect2);
  });

  it('Creates a x1.5 HiDPI up range out of a x2 HiDPI breakpoint', () => {
    expect(template.render('hidpi-2 up')).toBe(expect2);
  });
});

describe('Breakpoint (HIDPI Only Range)', () => {
  it('Creates a x1.5 HiDPI only range out of a x1.5 HiDPI breakpoint', () => {
    expect(template.render('hidpi-1-5 only')).toBe(
      'only screen and (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 1.98958), only screen and (min--moz-device-pixel-ratio: 1.5) and (max--moz-device-pixel-ratio: 1.98958), only screen and (-o-min-device-pixel-ratio: 3/2) and (-o-max-device-pixel-ratio: 3.97916/2), only screen and (min-resolution: 144dpi) and (max-resolution: 191dpi), only screen and (min-resolution: 1.5dppx) and (max-resolution: 1.98958dppx)',
    );
  });

  it('Creates a x2 HiDPI only range out of a x2 HiDPI breakpoint', () => {
    expect(template.render('hidpi-2 only')).toBe(
      'only screen and (-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.98958), only screen and (min--moz-device-pixel-ratio: 2) and (max--moz-device-pixel-ratio: 2.98958), only screen and (-o-min-device-pixel-ratio: 4/2) and (-o-max-device-pixel-ratio: 5.97916/2), only screen and (min-resolution: 192dpi) and (max-resolution: 287dpi), only screen and (min-resolution: 2dppx) and (max-resolution: 2.98958dppx)',
    );
  });

  it('Creates an up range if the HiDPI breakpoint is the highest', () => {
    expect(template.render('hidpi-3 only')).toBe(
      'only screen and (-webkit-min-device-pixel-ratio: 3), only screen and (min--moz-device-pixel-ratio: 3), only screen and (-o-min-device-pixel-ratio: 6/2), only screen and (min-resolution: 288dpi), only screen and (min-resolution: 3dppx)',
    );
  });
});

describe('Breakpoint (HIDPI Only Range)', () => {
  it('Creates a x1.5 HiDPI down range out of a x1.5 HiDPI breakpoint', () => {
    expect(template.render('hidpi-1-5 down')).toBe(
      'only screen and (-webkit-max-device-pixel-ratio: 1.98958), only screen and (max--moz-device-pixel-ratio: 1.98958), only screen and (-o-max-device-pixel-ratio: 3.97916/2), only screen and (max-resolution: 191dpi), only screen and (max-resolution: 1.98958dppx)',
    );
  });

  it('Creates a x2 HiDPI down range out of a x2 HiDPI breakpoint', () => {
    expect(template.render('hidpi-2 down')).toBe(
      'only screen and (-webkit-max-device-pixel-ratio: 2.98958), only screen and (max--moz-device-pixel-ratio: 2.98958), only screen and (-o-max-device-pixel-ratio: 5.97916/2), only screen and (max-resolution: 287dpi), only screen and (max-resolution: 2.98958dppx)',
    );
  });

  it('Skips media query creation for highest HiDPI breakpoint down', () => {
    expect(template.render('hidpi-3 down')).toBe('');
  });

  it('Creates a x2 HiDPI range ', () => {
    expect(template.render('(resolution: 2dppx)')).toBe(
      '(resolution: 2dppx)',
    );
    expect(template.render('(min-resolution: 2dpi)')).toBe(
      '(min-resolution: 2dpi)',
    );
    expect(template.render('(max-resolution: 2dppx)')).toBe(
      '(max-resolution: 2dppx)',
    );
  });
});

describe('Breakpoint (Value Default/Up Range)', () => {
  const expectedString = 'only screen and (min-width: 1em)';

  it('Converts a pixel breakpoint to em', () => {
    expect(template.render('16px')).toBe(expectedString);
  });

  it('Converts a rem breakpoint to em', () => {
    expect(template.render('1rem')).toBe(expectedString);
  });

  it('Converts a em breakpoint to em', () => {
    expect(template.render('1em')).toBe(expectedString);
  });
});

describe('Breakpoint (Value Down Range)', () => {
  const expectedString = 'only screen and (max-width: 1em)';

  it('Creates a down range out of a pixel value', () => {
    expect(template.render('16px down')).toBe(expectedString);
  });

  it('Creates a down range out of a rem value', () => {
    expect(template.render('1rem down')).toBe(expectedString);
  });

  it('Creates a down range out of an em value', () => {
    expect(template.render('1em down')).toBe(expectedString);
  });
});

describe('Breakpoint (Orientation)', () => {
  it('Creates special media query for landscape', () => {
    expect(template.render('landscape')).toBe('(orientation: landscape)');
  });

  it('Creates special media query for portrait', () => {
    expect(template.render('portrait')).toBe('(orientation: portrait)');
  });
});

describe('Breakpoint (Empty String)', () => {
  it('Returns an empty string for the value small up', () => {
    expect(template.render('small up')).toBe('');
  });

  it('Returns an empty string for the value small down', () => {
    expect(template.render('small down')).toBe('only screen and (max-width: 39.9375em)');
  });

  it('Returns an empty string for the value 0 up', () => {
    expect(template.render('0 up')).toBe('');
  });
});

describe('Breakpoint (Unknown Value)', () => {
  it('Returns an empty string for non-existant media queries', () => {
    expect(template.render('xxxxlarge')).toBe('');
  });
});
