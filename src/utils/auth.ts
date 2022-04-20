/*
 * @Author: wangzhijian
 * @Date: 2022-04-20 10:16:07
 * @LastEditTime: 2022-04-20 14:19:19
 */
import Cookies from 'js-cookie';

export const AUTH_KEY = 'Sino-Auth';
export const CLIENT_ID = 'sino-mgr'; // 客户端id
export const CLIENT_SECRET = 'sino-platform-mgr'; // 客户端密钥

export const getToken = () => Cookies.get(AUTH_KEY);

export const setToken = (token: string) => Cookies.set(AUTH_KEY, token);

export const removeToken = () => Cookies.remove(AUTH_KEY);

export const API_LOGIN = process.env.BASE_API + '/sino-auth/oauth/token';

export const whiteUrls = [API_LOGIN];

export interface CustomHeader extends Headers {
  [AUTH_KEY]: string;
  Authorization: string;
}
