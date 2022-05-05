/*
 * @Author: wangzhijian
 * @Date: 2022-04-20 00:42:02
 * @LastEditTime: 2022-04-23 17:05:15
 */
import { existsSync, writeFileSync, readdirSync } from 'fs';
import writeNewRoute from './route-generator';
import { join } from 'path';
import mkdirp from 'mkdirp';
import signale from 'signale';
import inquirer from 'inquirer';
import getPage from './temp/getPage';
import getService from './temp/getService';
import getModel from './temp/getModel';
import getMock from './temp/getMock';

(async() => {
  // const args = yParser(process.argv);
  const module = readdirSync(join(__dirname, '../src/pages'));

  const promptList = [
    {
      type: 'input',
      message: '请输入页面名称:',
      name: 'name',
      // default: "pageName" // 默认值
    },
    module.length > 0 ? {
      type: 'confirm',
      message: '是否选择现有模块:',
      name: 'isSelect',
    } : undefined,
    {
      type: 'list',
      message: '选择模块:',
      name: 'moduleName',
      choices: module.map(name => ({
        name,
      })),
      when: function(answers: any) {
        return answers.isSelect && module.length > 0;
      }
    },
    {
      type: 'input',
      message: '请输入模块名称:',
      name: 'moduleName',
      when: function(answers: any) {
        return answers.isSelect === undefined || !answers.isSelect;
      }
    }
  ];

  const res = await inquirer.prompt(promptList.filter(item => item));

  const { name, isSelect, moduleName } = res;

  if (!name) {
    return signale.error('please type the page name.');
  }

  const pageIndexPath = join(__dirname, '../src/pages', moduleName, name, 'index.tsx');
  const modelIndexPath = join(__dirname, '../src/models', moduleName, `${name}.ts`);
  const serviceIndexPath = join(__dirname, '../src/service', moduleName, `${name}.ts`);
  const mockIndexPath = join(__dirname, '../mock', moduleName, `${name}.ts`);

  if (!isSelect || isSelect === undefined) {
    await mkdirp(join(__dirname, '../src/pages', moduleName));
    await mkdirp(join(__dirname, '../src/models', moduleName));
    await mkdirp(join(__dirname, '../src/service', moduleName));
    await mkdirp(join(__dirname, '../mock', moduleName));
  }

  // 判断page是否存在
  if (existsSync(pageIndexPath)) {
    return signale.error('page is already exsist.');
  }

  // 存在则不创建 不存的话创建dir
  await mkdirp(join(pageIndexPath, '..'));
  // await mkdirp(join(serviceIndexPath, '..'));
  // await mkdirp(join(modelIndexPath, '..'));
  // await mkdirp(mockIndexPath);

  // 写入数据
  writeFileSync(pageIndexPath, getPage(moduleName, name));
  writeFileSync(modelIndexPath, getModel(name));
  writeFileSync(serviceIndexPath, getService(moduleName, name));
  writeFileSync(mockIndexPath, getMock(name));

  const newRoute = {
    path: `/${moduleName}/${name}`,
    parent: '/' + moduleName,
    element: '',
  };

  // 更新路由
  writeNewRoute(newRoute, join(__dirname, '../src/_router.config.tsx'));

})();
