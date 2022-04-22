/*
 * @Author: wangzhijian
 * @Date: 2022-04-19 23:55:03
 * @LastEditTime: 2022-04-23 00:12:34
 */
import { LoginParams, LoginResponse } from '@/models/login';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
export const USER_LOGOUT = 'USER_LOGOUT';

export interface LogoutAction {
  type: typeof USER_LOGOUT;
}

export interface LoginAction<T> {
  type: typeof USER_LOGIN | typeof USER_LOGIN_SUCCESS | typeof USER_LOGIN_FAIL | typeof USER_LOGOUT;
  payload: T;
}

export const getLoginAction = (payload: LoginParams): LoginAction<LoginParams> => ({
  type: USER_LOGIN,
  payload,
});

export const getLoginSuccessAction = (payload: LoginResponse): LoginAction<LoginResponse> => ({
  type: USER_LOGIN_SUCCESS,
  payload
});

export const getLoginFailAction = (payload: string): LoginAction<string> => ({
  type: USER_LOGIN_FAIL,
  payload
});

export const getLogoutAction = (): LogoutAction => ({
  type: USER_LOGOUT
});
