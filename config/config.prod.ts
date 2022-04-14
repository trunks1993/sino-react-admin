/*
 * @Author: wangzhijian
 * @Date: 2022-04-06 22:27:05
 * @LastEditTime: 2022-04-10 23:22:51
 */
import path from 'path';
import { merge } from 'webpack-merge';
import baseWebpackConfig from './config';
import constant from './constant';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const { ROOT_PATH } = constant;

const config = merge(baseWebpackConfig, {
  // 指定构建环境
  mode: 'production',
  // 插件
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(ROOT_PATH, './dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
    })
  ],
  optimization: {
    minimize: true,
    minimizer:[
      new TerserPlugin({
        extractComments: false,
        parallel: 4,
        terserOptions: {
          compress: { pure_funcs: ['console.log'] },
        }
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  }
});

export default config;