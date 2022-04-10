/*
 * @Author: wangzhijian
 * @Date: 2021-07-30 14:21:33
 * @LastEditTime: 2022-04-10 15:20:35
 */
import fs from 'fs';
import http from 'http';
import glob from 'glob';
import path from 'path';
import { map, keys } from 'lodash-es';
import Mock from 'mockjs';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = path.resolve();

const __mockdirname = path.resolve(__dirname, './mock');
// console.log('mock', );

fs.readdirSync(__dirname + '\\mock').map(async value => {
  const module = await import('../../mock/' + value);
  console.log(module.default);
  const mockDraft = module.default;
  console.log('keys', keys(mockDraft));
});

class MockPlugin {
  constructor(options) {
    this.options = options;
  }

  listen() {
    console.log('-----listen------')
  }

  apply(compiler) {
    compiler.hooks.done.tap('mock-plugin', (status) => {
    //   console.log('-----xxx------', xxx);
      
    });
  }
}

export default MockPlugin;
