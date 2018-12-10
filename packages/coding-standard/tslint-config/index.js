module.exports = {
  extends: [
    'tslint-react',
    'tslint-config-airbnb',
    'tslint-config-security',
    'tslint-config-prettier',
  ],
  rulesDirectory: './rules',

  defaultSeverity: 'error',

  rules: {
    'import-name': false,
    'arrow-parens': false,
    'ban-types': ['Object', 'Boolean', 'Number', 'String', 'Symbol'],
    'callable-types': false,
    'class-name': true,
    curly: true,
    forin: false,
    'interface-name': [false],
    'interface-over-type-literal': false,
    'jsx-boolean-value': ['never'],
    'jsx-no-lambda': [false],
    'jsx-no-multiline-js': [false],
    'jsx-no-string-ref': [false],
    'jsx-wrap-multiline': [false],
    'max-classes-per-file': [false],
    'member-access': [false],
    'member-ordering': [true, 'instance-sandwich'],
    'no-angle-bracket-type-assertion': false,
    'no-bitwise': false,
    'no-conditional-assignment': false,
    'no-empty': false,
    'no-empty-interface': false,
    'no-namespace': [true, 'allow-declarations'],
    'no-reference': false,
    'no-shadowed-variable': false,
    'no-string-literal': false,
    'no-unused-expression': true,
    'object-literal-key-quotes': [false],
    'object-literal-shorthand': false,
    'object-literal-sort-keys': false,
    'only-arrow-functions': [false],
    'ordered-imports': [false],
    'prefer-const': [false],
    'prefer-for-of': false,
    semicolon: [false],
    'space-before-function-paren': [false],
    'switch-default': false,
    'triple-equals': true,
    typedef: [true],
    'unified-signatures': [false],
    'variable-name': false,
    'no-implicit-dependencies': true,
  },

  jsRules: {
    // We use eslint for .js and .jsx, so all the TSLint rules can be disabled.
    'array-type': [false],
    'arrow-parens': false,
    curly: false,
    eofline: false,
    forin: false,
    indent: [false],
    'interface-name': [false],
    'jsx-alignment': false,
    'jsx-no-lambda': [false],
    'jsx-no-multiline-js': [false],
    'jsx-no-string-ref': [false],
    'jsx-wrap-multiline': [false],
    'max-classes-per-file': false,
    'max-line-length': [false],
    'member-access': [false],
    'member-ordering': [false],
    'new-parens': false,
    'no-bitwise': false,
    'no-conditional-assignment': false,
    'no-consecutive-blank-lines': [false],
    'no-empty': false,
    'no-reference': false,
    'no-shadowed-variable': false,
    'no-string-literal': false,
    'no-trailing-whitespace': false,
    'no-unused-expression': false,
    'no-unused-new': false,
    'object-literal-key-quotes': [false],
    'object-literal-shorthand': false,
    'object-literal-sort-keys': false,
    'one-line': [false],
    'only-arrow-functions': [false],
    'ordered-imports': [false],
    'prefer-for-of': false,
    semicolon: [false],
    'switch-default': false,
    typedef: [false],
    'trailing-comma': [false],
    'triple-equals': false,
    'variable-name': false,
    quotemark: [false],
    whitespace: [false],
    'no-only-tests': true,
  },
};
