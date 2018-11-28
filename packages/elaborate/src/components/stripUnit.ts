/**
 * Returns a given CSS value minus its unit (or null if an invalid string is passed).
 *
 * @param {string|number} value
 *
 * @return {null|number}
 */
export default function(value: string | number): number {
  let unit = value;

  if (typeof value === 'string') {
    unit = (value).toString().replace(/[^\d.-]/gi, '');
  }

  if (unit === '') {
    throw new Error('An empty string was given for value.');
  }

  return Number(unit);
};
