/*
 * @Author: wangzhijian
 * @Date: 2022-04-19 00:31:38
 * @LastEditTime: 2022-04-19 13:34:30
 */
import request from '@/utils/request';

export interface LoginParams {
  username: string,
  password: string,
}
/**
 * @description: 登录
 */
export const login = (data: LoginParams) => request('/user/login', {
  method: 'POST',
  data
});
