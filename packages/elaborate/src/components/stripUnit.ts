/**
 * Returns a given CSS value minus its unit (or null if an invalid string is passed).
 *
 * @param {string|number} value
 *
 * @return {null|number}
 */
export default function(value: string | number): null | number {
  let unit = value;

  if (typeof value === 'string') {
    unit = (value).toString().replace(/[^\d.-]/gi, '');
  }

  if (unit === '') {
    return null;
  }

  return Number(unit);
};
