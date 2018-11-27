import rem from '../components/rem';

describe('Convert to Rem', () => {
  it('Converts a unit to the equivalent in rems', () => {
    const expected = '2rem';

    expect(rem(32)).toBe(expected);
    expect(rem('2em')).toBe(expected);
  });

  it('Converts a 0rem and 0em to 0', () => {
    expect(rem('0rem')).toBe('0');
    expect(rem('0em')).toBe('0');
  });

  it('Converts a unit to the equivalent in rems with a changed base number', () => {
    const expected = '4rem';

    expect(rem(32, 8)).toBe(expected);
    expect(rem('4em', '8px')).toBe(expected);
    expect(rem('16px', '8px')).toBe('2rem');
  });
});

describe('Convert To Rem with changed base value', () => {
  it('Converts a unit to the equivalent in rems with a changed base number', () => {
    expect(rem(32, 8)).toBe('4rem');
    expect(rem('16px', '8px')).toBe('2rem');
    expect(rem(2, '50%')).toBe('0.25rem');
    expect(rem('2em', '16rem')).toBe('2rem');
  });
});

describe('Rem Calculator', () => {
  it('Converts an arbitrary number of values into rem equivalents', () => {
    expect(rem([8, 16, 32, 64])).toBe('0.5rem 1rem 2rem 4rem');
    expect(rem(['1px', '2px', '3px', '4px'])).toBe(
      '0.0625rem 0.125rem 0.1875rem 0.25rem',
    );
    expect(rem(['0', '2px', '3px', '4px'])).toBe(
      '0 0.125rem 0.1875rem 0.25rem',
    );
  });
});
