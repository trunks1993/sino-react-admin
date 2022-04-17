/*
 * @Author: wangzhijian
 * @Date: 2022-04-06 22:26:55
 * @LastEditTime: 2022-04-18 02:32:18
 */
import Webpack from "webpack";
import { join, resolve } from 'path';
import Mock from 'mockjs';
import md5 from 'js-md5';
import { merge } from 'webpack-merge';
import baseWebpackConfig from './config';
import constant from './constant';
import { createMiddleware } from 'umi-mock';
import portfinder from 'portfinder';

const { SERVER_HOST, SERVER_PORT, ROOT_PATH } = constant;

const config = merge(baseWebpackConfig, {
  // 指定构建环境
  mode: 'development',
  // 控制台信息简化
  stats: 'errors-only',
  // devtool: 'inline-source-map',
  devtool: 'cheap-module-source-map',
  // 插件
  plugins: [
    // 实际上只开启 hot：true 就会自动识别有无声明该插件，没有则自动引入，但是怕有隐藏问题这里还是手动加上了
    // new MockPlugin({
    //   rootPath: ROOT_PATH
    // }) 
  ],
  // 开发环境本地启动的服务配置
  devServer: {
    host: SERVER_HOST,
    port: SERVER_PORT, // 指定段靠谱
    open: true, // 自动打开网页
    historyApiFallback: true, // 当找不到路径的时候，默认加载index.html文件
    hot: true,
    compress: true, // 一切服务都启用gzip 压缩：
    client: {
      logging: 'error',//只打印报错，其实只要这个配置就好了
      overlay: {  //有报错发生，直接覆盖浏览器视窗，显示错误
        errors: true,
        warnings: false,
      },
    },
    onBeforeSetupMiddleware(devServer: any) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      const { middleware } = createMiddleware({
        cwd: ROOT_PATH,
        config: {},
        absPagesPath: join(ROOT_PATH, 'src/pages'),
        absSrcPath: ROOT_PATH,
        watch: true,
        onError(e: any) {
          console.log(e);
        }
      });
      devServer.app.use(middleware);
    },
  }
} as Webpack.Configuration);

export default config;