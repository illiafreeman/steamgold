const webpack = require('webpack');
const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.config');

const devWebpackConfig = merge(webpackConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  target: 'web',
  devServer: {
    static: {
      directory: webpackConfig.externals.paths.public
    },
    watchFiles: [
      webpackConfig.externals.paths.src
    ],
    compress: false,
    historyApiFallback: true,
    hot: true,
    port: 8081,
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    }
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ]
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});
