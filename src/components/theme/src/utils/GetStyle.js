// @flow
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

/**
 * Returns a theme style from the ThemeProvider or the default style.
 *
 * @param {{[string]: any}}                     props
 * @param {{moduleName: string, [string]: any}} defaultTheme
 * @param {string}                              key
 *
 * @return {*}
 */
const getStyle = (
  props: { [string]: any },
  defaultTheme: { moduleName: string, [string]: any },
  key: string,
) => {
  const propsTheme = props.theme !== undefined ? props.theme : null;

  let style = fetchFromObject(defaultTheme, key);

  if (
    propsTheme !== null &&
    propsTheme[defaultTheme.moduleName] !== undefined
  ) {
    style = fetchFromObject(propsTheme[defaultTheme.moduleName], key);
  }

  return style;
};

export default getStyle;
