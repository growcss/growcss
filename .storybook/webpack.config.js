const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push(
    {
      test: /\.(js|ts|tsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: { cacheDirectory: true },
    }
  );

  defaultConfig.plugins.push(new TSDocgenPlugin());
  defaultConfig.resolve.extensions.push('.ts', '.tsx', '.js');
  defaultConfig.externals = {
      'jsdom': 'window',
      'cheerio': 'window',
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window',
      'react/addons': true,
  };

  return defaultConfig;
};
