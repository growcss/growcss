const cssRegex = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;

/**
 * Returns a given CSS value and its unit as elements of an array.
 *
 * @param {string} value
 *
 * @return {[number|string, undefined|string]}
 */
export default (value: string): [number|string, undefined|string] => {
  const matchedValue = value.match(cssRegex);

  if (matchedValue) {
    return [parseFloat(value), matchedValue[2]];
  }

  return [value, undefined]
};
