const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');

module.exports = (baseConfig, env, config) => {
    config.module.rules.push();

  config.module.rules.push(
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: { cacheDirectory: true },
    },
    {
      test: /\.(ts|tsx)$/,
      loader: require.resolve('awesome-typescript-loader'),
      exclude: /(node_modules)/,
      query: { cacheDirectory: true },
    }
  );

  config.plugins.push(new TSDocgenPlugin());
  config.resolve.extensions.push('.ts', '.tsx');
  config.externals = {
      'jsdom': 'window',
      'cheerio': 'window',
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window',
      'react/addons': true,
  };

  return config;
};
