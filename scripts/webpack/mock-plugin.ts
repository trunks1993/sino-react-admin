/*
 * @Author: wangzhijian
 * @Date: 2021-07-30 14:21:33
 * @LastEditTime: 2022-04-11 11:55:13
 */
import fs from 'fs';
import Webpack from "webpack";
import glob from 'glob';
import path from 'path';
import { map, keys } from 'lodash';
import Mock from 'mockjs';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// const __mockdirname = path.resolve(__dirname, './mock');
// // console.log('mock', );

// fs.readdirSync(__dirname + '\\mock').map(async value => {
//   const module = await import('../../mock/' + value);
//   console.log(module.default);
//   const mockDraft = module.default;
//   console.log('keys', keys(mockDraft));
// });

class MockPlugin {
  options: any;
  constructor(options: any) {
    this.options = options;
  }


  createMock(filename: string, filePath: string) {
    console.log('-----createMock------', filename, filePath)
    // 
    if (filename) {
      const module = require(`../../src/mock/${filename}`);
      const mockList = module.default;
      console.log('mockList', mockList);
      map(keys(mockList), muKey => {
        const arr = muKey.split(' ');
        const method = arr[0];
        const url = arr[1];
        Mock.mock(url, method, mockList[muKey]);
      })
    } else {
      const fileNameList = fs.readdirSync(filePath)
      map(fileNameList, value => {
        if (!value.includes('.')) {
          this.createMock('', `${filePath}\\${value}`);
        } else {
          const abUrl = filePath.split(this.options.rootPath + '\\');
          const module = require(`../../src/${abUrl[1]}/${value}`);
          const mockList = module.default;
          console.log('mockList', mockList);
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
// createMock('', ROOT_PATH + '\\mock');


  apply(compiler: any) {
    compiler.hooks.afterCompile.tap("watchRun", (compilation: any, callback: any) => {
      const module = require(`../../src/mock/login.ts`);
      setTimeout(() => {
        this.createMock('', this.options.rootPath + '\\mock');
      }, 1000)
    })


    // compiler.hooks
    // console.log(compiler)
    // compiler.plugin('compilation',function(compilation) {
    // })

    // compiler.plugin('watch-run', (watching, callback) => {
    //   // 获取发生变化的文件列表
    //     const changedFiles = watching.compiler.watchFileSystem.watcher.mtimes;
    //     // changedFiles 格式为键值对，键为发生变化的文件路径。
    //     if (changedFiles[filePath] !== undefined) {
    //       // filePath 对应的文件发生了变化
    //       console.log('-----listen------', changedFiles[filePath])
    //     }
    //     callback();
    // });
  }
}

export default MockPlugin;
