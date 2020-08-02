
var path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CleanWebpackPlugin = require('clean-webpack-plugin');

const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  mode: 'production',
  entry: './react-app/src/index.js',
  output: {
    path: path.resolve(__dirname, './public/dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
           loader: 'babel-loader',
             options: 
             {
               presets: ['@babel/preset-react',],
               //plugins: ['react-hot-loader/babel'],
             },
          },
         ]
        },
        {
          test: /\.css$/,
          exclude: /(node_modules)/,
          use: [
            // { loader: 'style-loader' },
            // { loader: 'css-loader' },
            {
              loader: MiniCssExtractPlugin.loader,
              // options: {
              //   hmr: process.env.NODE_ENV === 'development',
              //   publicPath: (resourcePath, context) => {
              //     return path.relative(path.dirname(resourcePath), context) + '/';
              //   },
              //},
            },
            'css-loader',
          ],
        },
        {
          test: /\.scss$/,
          exclude: /(node_modules)/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
        },
        {
          test: /\.png$/,
          exclude: /(node_modules)/,
          use: [
            { loader: 'file-loader' },
          ],
        },
        {
          test: /\.svg$/,
          exclude: /(node_modules)/,
          use: [
            { loader: 'svg-inline-loader' },
          ],
        },
    ]
  },
 plugins: [
   // new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './react-app/src/index.html',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  devServer: {
    hot: true,
  },
}

