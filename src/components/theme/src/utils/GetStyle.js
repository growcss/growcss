// @flow

/**
 * Get value from object with doted key.
 *
 * @param {Object} object
 * @param {string} prop
 *
 * @return {string|number|null}
 */
const fetchFromObject = (object, prop: string) => {
  if (typeof object === 'undefined') {
    return null;
  }

  const index = prop.indexOf('.');

  if (index > -1) {
    return fetchFromObject(object[prop.substring(0, index)], prop.substr(index + 1));
  }

  return object[prop];
};

/**
 * Returns a theme style from the ThemeProvider or the default style.
 *
 * @param {{[string]: any}}                     props
 * @param {{moduleName: string, [string]: any}} defaultTheme
 * @param {string}                              key
 *
 * @return {string|number}
 */
const getStyle = (
  props: { [string]: any },
  defaultTheme: { moduleName: string, [string]: any },
  key: string,
): string | number => {
  const propsTheme = props.theme !== undefined ? props.theme : null;
  const style = fetchFromObject(defaultTheme, key);

  if (style === null) {
    throw new Error();
  }

  if (propsTheme !== null && propsTheme[defaultTheme.moduleName] !== undefined) {
    const object = Object.assign({}, defaultTheme, propsTheme[defaultTheme.moduleName]);
    const themed = fetchFromObject(object, key);

    if (themed !== null) {
      return themed;
    }
  }

  return style;
};

export default getStyle;
