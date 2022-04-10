/*
 * @Author: wangzhijian
 * @Date: 2021-05-28 15:44:28
 * @LastEditTime: 2021-05-28 16:22:57
 */
const { extname } = require('path');
// const CSS_EXTNAMES = ['.css', '.scss', '.sass', '.less'];
const CSS_EXTNAMES = ['.css']; // 只处理css文件 其他会导致变慢
module.exports = () => {
  return {
    visitor: {
      ImportDeclaration(path) {
        const { specifiers, source } = path.node;
        const { value } = source;
        if (specifiers.length > 0 && CSS_EXTNAMES.includes(extname(value))) {
          source.value = `${value}?css_modules`; // 在路径末尾加上 css_modules 用于 webpack 匹配该文件，如 import Test from './test.css'; 变成 import Test from './test.css?css_modules';
        }
      },
    },
  };
};
