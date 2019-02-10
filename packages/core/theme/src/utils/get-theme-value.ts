import { DefaultTheme } from 'styled-components';

/**
 * Returns the value of `props.theme[path]` or `defaultValue`.
 *
 * @example
 * import styled from "styled-components";
 * import { getThemeValue } from "@growcss/theme";
 *
 * const Button = styled.button`
 *   color: ${getThemeValue("color", "red")};
 * `;
 *
 * @param {string} path
 * @param {any} defaultValue
 *
 * @returns {any}
 */
export const getThemeValue = (path: string, defaultValue?: any): any => (
  theme: DefaultTheme = {},
) => {
  if (typeof theme[path] !== 'undefined') {
    return theme[path];
  }

  if (path && path.indexOf('.') > 0) {
    const paths = path.split('.');
    const { length } = paths;
    let object = theme[paths[0]];
    let index = 1;

    while (object != null && index < length) {
      object = object[paths[index]];
      index += 1;
    }

    if (typeof object !== 'undefined') {
      return object;
    }
  }

  return defaultValue;
};
