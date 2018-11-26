import { stripUnit, rem } from 'polished';

/**
 *
 * @param {string | number | Array<string | number>} values
 * @param {number | string}                          base
 *
 * @return {string}
 */
export default (
  values: string | number | Array<string | number>,
  base: number | string = 16,
) => {
  let baseRem: number = +base;

  if (typeof base === 'string') {
    // If the base font size is a %, then multiply it by 16px
    // This is because 100% font size = 16px in most all browsers
    if (base.includes('%')) {
      baseRem = +stripUnit(base) / 100 * 16;
    } else if (base.includes('rem')) {
      // Using rem as base allows correct scaling
      baseRem = +stripUnit(base) * 16;
    }
  }

  if (typeof values === 'string' || typeof values === 'number') {
    const remValue = rem(values, baseRem);

    if (['0rem', 'nullrem', '0rem'].includes(remValue)) {
      return '0';
    }

    return remValue;
  }

  const remValues: string[] = [];

  values.forEach(value => {
    let remValue = rem(value, baseRem);

    if (['0rem', 'nullrem', '0rem'].includes(remValue)) {
      remValue = '0px';
    }

    remValues.push(remValue);
  });

  return remValues.join(' ');
};
