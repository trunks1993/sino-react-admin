/* eslint-disable @typescript-eslint/ban-ts-comment */
import { extractTree } from '..';
import { setAuthInfo, getAuthInfo, removeAuthInfo, hasAuth } from '../auth';

// beforeEach是在每一个test函数执行之前调用；
// afterEach则是在每一个test函数执行之后调用；
// beforeAll是在所有test函数执行之前调用；
// afterAll则是在所有test函数执行之后调用。
describe('测试授权信息缓存', () => {
  afterEach(() => {
    removeAuthInfo();
  });

  it('测试localStory有值getAuthInfo的获取情况', () => {
    setAuthInfo({ access_token: '123' });
    expect(getAuthInfo()).toEqual({ access_token: '123' });
  });

  it('测试localStory为空getAuthInfo的获取情况', () => {
    expect(getAuthInfo()).toEqual({});
  });
});

describe('路由权限测试', () => {
  const authMenu = [{
    id: '123123',
    parentId: '-1',
    name: '系统管理',
    path: 'system',
    hasChildren: true,
    category: 1,
    children: [
      {
        id: '22222',
        parentId: '123123',
        name: '菜单管理',
        path: 'menu',
        hasChildren: false,
        category: 1,
      }
    ]
  }];
  const { flatten } = extractTree(authMenu, 'children', []);
  it('子路径匹配', () => {
    expect(hasAuth(flatten, '/system/menu')).toEqual(true);
  });
  it('子路径不匹配', () => {
    expect(hasAuth(flatten, '/system/role')).toEqual(false);
  });
  it('根路径不匹配', () => {
    expect(hasAuth(flatten, '/test/menu')).toEqual(false);
  });
  it('前两级都匹配', () => {
    expect(hasAuth(flatten, '/system/menu/test')).toEqual(false);
  });
  it('只有中间匹配', () => {
    expect(hasAuth(flatten, '/system/test/menu')).toEqual(false);
  });
});
