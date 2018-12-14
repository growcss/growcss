import mediaquery from '../src/components/mediaquery/media-query';

describe('Styled components test', () => {
  it('Returns a max-width media query with content', () => {
    expect(mediaquery()`display:none;`).toEqual(['display:none;']);
    expect(mediaquery('small')`display:none;`).toEqual(['display:none;']);
    expect(mediaquery('medium')`display:none;`).toEqual([
      '@media ',
      'only screen and (min-width: 40em)',
      '{',
      'display:none;',
      '}',
    ]);
    expect(mediaquery('large')`display:none;`).toEqual([
      '@media ',
      'only screen and (min-width: 64em)',
      '{',
      'display:none;',
      '}',
    ]);
    expect(mediaquery('xlarge')`display:none;`).toEqual([
      '@media ',
      'only screen and (min-width: 75em)',
      '{',
      'display:none;',
      '}',
    ]);
    expect(mediaquery('xxlarge')`display:none;`).toEqual([
      '@media ',
      'only screen and (min-width: 90em)',
      '{',
      'display:none;',
      '}',
    ]);
  });
});
