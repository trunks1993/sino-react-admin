import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';
import prettier from 'prettier';

export interface NewRoute {
  path: string;
  parent?: string;
  element?: string;
}

/**
 * 将路由写入路由文件
 * @param {*} newRoute 新的路由配置: { path, component, ... }
 * @param {*} configPath 配置路径
 * @param {*} absSrcPath 代码路径
 */
export default function writeNewRoute(newRoute: NewRoute, configPath: string, absSrcPath: string) {
  const { code, routesPath } = getNewRouteCode(newRoute, configPath, absSrcPath);
  writeFileSync(routesPath, code, 'utf-8');
}

/**
 * 获取目标
 * @param {*} configPath
 * @param {*} newRoute
 */
export function getNewRouteCode(newRoute: NewRoute, configPath: string, absSrcPath: string) {
  const ast = parser.parse(readFileSync(configPath, 'utf-8'), {
    sourceType: 'module',
    plugins: ['jsx'],
  });

  let routesNode = null;
  traverse(ast, {
    Program({ node }) {
      // find import
      const { body } = node;
      let lastImportIndex = 0;
      body.forEach((item, index) => {
        if (t.isImportDeclaration(item)) {
          lastImportIndex = index
          const { specifiers } = item;
          const defaultEpecifier = specifiers.find(s => {
            return t.isImportDefaultSpecifier(s) && t.isIdentifier(s.local);
          });
        }
      });
      console.log('lastImportIndex', lastImportIndex);
      body.splice(lastImportIndex + 1, 0, getImportDeclarationAst(newRoute));
    },
    ObjectExpression({ node, parent }) {
      const { properties } = node;
      properties.forEach(p => {
        const { key, value }: any = p;
        if (t.isObjectProperty(p) && t.isIdentifier(key) && key.name === 'path') {
          if (newRoute.parent === value.value) {
            const pp: any = properties.find(cp => t.isObjectProperty(cp) && t.isIdentifier(cp.key) && cp.key.name === 'children');
            routesNode = pp.value;
          }
        }
      });
    },
  });

  // 找到了父节点写入
  if (routesNode) {
    writeRouteNode(routesNode, newRoute);
  }

  const code = generateCode(ast);

  return { code, routesPath: configPath };
}

function getNewRouteNode(newRoute: NewRoute) {
  // @ts-ignore
  return parser.parse(`(${JSON.stringify(newRoute)})`).program.body[0].expression;
}

/**
 * 写入节点
 * @param {*} node 找到的节点
 * @param {*} newRoute 新的路由配置
 */
export function writeRouteNode(targetNode: any, newRoute: NewRoute, currentPath = '/') {
  const { elements } = targetNode;

  const newNodeAst = getNewRouteNode({ path: newRoute.path, element: newRoute.element });
  newNodeAst.properties.forEach((p: any) => {
    const { key } = p;
    if (t.isStringLiteral(key) && key.value === 'element') {
      p.value = getJsxElementAst(newRoute)
    }
  })

  elements.push(newNodeAst);
}

/**
 * 生成代码
 * @param {*} ast
 */
function generateCode(ast: any) {
  const newCode = generate(ast, {}).code;
  return prettier.format(newCode, {
    // format same as ant-design-pro
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 100,
    parser: 'typescript',
  });
}

/**
 * 获取ast
 * @param {*} name
 */
function getJsxElementAst(newRoute: NewRoute) {
  const _name = upperCaseFirstLetter(newRoute.parent + upperCaseFirstLetter(newRoute.path));

  // const attrname = t.jsxIdentifier('test');
  // const source = t.stringLiteral('1');
  // const attr = t.jsxAttribute(attrname, source);
  const nodeName = t.jsxIdentifier(_name);

  const openingElement = t.jsxOpeningElement(nodeName, [], true);

  return t.jSXElement(openingElement, null, [], true);
}

/**
 * 获取ast
 * @param {*} name
 */
 function getImportDeclarationAst(newRoute: NewRoute) {
  const path = '/pages' + newRoute.parent + '/' + newRoute.path
  // const name = newRoute.path;
  const _name = upperCaseFirstLetter(newRoute.parent + upperCaseFirstLetter(newRoute.path));
  console.log('_name', _name);
  const local = t.identifier(_name);
  // const imported = t.Identifier(_name);
  const specifiers = [t.importDefaultSpecifier(local)];
  const source = t.stringLiteral('@' + path);
  return t.importDeclaration(specifiers, source);
}

/**
 * 获取ast
 * @param {*} string
 */
function upperCaseFirstLetter(str: string) {
  let [firstLetter, ...rest] = [...str];

  // 父节点/parent截掉 /
  if (firstLetter === '/') [firstLetter, ...rest] = rest;
  return [firstLetter.toUpperCase(), ...rest].join('');
}
