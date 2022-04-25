/*
 * @Author: wangzhijian
 * @Date: 2022-04-19 00:31:38
 * @LastEditTime: 2022-04-23 21:36:10
 */
import { LoginParams } from '@/models/frame';
import request from '@/utils/request';
import md5 from 'js-md5';

/**
 * @description: 登录
 */
export const login = ({ username, password }: LoginParams) => request('/sino-auth/oauth/token', {
  method: 'POST',
  params: {
    // ...params,
    username,
    password: md5(password),
    tenant_id: 'sinocare.com',
    grant_type: 'password',
    scope: 'all',
    type: 'account',
  }
});

export const fetchMenu = () => request('/sino-system/menu/routes', {
  method: 'GET',
});
