import { AuthInfo, Menu } from '@/models/frame';
import Cookies from 'js-cookie';
import { find, reduce, filter } from 'lodash-es';

export const AUTH_KEY = 'Sino-Auth';
export const CLIENT_ID = 'sino-mgr'; // 客户端id
export const CLIENT_SECRET = 'sino-platform-mgr'; // 客户端密钥

export const getToken = () => Cookies.get(AUTH_KEY);

export const setToken = (token: string) => Cookies.set(AUTH_KEY, token);

export const removeToken = () => Cookies.remove(AUTH_KEY);

export const setAuthInfo = (data: AuthInfo) => localStorage.setItem(AUTH_KEY, JSON.stringify(data));

export const getAuthInfo = () => JSON.parse(localStorage.getItem(AUTH_KEY) || '{}');

export const removeAuthInfo = () => localStorage.removeItem(AUTH_KEY);

export const API_LOGIN = process.env.BASE_API + '/sino-auth/oauth/token';

export const whiteUrls = [API_LOGIN];

export interface CustomHeader extends Headers {
  [AUTH_KEY]: string;
  Authorization: string;
}

// 判断当前路由是否属于权限菜单
export function hasAuth(authMenu: Menu[] = [], pathname = '/'): boolean {
  const paths: string[] = filter(pathname.split('/'), (item: string) => item !== '');
  let hasAuth = true;
  reduce(paths, (pid: string, currentPath: string): string => {
    const currentRoute = find(authMenu, item => item.path === currentPath);
    const id = currentRoute?.id;
    // 如果pid不存在说明是第一次遍历
    // 则直接把当前id设为顶层路径pid
    // 如果无顶层id 直接设为无权限false
    if (!pid) {
      if (!id) hasAuth = false;
      else return id;
    }
    // 下次遍历为子路径
    // 如果当前id不存则直接设为false
    // 子路径parentId一定要等于前面的pid 否则无权限
    const parentId = currentRoute?.parentId;
    if (!id || parentId !== pid) hasAuth = false;
    return id || '';
  }, '');
  return hasAuth;
}
