/*
 * @Author: wangzhijian
 * @Date: 2022-04-23 01:43:50
 * @LastEditTime: 2022-04-23 02:15:18
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'code']
    ]
  }
};
