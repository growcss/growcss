import em from '../components/em';

describe('Convert to em', () => {
  it('Converts a unit to the equivalent in ems', () => {
    const expected = '2em';

    expect(em(32)).toBe(expected);
    expect(em('2em')).toBe(expected);
    expect(em('32px')).toBe(expected);
  });

  it('Converts a 0 and 0em to 0', () => {
    expect(em('0')).toBe('0');
    expect(em(0)).toBe('0');
    expect(em('0em')).toBe('0');
  });

  it('Converts a unit to the equivalent in ems with a changed base number', () => {
    const expected = '4em';

    expect(em(32, 8)).toBe(expected);
    expect(em('4em', '8px')).toBe(expected);
    expect(em('16px', '8px')).toBe('2em');
  });

  describe('Em Calculator', () => {
    it('Converts an arbitrary number of values into em equivalents', () => {
      expect(em([8, 16, 32, 64])).toBe('0.5em 1em 2em 4em');
      expect(em(['1px', '2px', '3px', '4px'])).toBe(
        '0.0625em 0.125em 0.1875em 0.25em',
      );
      expect(em(['0', '2px', '3px', '4px'])).toBe(
        '0 0.125em 0.1875em 0.25em',
      );
    });
  });
});
