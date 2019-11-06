const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        }
      },
      {
        loader: 'react-docgen-typescript-loader',
        options: {
          propFilter: function (props, component) {
            if (props.parent) {
              return !props.parent.fileName.includes('node_modules')
            }

            return true
          }
        }
      },
    ],
  });

  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.alias['styled-components'] = path.resolve(__dirname, '..', '..', '..', 'common', 'temp', 'node_modules', 'styled-components');

  config.plugins.push(new CheckerPlugin());

  // Return the altered config
  return config;
};

// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.(ts|tsx)$/,
//         exclude: /node_modules/,
//         use: [
//           {
//             loader: 'babel-loader',
//             query: {
//               cacheDirectory: true
//             }
//           },
// //          {
// //            loader: 'awesome-typescript-loader'
// //          },
//           {
//             loader: 'react-docgen-typescript-loader',
//             options: {
//               propFilter: function (props, component) {
//                 if (props.parent) {
//                   return !props.parent.fileName.includes('node_modules')
//                 }
//
//                 return true
//               }
//             }
//           },
//         ],
//       },
//       {
//         test: /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/,
//         loader: require.resolve('file-loader'),
//         query: {
//           name: 'static/media/[name].[ext]',
//         },
//       },
//     ]
//   },
// };
