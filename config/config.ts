/* eslint-disable no-mixed-spaces-and-tabs */
/*
 * @Author: wangzhijian
 * @Date: 2022-04-06 22:26:44
 * @LastEditTime: 2022-04-23 00:42:12
 */
import Webpack from 'webpack';
import path from 'path';
import WebpackBar from 'webpackbar';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import constant from './constant';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

// const __filename = url.fileURLToPath(import.meta.url);
const { SERVER_HOST, SERVER_PORT, ROOT_PATH } = constant;

const isProd = process.env.NODE_ENV === 'production';

const getCssLoaders = () => {
  const cssLoaders: any[] = [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    'css-loader'
  ];
  // 开发环境一般用chrome不会有问题，防止开发环境下看样式有一堆前缀影响查看，因此只在生产环境使用
  isProd && cssLoaders.push({
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          [
            'postcss-preset-env',
            {
              autoprefixer: {
                grid: true
              }
            }
          ]
        ]
      }
    }
  });
  return cssLoaders;
};

export default {
  entry: {
    app: path.resolve(ROOT_PATH, './src/index')
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(ROOT_PATH, './dist'),
    publicPath: '/',
  },
  resolve: {
    alias: {
      '@': path.resolve(ROOT_PATH, './src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|ts)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [...getCssLoaders()],
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(),
          {
            loader: 'less-loader',
            options: {
              sourceMap: !isProd,
            }
          }
        ]
      },
      // {
      //   test: /\.(svg)$/,
      //   type: 'asset/source',
      //   generator: {
      //   // 打包到 dist/image 文件下
      //     filename: 'img/[contenthash][ext][query]',
      //   },
      // },
    ],
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.BASE_API': '"/api"',
    }),
  	new HtmlWebpackPlugin({
      template: path.resolve(ROOT_PATH, './public/index.html'),
    }),
    new WebpackBar({
      name: !isProd ? `trunksss ${SERVER_HOST}:${SERVER_PORT}` : 'trunksss',
      color: '#52c41a'
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(ROOT_PATH, './tsconfig.json'),
      },
    }),
  ]
} as Webpack.Configuration;
