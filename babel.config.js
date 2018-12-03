module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-modules-commonjs',
    'babel-plugin-styled-components',
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
    'storybook': {
      'presets': [
        '@babel/preset-env',
      ],
      'plugins': [
        '@babel/plugin-transform-regenerator'
      ]
    },
    'production': {
      'presets': [
        [
          '@babel/preset-env'
        ]
      ],
      'plugins': [
        '@babel/plugin-transform-regenerator'
      ]
    }
  }
};
