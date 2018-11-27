import stripUnit from '../components/stripUnit';

describe('Strip units', () => {
  it('should be equal 100', () => {
    expect(stripUnit('100%')).toBe(100);
  });

  it('should strip % from values', () => {
    expect(stripUnit('-100%')).toBe(-100);
  });

  it('should strip px from values', () => {
    expect(stripUnit('100px')).toBe(100);
  });

  it('should strip px from values', () => {
    expect(stripUnit('-100px')).toBe(-100);
  });

  it('should strip px from values', () => {
    expect(stripUnit('100PX')).toBe(100);
  });

  it('should strip em from values', () => {
    expect(stripUnit('-0.667EM')).toBe(-0.667);
  });

  it('should strip em from values', () => {
    expect(stripUnit('0.667em')).toBe(0.667);
  });

  it('should strip em from values', () => {
    expect(stripUnit('-0.667em')).toBe(-0.667);
  });

  it('should be equal 100', () => {
    expect(stripUnit('100')).toBe(100);
  });

  it('should be equal -100', () => {
    expect(stripUnit('-100')).toBe(-100);
  });

  it('should be equal null', () => {
    expect(stripUnit('foo')).toBe(null);
  });

  it('should be equal 100', () => {
    expect(stripUnit(100)).toBe(100);
  });

  it('should strip px from whole values', () => {
    expect(stripUnit('1px')).toBe(1)
  });

  it('should strip px from values', () => {
    expect(stripUnit('1.5px')).toBe(1.5)
  });

  it('should strip pt from whole values', () => {
    expect(stripUnit('1pt')).toBe(1)
  });

  it('should strip pt from values', () => {
    expect(stripUnit('1.5pt')).toBe(1.5)
  });

  it('should strip pc from whole values', () => {
    expect(stripUnit('1pc')).toBe(1)
  });

  it('should strip pc from values', () => {
    expect(stripUnit('1.5pc')).toBe(1.5)
  });

  it('should strip mm from whole values', () => {
    expect(stripUnit('1mm')).toBe(1)
  });

  it('should strip mm from values', () => {
    expect(stripUnit('1.5mm')).toBe(1.5)
  });

  it('should strip q from whole values', () => {
    expect(stripUnit('1q')).toBe(1)
  });

  it('should strip q from values', () => {
    expect(stripUnit('1.5q')).toBe(1.5)
  });

  it('should strip cm from whole values', () => {
    expect(stripUnit('1cm')).toBe(1)
  });

  it('should strip cm from values', () => {
    expect(stripUnit('1.5cm')).toBe(1.5)
  });

  it('should strip in from whole values', () => {
    expect(stripUnit('1in')).toBe(1)
  });

  it('should strip in from values', () => {
    expect(stripUnit('1.5in')).toBe(1.5)
  });

  it('should strip em from whole value', () => {
    expect(stripUnit('1em')).toBe(1)
  });

  it('should strip em from decimal values', () => {
    expect(stripUnit('1.2em')).toBe(1.2)
  });

  it('should strip rem from whole values', () => {
    expect(stripUnit('1rem')).toBe(1)
  });

  it('should strip rem from decimal values', () => {
    expect(stripUnit('1.2rem')).toBe(1.2)
  });

  it('should strip ex from whole values', () => {
    expect(stripUnit('1ex')).toBe(1)
  });

  it('should strip ex from decimal values', () => {
    expect(stripUnit('1.2ex')).toBe(1.2)
  });

  it('should strip ch from whole values', () => {
    expect(stripUnit('1ch')).toBe(1)
  });

  it('should strip ch from decimal values', () => {
    expect(stripUnit('1.2ch')).toBe(1.2)
  });

  it('should strip vh from whole values', () => {
    expect(stripUnit('100vh')).toBe(100)
  });

  it('should strip vh from decimal values', () => {
    expect(stripUnit('33.33vh')).toBe(33.33)
  });

  it('should strip vw from whole values', () => {
    expect(stripUnit('100vw')).toBe(100)
  });

  it('should strip vw from decimal values', () => {
    expect(stripUnit('33.33vw')).toBe(33.33)
  });

  it('should strip vmin from whole values', () => {
    expect(stripUnit('100vmin')).toBe(100)
  });

  it('should strip vmin from decimal values', () => {
    expect(stripUnit('33.33vmin')).toBe(33.33)
  });

  it('should strip vmax from whole values', () => {
    expect(stripUnit('100vmax')).toBe(100)
  });

  it('should strip vmax from decimal values', () => {
    expect(stripUnit('33.33vmax')).toBe(33.33)
  });

  it('should strip % from whole values', () => {
    expect(stripUnit('80%')).toBe(80)
  });

  it('should strip % from decimal values', () => {
    expect(stripUnit('33.3%')).toBe(33.3)
  });
});
