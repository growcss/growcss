const config = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-modules-commonjs',
    [
      'babel-plugin-styled-components',
      {
        "ssr": true
      }
    ],
    '@babel/plugin-transform-regenerator'
  ],
  presets: [
    '@babel/typescript',
    '@babel/react',
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'usage'
      }
    ]
  ]
};

if (process.env.NODE_ENV === 'test') {
  config.plugins.push('require-context-hook');

  config.presets[1] = [
    '@babel/preset-react',
    {
      'development': true
    }
  ];
}

module.exports = config;
