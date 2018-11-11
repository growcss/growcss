import remcalc from '../index';

describe('Convert To Rem', () => {
  it('Converts a unit to the equivalent in rems', () => {
    const expected = '2rem';

    expect(remcalc(32)).toBe(expected);
    expect(remcalc('2em')).toBe(expected);
  });

  it('Converts a 0rem and 0em to 0', () => {
    expect(remcalc('0rem')).toBe('0');
    expect(remcalc('0em')).toBe('0');
  });

  it('Converts a unit to the equivalent in rems with a changed base number', () => {
    const expected = '4rem';

    expect(remcalc(32, 8)).toBe(expected);
    expect(remcalc('4em', '8px')).toBe(expected);
    expect(remcalc('16px', '8px')).toBe('2rem');
  });
});

describe('Convert To Rem with changed base value', () => {
  it('Converts a unit to the equivalent in rems with a changed base number', () => {
    expect(remcalc(32, 8)).toBe('4rem');
    expect(remcalc('16px', '8px')).toBe('2rem');
    expect(remcalc(2, '50%')).toBe('0.25rem');
    expect(remcalc('2em', '16rem')).toBe('2rem');
  });
});

describe('Rem Calculator', () => {
  it('Converts an arbitrary number of values into rem equivalents', () => {
    expect(remcalc([8, 16, 32, 64])).toBe('0.5rem 1rem 2rem 4rem');
    expect(remcalc(['1px', '2px', '3px', '4px'])).toBe(
      '0.0625rem 0.125rem 0.1875rem 0.25rem',
    );
    expect(remcalc(['0', '2px', '3px', '4px'])).toBe(
      '0 0.125rem 0.1875rem 0.25rem',
    );
  });
});
