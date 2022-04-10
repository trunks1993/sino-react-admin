/*
 * @Author: wangzhijian
 * @Date: 2022-04-06 22:26:55
 * @LastEditTime: 2022-04-10 19:46:33
 */
import fs from 'fs';
import Mock from 'mockjs';
import md5 from 'js-md5';
import { merge } from 'webpack-merge';
import baseWebpackConfig from './config.js';
import { SERVER_HOST, SERVER_PORT, ROOT_PATH } from './constant.js';
import { map, keys } from 'lodash-es';

const createMock = async (filename, filePath) => {
  // 
  if (filename) {
    const module = await import(`../mock/${filename}`);
    const mockList = module.default;
    
    map(keys(mockList), muKey => {
      const arr = muKey.split(' ');
      const method = arr[0];
      const url = arr[1];
      console.log(method, url);
      Mock.mock(url, method, mockList[muKey]);
    })
  } else {
    const fileNameList = fs.readdirSync(filePath)
    
    map(fileNameList, async value => {
      
      if (!value.includes('.')) {
        createMock('', `${filePath}\\${value}`);
      } else {
        const abUrl = filePath.split(ROOT_PATH + '\\');
        const module = await import(`../${abUrl[1]}/${value}`);
        const mockList = module.default;
        map(keys(mockList), muKey => {
          const arr = muKey.split(' ');
          const method = arr[0];
          const url = arr[1];
          Mock.mock(url, method, mockList[muKey]);
        })
      }
    });
  }
};
createMock('', ROOT_PATH + '\\mock');

let timmer = null;
fs.watch(ROOT_PATH + '\\mock', { recursive: true }, (event, filename) => {
  clearTimeout(timmer);
  timmer = setTimeout(() => {
    // 判断filename是否可用且eventType是否为改变
    if (filename && event === 'change') {
      // 判断mock文件是否有修改
      const currentMd5 = md5(fs.readFileSync(ROOT_PATH + '\\mock' + '\\' + filename));
      const key = md5(filename);
      
      let obj = {};
      try {
        obj = JSON.parse(fs.readFileSync('./mock.json').toString());
      } catch {}

      // filename对应的持久化存储的hash值 与 当前文件发生变化转化的hash值没有改变的时候不触发mock更新
      if (obj[key] === currentMd5) return;

      // mock文件有修改时改变该文件对应的hash值重新持久化 并且调用Mock.mock;
      obj[key] = currentMd5;
      fs.writeFileSync('./mock.json', JSON.stringify(obj));
      setTimeout(() => {
        createMock(filename);
      })
    }
  }, 500);
})

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
    // new mockPlugin() 
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
  }
});

export default config;