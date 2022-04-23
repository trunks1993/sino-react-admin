/*
 * @Author: wangzhijian
 * @Date: 2022-04-23 01:09:36
 * @LastEditTime: 2022-04-23 11:48:46
 */
// import { existsSync, writeFileSync, readdirSync } from 'fs';
const { readdirSync } = require('fs');
const { join } = require('path');

let modules = readdirSync(join(__dirname, './src/pages'));
const scopes = []
modules.map(pathname => {
  const dirs = readdirSync(join(__dirname, './src/pages', pathname)).map(dir => ({ name: pathname + '-' + dir }));
  
  scopes.push(...[{ name: pathname }, ...dirs]);
})

module.exports = {
  types: [
    {value: 'feat',     name: 'feat:     新功能开发'},
    {value: 'fix',      name: 'fix:      修复一个Bug'},
    {value: 'docs',     name: 'docs:     变更的只有文档'},
    {value: 'style',    name: 'style:    空格, 分号等格式修复不影响主代码逻辑\n            (white-space, formatting, missing semi-colons, etc)'},
    {value: 'refactor', name: 'refactor: 代码重构，注意和特性、修复区分开'},
    {value: 'perf',     name: 'perf:     提升性能'},
    {value: 'test',     name: 'test:     添加一个测试'},
    {value: 'chore',    name: 'chore:    开发工具变动(构建、脚手架工具等)\n            and libraries such as documentation generation'},
    {value: 'revert',   name: 'revert:   代码回退'},
  ],

  scopes,

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:",
    scope: '\nDenote the SCOPE of this change (optional):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?',
  },

  allowCustomScopes: false, // 自定义设置scope
  allowBreakingChanges: ['feat', 'fix'], // 记入日志的类型
  // skip any questions you want
  skipQuestions: ['body', 'breaking', 'footer', 'footer', 'confirmCommit'], // 允许跳过的询问项

  // limit subject length
  subjectLimit: 100,
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
};
