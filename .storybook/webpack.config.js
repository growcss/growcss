const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');

module.exports = (baseConfig, env, config) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve('awesome-typescript-loader'),
        exclude: /(node_modules)/,
    });

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
