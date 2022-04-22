/*
 * @Author: wangzhijian
 * @Date: 2022-04-20 00:42:02
 * @LastEditTime: 2022-04-20 10:06:17
 */
import { existsSync, writeFileSync, readdirSync } from 'fs';
import writeNewRoute from './route-generator';
import  { join } from 'path';
import mkdirp from 'mkdirp';
import signale from 'signale';
import inquirer from 'inquirer';
import getPage from './temp/getPage';

(async () => {
  // const args = yParser(process.argv);
  const [binPath, cwdPath, ...pageNames] = process.argv;

  const module = readdirSync(join(__dirname, '../src/pages'))

  const promptList = [
    {
      type: 'input',
      message: '请输入页面名称:',
      name: 'name',
      // default: "pageName" // 默认值
    },
    module.length > 0 ? {
      type: "confirm",
      message: "是否新增模块:",
      name: "isNew",
    } : undefined,
    {
      type: "list",
      message: "选择模块:",
      name: "moduleName",
      choices: module.map(name => ({
        name,
      })),
      when: function(answers: any) {
        return !answers.isNew && module.length > 0
      }
    },
    {
      type: 'input',
      message: '请输入模块名称:',
      name: 'moduleName',
      when: function(answers: any) {
        return answers.isNew === undefined || answers.isNew
      }
    }
  ];

  const res = await inquirer.prompt(promptList.filter(item => item));

  const { name, isNew, moduleName } = res;

  if (!name) {
    return signale.error('please type the page name.');
  }

  const pageIndexPath = join(__dirname, '../src/pages', moduleName, name, 'index.tsx');

  if (isNew || isNew === undefined) {
    await mkdirp(join(__dirname, '../src/pages', moduleName));
  }

  // 判断page是否存在
  if (existsSync(pageIndexPath)) {
    return signale.error('page is already exsist.');
  }

  console.log('test', join(pageIndexPath, '..'));
  // 存在则不创建 不存的话创建dir
  await mkdirp(join(pageIndexPath, '..'));

  // 写入数据
  writeFileSync(pageIndexPath, getPage(name));

  const newRoute = {
    path: name,
    parent: '/' + moduleName,
    element: '',
  }
  
  // 更新路由
  writeNewRoute(newRoute, join(__dirname, '../src/_router.config.tsx'), '');

})();
