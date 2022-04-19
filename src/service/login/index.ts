/*
 * @Author: wangzhijian
 * @Date: 2022-04-19 00:31:38
 * @LastEditTime: 2022-04-20 00:31:50
 */
import { LoginParams } from '@/models/login';
import request from '@/utils/request';


/**
 * @description: 登录
 */
export const login = (data: LoginParams) => request('/user/login', {
  method: 'POST',
  data
});
