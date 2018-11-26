module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/syntax-dynamic-import',
    'babel-plugin-styled-components',
    'polished'
  ],
  presets: [
    '@babel/react'
  ],
  'env': {
    'test': {
      'presets': [
        '@babel/preset-env'
      ],
      'plugins': [
        '@babel/plugin-transform-regenerator',
        'require-context-hook'
      ]
    },
    'production': {
      'presets': [
        [
          '@babel/preset-env',
          {
            'modules': false
          }
        ]
      ],
      'plugins': [
        '@babel/plugin-transform-regenerator',
        '@babel/plugin-external-helpers'
      ]
    }
  }
};
