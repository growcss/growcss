import em from '../components/em';

describe('Convert to em', () => {
  it('Converts a unit to the equivalent in ems', () => {
    const expected = '2em';

    expect(em(32)).toBe(expected);
    expect(em('2em')).toBe(expected);
    expect(em('32px')).toBe(expected);
  });
});
