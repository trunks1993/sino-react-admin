/*
 * @Author: wangzhijian
 * @Date: 2022-04-19 00:31:38
 * @LastEditTime: 2022-04-20 17:21:39
 */
import { LoginParams } from '@/models/login';
import request from '@/utils/request';

/**
 * @description: 登录
 */
export const login = (params: LoginParams) => request('/sino-auth/oauth/token', {
  method: 'POST',
  params: {
    ...params,
    tenant_id: 'sinocare.com',
    grant_type: 'password',
    scope: 'all',
    type: 'account',
  }
});

export const test = () => request('/mp/edu/user/card/add', {
  method: 'POST',
  data: {}
});


// /mp/edu/user/card/add