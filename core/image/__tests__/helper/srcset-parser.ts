import cases from 'jest-in-case';
import he from 'he';
import { parseSrcSet } from '../../src/components/helper/srcset-parser';

// HTML Entities are much easier to troubleshoot in console.
he.encode.options.useNamedReferences = true;

interface TestObject {
  srcset: string;
  expect: string;
  name: string;
}

// Adapted from the W3C srcset conformance checker at:
// http://w3c-test.org/html/semantics/embedded-content/the-img-element/srcset/parse-a-srcset-attribute.html
const w3cTests: TestObject[] = [
  // Splitting Loop
  { srcset: '', expect: '', name: 'empty string' },
  { srcset: ',', expect: '', name: 'single comma' },
  { srcset: ',,,', expect: '', name: 'three commas' },
  { srcset: '&#x9;&#x9;data:,a&#x9;&#x9;1x&#x9;&#x9;', expect: 'data:,a', name: 'tabs' },
  {
    srcset: '&#xA;&#xA;data:,a&#xA;&#xA;1x&#xA;&#xA;',
    expect: 'data:,a',
    name: 'line feeds',
  },
  {
    srcset: '&#xB;&#xB;data:,a&#xB;&#xB;1x&#xB;&#xB;',
    expect: '&#xB;&#xB;data:,a&#xB;&#xB;1x&#xB;&#xB;',
    name: 'line tab',
  },
  {
    srcset: '&#xC;&#xC;data:,a&#xC;&#xC;1x&#xC;&#xC;',
    expect: 'data:,a',
    name: 'form feed U+000C',
  },
  {
    srcset: '&#xD;&#xD;data:,a&#xD;&#xD;1x&#xD;&#xD;',
    expect: 'data:,a',
    name: 'carriage return U+000D',
  },
  {
    srcset: '&#xE;&#xE;data:,a&#xE;&#xE;1x&#xE;&#xE;',
    expect: '&#xE;&#xE;data:,a&#xE;&#xE;1x&#xE;&#xE;',
    name: 'shift out U+000E',
  },
  {
    srcset: '&#xF;&#xF;data:,a&#xF;&#xF;1x&#xF;&#xF;',
    expect: '&#xF;&#xF;data:,a&#xF;&#xF;1x&#xF;&#xF;',
    name: 'shift in U+000F',
  },
  {
    srcset: '&#x10;&#x10;data:,a&#x10;&#x10;1x&#x10;&#x10;',
    expect: '&#x10;&#x10;data:,a&#x10;&#x10;1x&#x10;&#x10;',
    name: 'data link escape U+0010',
  },
  { srcset: 'data:,a', expect: 'data:,a', name: 'plain url' },
  { srcset: 'data:,a ', expect: 'data:,a', name: 'trailing space' },
  { srcset: 'data:,a ,', expect: 'data:,a', name: 'trailing space and comma' },
  { srcset: 'data:,a,', expect: 'data:,a', name: 'trailing comma' },
  { srcset: 'data:,a, ', expect: 'data:,a', name: 'trailing comma and space' },
  { srcset: 'data:,a,,,', expect: 'data:,a', name: 'trailing three commas' },
  {
    srcset: 'data:,a,, , ',
    expect: 'data:,a',
    name: 'trailing two commas space comma space',
  },
  { srcset: ' data:,a', expect: 'data:,a', name: 'leading space' },
  { srcset: ',,,data:,a', expect: 'data:,a', name: 'leading three commas' },
  {
    srcset: ' , ,,data:,a',
    expect: 'data:,a',
    name: 'leading space comma space comma comma',
  },
  {
    srcset: '&nbsp;data:,a',
    expect: '&nbsp;data:,a',
    name: 'leading non-breaking space',
  },
  {
    srcset: 'data:,a&nbsp;',
    expect: 'data:,a&nbsp;',
    name: 'trailing non-breaking space',
  },
  // Descriptor Tokenizer
  { srcset: 'data:,a 1x', expect: 'data:,a', name: 'plain url with descriptor' },
  { srcset: 'data:,a 1x ', expect: 'data:,a', name: 'trailing space' },
  { srcset: 'data:,a 1x,', expect: 'data:,a', name: 'trailing comma' },
  {
    srcset: 'data:,a ( , data:,b 1x, ), data:,c',
    expect: '',
    name: 'irregular parens 1',
  },
  {
    srcset: 'data:,a ((( , data:,b 1x, ), data:,c',
    expect: '',
    name: 'irregular parens 2',
  },
  { srcset: 'data:,a [ , data:,b 1x, ], data:,c', expect: '', name: 'brackets' },
  { srcset: 'data:,a { , data:,b 1x, }, data:,c', expect: '', name: 'braces' },
  {
    srcset: 'data:,a " , data:,b 1x, ", data:,c',
    expect: '',
    name: 'double quotes',
  },
  {
    srcset: 'data:,a \\,data:;\\,b, data:,c',
    expect: '',
    name: 'backslashes',
  },
  { srcset: 'data:,a, data:,b (', expect: '', name: 'trailing unclosed paren' },
  { srcset: 'data:,a, data:,b (  ', expect: '', name: 'unclosed paren space' },
  { srcset: 'data:,a, data:,b (,', expect: '', name: 'unclosed paren comma' },
  { srcset: 'data:,a, data:,b (x', expect: '', name: 'unclosed paren x' },
  { srcset: 'data:,a, data:,b ()', expect: '', name: 'parens, no descriptor' },
  { srcset: 'data:,a (, data:,b', expect: '', name: 'unclosed paren' },
  {
    srcset: 'data:,a /*, data:,b, data:,c */',
    expect: '',
    name: 'block comments',
  },
  {
    srcset: 'data:,a //, data:,b',
    expect: '',
    name: 'double slash like a comment',
  },
  // Descriptor Parser
  { srcset: 'data:,a foo', expect: '', name: 'trailing foo' },
  { srcset: 'data:,a foo foo', expect: '', name: 'trailing foo foo' },
  { srcset: 'data:,a foo 1x', expect: '', name: 'trailing foo 1x' },
  { srcset: 'data:,a foo 1x foo', expect: '', name: 'trailing 1x foo' },
  { srcset: 'data:,a foo 1w', expect: '', name: 'trailing foo 1w' },
  { srcset: 'data:,a foo 1w foo', expect: '', name: 'trailing foo 1w foo' },
  { srcset: 'data:,a 1x 1x', expect: '', name: 'two density descriptors' },
  { srcset: 'data:,a 1w 1w', expect: '', name: 'two width descriptors' },
  { srcset: 'data:,a 1h 1h', expect: '', name: 'two height descriptors' },
  { srcset: 'data:,a 1w 1x', expect: '', name: 'width then density' },
  { srcset: 'data:,a 1x 1w', expect: '', name: 'density then width' },
  { srcset: 'data:,a 1w 1h', expect: 'data:,a', name: 'width then height' },
  { srcset: 'data:,a 1h 1w', expect: 'data:,a', name: 'height then width' },
  { srcset: 'data:,a 1h 1x', expect: '', name: 'height then density' },
  { srcset: 'data:,a 1h 1w 1x', expect: '', name: 'height then width then density' },
  { srcset: 'data:,a 1x 1w 1h', expect: '', name: 'density then width then height' },
  { srcset: 'data:,a 1h foo', expect: '', name: 'trailing 1h foo' },
  { srcset: 'data:,a foo 1h', expect: '', name: 'trailing foo 1h' },
  { srcset: 'data:,a 0w', expect: '', name: 'zero width' },
  { srcset: 'data:,a -1w', expect: '', name: 'negative width' },
  { srcset: 'data:,a 1w -1w', expect: '', name: 'positive width, negative width' },
  { srcset: 'data:,a 1.0w', expect: '', name: 'floating point width' },
  { srcset: 'data:,a 1w 1.0w', expect: '', name: 'integer width, floating point width' },
  { srcset: 'data:,a 1e0w', expect: '', name: 'exponent width' },
  { srcset: 'data:,a 1w 1e0w', expect: '', name: 'integer width, exponent width' },
  { srcset: 'data:,a 1www', expect: '', name: '1www' },
  { srcset: 'data:,a 1w 1www', expect: '', name: '1w 1www' },
  { srcset: 'data:,a 1w +1w', expect: '', name: '1w +1w' },
  { srcset: 'data:,a 1W', expect: '', name: 'capital W descriptor' },
  { srcset: 'data:,a 1w 1W', expect: '', name: 'lowercase w, capital W descriptors' },
  { srcset: 'data:,a Infinityw', expect: '', name: 'Infinityw' },
  { srcset: 'data:,a 1w Infinityw', expect: '', name: '1w Infinityw' },
  { srcset: 'data:,a NaNw', expect: '', name: 'Nanw' },
  { srcset: 'data:,a 1w NaNw', expect: '', name: '1w Nanw' },
  { srcset: 'data:,a 0x1w', expect: '', name: 'ox1w' },
  { srcset: 'data:,a 1&#x1;w', expect: '', name: 'trailing U+0001' },
  { srcset: 'data:,a 1&nbsp;w', expect: '', name: 'trailing U+00A0' },
  { srcset: 'data:,a 1&#x1680;w', expect: '', name: 'trailing U+1680' },
  { srcset: 'data:,a 1&#x2000;w', expect: '', name: 'trailing U+2000' },
  { srcset: 'data:,a 1&#x2001;w', expect: '', name: 'trailing U+2001' },
  { srcset: 'data:,a 1&#x2002;w', expect: '', name: 'trailing U+2002' },
  { srcset: 'data:,a 1&#x2003;w', expect: '', name: 'trailing U+2003' },
  { srcset: 'data:,a 1&#x2004;w', expect: '', name: 'trailing U+2004' },
  { srcset: 'data:,a 1&#x2005;w', expect: '', name: 'trailing U+2005' },
  { srcset: 'data:,a 1&#x2006;w', expect: '', name: 'trailing U+2006' },
  { srcset: 'data:,a 1&#x2007;w', expect: '', name: 'trailing U+2007' },
  { srcset: 'data:,a 1&#x2008;w', expect: '', name: 'trailing U+2008' },
  { srcset: 'data:,a 1&#x2009;w', expect: '', name: 'trailing U+2009' },
  { srcset: 'data:,a 1&#x200A;w', expect: '', name: 'trailing U+200A' },
  { srcset: 'data:,a 1&#x200C;w', expect: '', name: 'trailing U+200C' },
  { srcset: 'data:,a 1&#x200D;w', expect: '', name: 'trailing U+200D' },
  { srcset: 'data:,a 1&#x202F;w', expect: '', name: 'trailing U+202F' },
  { srcset: 'data:,a 1&#x205F;w', expect: '', name: 'trailing U+205F' },
  { srcset: 'data:,a 1&#x3000;w', expect: '', name: 'trailing U+3000' },
  { srcset: 'data:,a 1&#xFEFF;w', expect: '', name: 'trailing U+FEFF' },
  { srcset: 'data:,a &#x1;1w', expect: '', name: 'leading U+0001' },
  // {srcset: 'data:,a &nbsp;1w'  , expect: '',        name: 'leading U+00A0 width'},
  { srcset: 'data:,a &#x1680;1w', expect: '', name: 'leading U+1680' },
  { srcset: 'data:,a &#x2000;1w', expect: '', name: 'leading U+2000' },
  { srcset: 'data:,a &#x2001;1w', expect: '', name: 'leading U+2001' },
  { srcset: 'data:,a &#x2002;1w', expect: '', name: 'leading U+2002' },
  { srcset: 'data:,a &#x2003;1w', expect: '', name: 'leading U+2003' },
  { srcset: 'data:,a &#x2004;1w', expect: '', name: 'leading U+2004' },
  { srcset: 'data:,a &#x2005;1w', expect: '', name: 'leading U+2005' },
  { srcset: 'data:,a &#x2006;1w', expect: '', name: 'leading U+2006' },
  { srcset: 'data:,a &#x2007;1w', expect: '', name: 'leading U+2007' },
  { srcset: 'data:,a &#x2008;1w', expect: '', name: 'leading U+2008' },
  { srcset: 'data:,a &#x2009;1w', expect: '', name: 'leading U+2009' },
  { srcset: 'data:,a &#x200A;1w', expect: '', name: 'leading U+200A' },
  { srcset: 'data:,a &#x200C;1w', expect: '', name: 'leading U+200C' },
  { srcset: 'data:,a &#x200D;1w', expect: '', name: 'leading U+200D' },
  { srcset: 'data:,a &#x202F;1w', expect: '', name: 'leading U+202F' },
  { srcset: 'data:,a &#x205F;1w', expect: '', name: 'leading U+205F' },
  { srcset: 'data:,a &#x3000;1w', expect: '', name: 'leading U+3000' },
  { srcset: 'data:,a &#xFEFF;1w', expect: '', name: 'leading U+FEFF' },
  { srcset: 'data:,a 0x', expect: 'data:,a', name: 'zero density' },
  { srcset: 'data:,a -0x', expect: 'data:,a', name: 'negative zero density' },
  { srcset: 'data:,a 1x -0x', expect: '', name: '1x -0x' },
  { srcset: 'data:,a -1x', expect: '', name: '-1x' },
  { srcset: 'data:,a 1x -1x', expect: '', name: '1x -1x' },
  { srcset: 'data:,a 1e0x', expect: 'data:,a', name: '1e0x' },
  { srcset: 'data:,a 1E0x', expect: 'data:,a', name: '1E0x' },
  { srcset: 'data:,a 1e-1x', expect: 'data:,a', name: '1e-1x' },
  { srcset: 'data:,a 1.5e1x', expect: 'data:,a', name: '1.5e1x' },
  { srcset: 'data:,a -x', expect: '', name: 'negative density with no digits' },
  { srcset: 'data:,a .x', expect: '', name: 'decimal density with no digits' },
  { srcset: 'data:,a -.x', expect: '', name: '-.x' },
  { srcset: 'data:,a 1.x', expect: '', name: '1.x' },
  {
    srcset: 'data:,a .5x',
    expect: 'data:,a',
    name: 'floating point density descriptor',
  },
  { srcset: 'data:,a .5e1x', expect: 'data:,a', name: '.5e1x' },
  { srcset: 'data:,a 1x 1.5e1x', expect: '', name: '1x 1.5e1x' },
  { srcset: 'data:,a 1x 1e1.5x', expect: '', name: '1x 1e1.5x' },
  { srcset: 'data:,a 1.0x', expect: 'data:,a', name: '1.0x' },
  { srcset: 'data:,a 1x 1.0x', expect: '', name: '1x 1.0x' },
  {
    srcset: 'data:,a +1x',
    expect: '',
    name: 'no plus sign allowed on floating point number',
  },
  { srcset: 'data:,a 1X', expect: '', name: 'Capital X descriptor' },
  { srcset: 'data:,a Infinityx', expect: '', name: 'Infinityx' },
  { srcset: 'data:,a NaNx', expect: '', name: 'NaNx' },
  { srcset: 'data:,a 0x1x', expect: '', name: '0X1x' },
  { srcset: 'data:,a 0X1x', expect: '', name: '1&#x1;x' },
  { srcset: 'data:,a 1&#x1;x', expect: '', name: 'trailing U+0001' },
  { srcset: 'data:,a 1&nbsp;x', expect: '', name: 'trailing U+00A0 density' },
  { srcset: 'data:,a 1&#x1680;x', expect: '', name: 'trailing U+1680' },
  { srcset: 'data:,a 1&#x2000;x', expect: '', name: 'trailing U+2000' },
  { srcset: 'data:,a 1&#x2001;x', expect: '', name: 'trailing U+2001' },
  { srcset: 'data:,a 1&#x2002;x', expect: '', name: 'trailing U+2002' },
  { srcset: 'data:,a 1&#x2003;x', expect: '', name: 'trailing U+2003' },
  { srcset: 'data:,a 1&#x2004;x', expect: '', name: 'trailing U+2004' },
  { srcset: 'data:,a 1&#x2005;x', expect: '', name: 'trailing U+2005' },
  { srcset: 'data:,a 1&#x2006;x', expect: '', name: 'trailing U+2006' },
  { srcset: 'data:,a 1&#x2007;x', expect: '', name: 'trailing U+2007' },
  { srcset: 'data:,a 1&#x2008;x', expect: '', name: 'trailing U+2008' },
  { srcset: 'data:,a 1&#x2009;x', expect: '', name: 'trailing U+2009' },
  { srcset: 'data:,a 1&#x200A;x', expect: '', name: 'trailing U+200A' },
  { srcset: 'data:,a 1&#x200C;x', expect: '', name: 'trailing U+200C' },
  { srcset: 'data:,a 1&#x200D;x', expect: '', name: 'trailing U+200D' },
  { srcset: 'data:,a 1&#x202F;x', expect: '', name: 'trailing U+202F' },
  { srcset: 'data:,a 1&#x205F;x', expect: '', name: 'trailing U+205F' },
  { srcset: 'data:,a 1&#x3000;x', expect: '', name: 'trailing U+3000' },
  { srcset: 'data:,a 1&#xFEFF;x', expect: '', name: 'trailing U+FEFF' },
  { srcset: 'data:,a &#x1;1x', expect: '', name: 'leading U+0001' },
  { srcset: 'data:,a &nbsp;1x', expect: '', name: 'leading U+00A0 density' },
  { srcset: 'data:,a &#x1680;1x', expect: '', name: 'leading U+1680' },
  { srcset: 'data:,a &#x2000;1x', expect: '', name: 'leading U+2000' },
  { srcset: 'data:,a &#x2001;1x', expect: '', name: 'leading U+2001' },
  { srcset: 'data:,a &#x2002;1x', expect: '', name: 'leading U+2002' },
  { srcset: 'data:,a &#x2003;1x', expect: '', name: 'leading U+2003' },
  { srcset: 'data:,a &#x2004;1x', expect: '', name: 'leading U+2004' },
  { srcset: 'data:,a &#x2005;1x', expect: '', name: 'leading U+2005' },
  { srcset: 'data:,a &#x2006;1x', expect: '', name: 'leading U+2006' },
  { srcset: 'data:,a &#x2007;1x', expect: '', name: 'leading U+2007' },
  { srcset: 'data:,a &#x2008;1x', expect: '', name: 'leading U+2008' },
  { srcset: 'data:,a &#x2009;1x', expect: '', name: 'leading U+2009' },
  { srcset: 'data:,a &#x200A;1x', expect: '', name: 'leading U+200A' },
  { srcset: 'data:,a &#x200C;1x', expect: '', name: 'leading U+200C' },
  { srcset: 'data:,a &#x200D;1x', expect: '', name: 'leading U+200D' },
  { srcset: 'data:,a &#x202F;1x', expect: '', name: 'leading U+202F' },
  { srcset: 'data:,a &#x205F;1x', expect: '', name: 'leading U+205F' },
  { srcset: 'data:,a &#x3000;1x', expect: '', name: 'leading U+3000' },
  { srcset: 'data:,a &#xFEFF;1x', expect: '', name: 'leading U+FEFF' },
  { srcset: 'data:,a 1w 0h', expect: '', name: '1w 0h' },
  { srcset: 'data:,a 1w -1h', expect: '', name: '1w -1h' },
  { srcset: 'data:,a 1w 1.0h', expect: '', name: '1w 1.0h' },
  { srcset: 'data:,a 1w 1e0h', expect: '', name: '1w 1e0h' },
  { srcset: 'data:,a 1w 1hhh', expect: '', name: '1w 1hhh' },
  { srcset: 'data:,a 1w 1H', expect: '', name: '1w 1H' },
  { srcset: 'data:,a 1w Infinityh', expect: '', name: '1w Infinityh' },
  { srcset: 'data:,a 1w NaNh', expect: '', name: '1w NaNh' },
  { srcset: 'data:,a 0x1h', expect: '', name: '0x1h' },
  { srcset: 'data:,a 0X1h', expect: '', name: '0X1h' },
  { srcset: 'data:,a 1w 1&#x1;h', expect: '', name: 'trailing U+0001' },
  { srcset: 'data:,a 1w 1&nbsp;h', expect: '', name: 'trailing U+00A0' },
  { srcset: 'data:,a 1w 1&#x1680;h', expect: '', name: 'trailing U+1680' },
  { srcset: 'data:,a 1w 1&#x2000;h', expect: '', name: 'trailing U+2000' },
  { srcset: 'data:,a 1w 1&#x2001;h', expect: '', name: 'trailing U+2001' },
  { srcset: 'data:,a 1w 1&#x2002;h', expect: '', name: 'trailing U+2002' },
  { srcset: 'data:,a 1w 1&#x2003;h', expect: '', name: 'trailing U+2003' },
  { srcset: 'data:,a 1w 1&#x2004;h', expect: '', name: 'trailing U+2004' },
  { srcset: 'data:,a 1w 1&#x2005;h', expect: '', name: 'trailing U+2005' },
  { srcset: 'data:,a 1w 1&#x2006;h', expect: '', name: 'trailing U+2006' },
  { srcset: 'data:,a 1w 1&#x2007;h', expect: '', name: 'trailing U+2007' },
  { srcset: 'data:,a 1w 1&#x2008;h', expect: '', name: 'trailing U+2008' },
  { srcset: 'data:,a 1w 1&#x2009;h', expect: '', name: 'trailing U+2009' },
  { srcset: 'data:,a 1w 1&#x200A;h', expect: '', name: 'trailing U+200A' },
  { srcset: 'data:,a 1w 1&#x200C;h', expect: '', name: 'trailing U+200C' },
  { srcset: 'data:,a 1w 1&#x200D;h', expect: '', name: 'trailing U+200D' },
  { srcset: 'data:,a 1w 1&#x202F;h', expect: '', name: 'trailing U+202F' },
  { srcset: 'data:,a 1w 1&#x205F;h', expect: '', name: 'trailing U+205F' },
  { srcset: 'data:,a 1w 1&#x3000;h', expect: '', name: 'trailing U+3000' },
  { srcset: 'data:,a 1w 1&#xFEFF;h', expect: '', name: 'trailing U+FEFF' },
  { srcset: 'data:,a 1w &#x1;1h', expect: '', name: 'leading U+0001' },
  { srcset: 'data:,a 1w &nbsp;1h', expect: '', name: 'leading U+00A0' },
  { srcset: 'data:,a 1w &#x1680;1h', expect: '', name: 'leading U+1680' },
  { srcset: 'data:,a 1w &#x2000;1h', expect: '', name: 'leading U+2000' },
  { srcset: 'data:,a 1w &#x2001;1h', expect: '', name: 'leading U+2001' },
  { srcset: 'data:,a 1w &#x2002;1h', expect: '', name: 'leading U+2002' },
  { srcset: 'data:,a 1w &#x2003;1h', expect: '', name: 'leading U+2003' },
  { srcset: 'data:,a 1w &#x2004;1h', expect: '', name: 'leading U+2004' },
  { srcset: 'data:,a 1w &#x2005;1h', expect: '', name: 'leading U+2005' },
  { srcset: 'data:,a 1w &#x2006;1h', expect: '', name: 'leading U+2006' },
  { srcset: 'data:,a 1w &#x2007;1h', expect: '', name: 'leading U+2007' },
  { srcset: 'data:,a 1w &#x2008;1h', expect: '', name: 'leading U+2008' },
  { srcset: 'data:,a 1w &#x2009;1h', expect: '', name: 'leading U+2009' },
  { srcset: 'data:,a 1w &#x200A;1h', expect: '', name: 'leading U+200A' },
  { srcset: 'data:,a 1w &#x200C;1h', expect: '', name: 'leading U+200C' },
  { srcset: 'data:,a 1w &#x200D;1h', expect: '', name: 'leading U+200D' },
  { srcset: 'data:,a 1w &#x202F;1h', expect: '', name: 'leading U+202F' },
  { srcset: 'data:,a 1w &#x205F;1h', expect: '', name: 'leading U+205F' },
  { srcset: 'data:,a 1w &#x3000;1h', expect: '', name: 'leading U+3000' },
  { srcset: 'data:,a 1w &#xFEFF;1h', expect: '', name: 'leading U+FEFF' },
];

const errorTests: TestObject[] = [];
const successfulTests: TestObject[] = [];

w3cTests.forEach(value => {
  if (value.expect === '' && ['', ',', ',,,'].indexOf(value.srcset) === -1) {
    errorTests.push(value);
  } else {
    successfulTests.push(value);
  }
});

cases(
  'Parse SrcSet',
  opts => {
    const parsed = parseSrcSet(he.decode(opts.srcset));
    const firstCandidate: { url?: string } = parsed[0];

    const { url } = firstCandidate || { url: null };
    let encodedUrl = '';

    // Must re-encode url prior to comparison with expected string.
    if (url !== null) {
      encodedUrl = he.encode(url);
    } else {
      encodedUrl = '';
    }

    expect(encodedUrl).toStrictEqual(opts.expect);
  },
  successfulTests,
);

cases(
  'Parse SrcSet',
  opts => {
    expect(() => {
      parseSrcSet(he.decode(opts.srcset));
    }).toThrow(Error);
  },
  errorTests,
);

test('Test srcset parser with really images', () => {
  const srcset =
    'https://res.cloudinary.com/anolilab/image/upload/c_scale,w_150/v1551714118/abenteuer-berg-draussen-1183986.jpg 150w, https://res.cloudinary.com/anolilab/image/upload/c_scale,w_405/v1551714118/abenteuer-berg-draussen-1183986.jpg 405w, https://res.cloudinary.com/anolilab/image/upload/c_scale,w_1024/v1551714118/abenteuer-berg-draussen-1183986.jpg 1024w, https://res.cloudinary.com/anolilab/image/upload/c_scale,w_500,h_750/v1551714118/abenteuer-berg-draussen-1183986.jpg 500w 750h';
  const parsed = parseSrcSet(srcset);

  expect(parsed).toHaveLength(4);
  expect(parsed[0]).not.toBeUndefined();
  expect(parsed[1]).not.toBeUndefined();
  expect(parsed[2]).not.toBeUndefined();
  expect(parsed[3]).not.toBeUndefined();
  expect(parsed[4]).toBeUndefined();
});

test('Test srcset parser with media type', () => {
  const srcset =
    'https://res.cloudinary.com/anolilab/image/upload/c_scale,w_150/v1551714118/abenteuer-berg-draussen-1183986.jpg 150w media=(min-width: 1440px), https://res.cloudinary.com/anolilab/image/upload/c_scale,w_150/v1551714118/abenteuer-berg-draussen-1183986.jpg media=(min-width: 960px), , https://res.cloudinary.com/anolilab/image/upload/c_scale,w_150/v1551714118/abenteuer-berg-draussen-1183986.jpg media=(min-width: 960px) and (orientation: portrait)';
  const parsed = parseSrcSet(srcset);

  expect(parsed).toHaveLength(3);

  expect(parsed[0]).not.toBeUndefined();
  expect(parsed[0]).toHaveProperty('media');
  expect(parsed[0]).toHaveProperty('width');
  expect(parsed[0].media).toBe('(min-width: 1440px)');

  expect(parsed[1]).not.toBeUndefined();
  expect(parsed[1]).toHaveProperty('media');
  expect(parsed[1]).not.toHaveProperty('width');
  expect(parsed[1].media).toBe('(min-width: 960px)');

  expect(parsed[2]).not.toBeUndefined();
  expect(parsed[2]).toHaveProperty('media');
  expect(parsed[2]).not.toHaveProperty('width');
  expect(parsed[2].media).toBe('(min-width: 960px) and (orientation: portrait)');
});
