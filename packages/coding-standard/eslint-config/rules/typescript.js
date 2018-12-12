module.exports = {
  // Prevent TypeScript-specific constructs from being erroneously flagged as unused
  // https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/no-unused-vars.md
  'no-unused-vars': 'error',
  'typescript/no-unused-vars': 'error',

  // Disallow the use of custom TypeScript modules and namespaces
  // https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/no-namespace.md
  'typescript/no-namespace': [
    'error',
    {
      allowDeclarations: true,
    },
  ],

  // Disallow the use of variables before they are defined
  // https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/no-use-before-define.md
  'typescript/no-use-before-define': 'error',

  // Require that interface names be prefixed with I
  // https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/interface-name-prefix.md
  'typescript/interface-name-prefix': 'error',

  // Require a specific member delimiter style for interfaces and type literals
  // https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/member-delimiter-style.md
  'typescript/member-delimiter-style': 'error',

  // Require consistent spacing around type annotations
  // https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/type-annotation-spacing.md
  'typescript/type-annotation-spacing': 'error',

  // Disallow /// <reference path="" /> comments
  // https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/no-triple-slash-reference.md
  'typescript/no-triple-slash-reference': 'error',

  // Require that member overloads be consecutive
  // https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/adjacent-overload-signatures.md
  'typescript/adjacent-overload-signatures': 'error',

  // Require explicit accessibility modifiers on class properties and methods
  // https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/explicit-member-accessibility.md
  'typescript/explicit-member-accessibility': 'error',
  'typescript/no-angle-bracket-type-assertion': 'error',
  'typescript/class-name-casing': 'error',
  'typescript/no-array-constructor': 'error',
  'typescript/no-non-null-assertion': 'error',
  'typescript/no-parameter-properties': 'error',
  'typescript/prefer-namespace-keyword': 'error',
  'typescript/no-inferrable-types': [
    'error',
    {
      ignoreProperties: true,
      ignoreParameters: true,
    },
  ],
  'typescript/explicit-function-return-type': [
    'error',
    {
      allowExpressions: true,
    },
  ],
  'typescript/member-ordering': [
    'error',
    {
      default: [
        'static-field',
        'private-field',
        'protected-field',
        'public-field',
        'constructor',
        'public-method',
        'protected-method',
        'private-method',
      ],
    },
  ],
};
