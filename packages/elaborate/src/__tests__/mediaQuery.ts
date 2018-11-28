import mediaquery from './../components/mediaquery/mediaQuery';

describe('Styled components test', () => {
  it('Returns a max-width media query with content', () => {
    expect(mediaquery('small')`display:none;`).toEqual(['display:none;']);
    expect(mediaquery('medium')`display:none;`).toEqual([
      '@media ',
      '(min-width: 40em)',
      ' { ',
      'display:none;',
      ' }',
    ]);
    expect(mediaquery('large')`display:none;`).toEqual([
      '@media ',
      '(min-width: 64em)',
      ' { ',
      'display:none;',
      ' }',
    ]);
    expect(mediaquery('xlarge')`display:none;`).toEqual([
      '@media ',
      '(min-width: 75em)',
      ' { ',
      'display:none;',
      ' }',
    ]);
    expect(mediaquery('xxlarge')`display:none;`).toEqual([
      '@media ',
      '(min-width: 90em)',
      ' { ',
      'display:none;',
      ' }',
    ]);
  });
});
