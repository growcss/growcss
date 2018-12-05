import { Gutters } from '../../utils/Gutters';
import { Gutters as DefaultGutter } from '../../components/Gutters';

describe('Gutters (margin and padding with breakpoints)', () => {
  it('Converts a gutter named breakpoint to value and a wrapped media-query value', () => {
    expect(Gutters(DefaultGutter)).toEqual([
      ['margin-right: 0.625rem;margin-left: 0.625rem;'],
      [
        '@media ',
        'only screen and (min-width: 40em)',
        ' { ',
        'margin-right: 0.9375rem;margin-left: 0.9375rem;',
        ' }',
      ],
    ]);
  });

  it('Converts a gutter named breakpoint to value and a wrapped media-query value with changed gutter type', () => {
    expect(Gutters(DefaultGutter, 'padding')).toEqual([
      ['padding-right: 0.625rem;padding-left: 0.625rem;'],
      [
        '@media ',
        'only screen and (min-width: 40em)',
        ' { ',
        'padding-right: 0.9375rem;padding-left: 0.9375rem;',
        ' }',
      ],
    ]);
  });
});

describe('Gutters (margin and padding with number)', () => {
  it('Converts a gutter number to margin styles', () => {
    expect(Gutters(20)).toEqual([
      'margin-right: 0.625rem;margin-left: 0.625rem;',
    ]);
  });
  it('Converts a gutter number to padding styles', () => {
    expect(Gutters(0, 'padding')).toEqual([
      'padding-right: 0;padding-left: 0;',
    ]);
  });
});

describe('Gutters with negative option', () => {
  it('Converts a gutter number to negative margin styles', () => {
    expect(Gutters(20, 'margin', ['right', 'left'], true)).toEqual([
      'margin-right: -0.625rem;margin-left: -0.625rem;',
    ]);

    expect(Gutters(20, 'padding', ['right', 'left'], true)).toEqual([
      'margin-right: -0.625rem;margin-left: -0.625rem;',
    ]);

    expect(Gutters(-20, 'padding', ['left'], true)).toEqual([
      'margin-left: -0.625rem;',
    ]);
  });
});
