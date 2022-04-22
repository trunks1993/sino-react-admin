/*
 * @Author: wangzhijian
 * @Date: 2022-04-23 01:09:36
 * @LastEditTime: 2022-04-23 01:46:12
 */
// import { existsSync, writeFileSync, readdirSync } from 'fs';
const { readdirSync } = require('fs');
const { join } = require('path');

let modules = readdirSync(join(__dirname, './src/pages'));
const scopes = []
modules.map(pathname => {
  const dirs = readdirSync(join(__dirname, './src/pages', pathname)).map(dir => ({ name: pathname + '-' + dir }));
  
  scopes.push(...dirs);
})

module.exports = {
  // types: [
  //   { value: "特性", name: "特性:    一个新的特性" },
  //   { value: "修复", name: "修复:    修复一个Bug" },
  //   { value: "文档", name: "文档:    变更的只有文档" },
  //   { value: "格式", name: "格式:    空格, 分号等格式修复" },
  //   { value: "重构", name: "重构:    代码重构，注意和特性、修复区分开" },
  //   { value: "性能", name: "性能:    提升性能" },
  //   { value: "测试", name: "测试:    添加一个测试" },
  //   { value: "工具", name: "工具:    开发工具变动(构建、脚手架工具等)" },
  //   { value: "回滚", name: "回滚:    代码回退" },
  // ],

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

  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  skipQuestions: ['body'],

  // limit subject length
  subjectLimit: 100,
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
};
