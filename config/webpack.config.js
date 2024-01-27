const path = require('path');
const fs = require('fs');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  view: path.join(__dirname, '../src/view'),
  public: path.join(__dirname, '../public'),
  assets: 'assets',
  video: 'video',
  image: 'image'
};
const PAGES = fs.readdirSync(PATHS.view).filter(fileName => fileName.endsWith('.pug'));

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    main: PATHS.src
  },
  output: {
    filename: `${ PATHS.assets }/js/[name].js?v=[contenthash:7]`,
    path: PATHS.public,
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendors',
          test: /node_modules/,
          enforce: true
        }
      }
    },
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: false
      })
    ]
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.pug$/i,
        loader: 'pug3-loader',
        options: { pretty: true }
      }, {
        test: /\.js$/i,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      }, {
        test: /\.(woff2?|ttf)$/i,
        type: 'asset/resource'
      }, {
        test: /\.(jpe?g|png|svg|gif)$/i,
        type: 'asset/resource'
      }, {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { url: false, sourceMap: true }
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, postcssOptions: { config: './config/postcss.config.js' } }
          }, {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      }, {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { url: false, sourceMap: true }
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, postcssOptions: { config: './config/postcss.config.js' } }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${ PATHS.assets }/css/[name].css?v=[contenthash:7]`
    }),
    ...PAGES.map(page => new HtmlWebpackPlugin({
      filename: `./${ page.replace(/\.pug/, '.html') }`,
      template: `${ PATHS.view }/${ page }`,
      chunks: ['vendors', 'main'],
      inject: 'body',
      minify: false
    })),
    new CopyWebpackPlugin({
      patterns: [
        { from: `${ PATHS.src }/assets/font`, to: `${ PATHS.assets }/font`, noErrorOnMissing: true },
        { from: `${ PATHS.src }/assets/video`, to: PATHS.video, noErrorOnMissing: true },
        { from: `${ PATHS.src }/assets/image`, to: PATHS.image, noErrorOnMissing: true },
        { from: `${ PATHS.src }/static`, to: '', noErrorOnMissing: true }
      ]
    })
  ]
};
