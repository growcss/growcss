// @flow
import { Button as ButtonStyle } from '@growcss/theme';

const fetchFromObject = (obj, prop: string) => {
  if (typeof obj === 'undefined') {
    return null;
  }

  const index = prop.indexOf('.');

  if (index > -1) {
    return fetchFromObject(
      obj[prop.substring(0, index)],
      prop.substr(index + 1),
    );
  }

  return obj[prop];
};

export const getThemeStyle = (props: any, module: string, key: string) => {
  const theme = props.theme !== undefined ? props.theme : null;

  return theme !== null
    ? fetchFromObject(theme[module], key)
    : fetchFromObject(ButtonStyle, key);
};
