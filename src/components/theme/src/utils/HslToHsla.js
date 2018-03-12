// @flow

export const Hsl2Hsla = (hsl: string, alpha: string): string => {
  return hsl.replace('hsl', 'hsla').replace(')', `,${alpha})`);
};
