//@flow
import getStyle from '../../utils/GetStyle';

test('get style from theme prop', () => {
  const style = getStyle(
    { theme: { button: { moduleName: 'button', color: 'blue' } } },
    { moduleName: 'button', color: 'black' },
    'color',
  );

  expect(style).toEqual('blue');
});

test('get style from default theme', () => {
  const style = getStyle({ theme: undefined }, { moduleName: 'button', color: 'black' }, 'color');

  expect(style).toEqual('black');
});

test('get style with dotted key from default theme', () => {
  const style = getStyle(
    { theme: undefined },
    {
      moduleName: 'button',
      fallback: {
        background: '#fff',
        color: '#000',
        textDecoration: 'none',
      },
    },
    'fallback.color',
  );

  expect(style).toEqual('#000');
});
