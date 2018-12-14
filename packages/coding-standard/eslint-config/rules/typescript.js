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

  // Enforces the use of as Type assertions instead of <Type> assertions
  // https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/no-angle-bracket-type-assertion.md
  'typescript/no-angle-bracket-type-assertion': 'error',

  // Require PascalCased class and interface names
  // https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/class-name-casing.md
  'typescript/class-name-casing': 'error',

  // Disallow generic Array constructors
  // https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/no-array-constructor.md
  'typescript/no-array-constructor': 'error',

  // Disallows non-null assertions using the ! postfix operator
  // https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/no-non-null-assertion.md
  'typescript/no-non-null-assertion': 'error',

  // Disallow the use of parameter properties in class constructors.
  // https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/no-parameter-properties.md
  'typescript/no-parameter-properties': 'error',

  // Require the use of the namespace keyword instead of the module keyword to declare custom TypeScript modules
  // https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/prefer-namespace-keyword.md
  'typescript/prefer-namespace-keyword': 'error',

  // Disallows explicit type declarations for variables or parameters initialized to a number, string, or boolean
  // https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/no-inferrable-types.md
  'typescript/no-inferrable-types': [
    'error',
    {
      ignoreProperties: true,
      ignoreParameters: true,
    },
  ],

  // Require explicit return types on functions and class methods
  // https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/explicit-function-return-type.md
  'typescript/explicit-function-return-type': [
    'error',
    {
      allowExpressions: true,
    },
  ],

  // Require a consistent member declaration order
  // https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/member-ordering.md
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
