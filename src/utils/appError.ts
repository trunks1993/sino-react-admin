/*
 * @Author: wangzhijian
 * @Date: 2022-04-20 15:27:01
 * @LastEditTime: 2022-04-23 22:34:12
 */
export const HTTP_ERROR = 'HTTP_ERROR'; // 服务端错误
export const SYSTEM_ERROR = 'SYSTEM_ERROR'; // 系统错误
export const AUTH_ERROR = 'AUTH_ERROR'; // 权限错误
export const RESPONSE_ERROR = 'RESPONSE_ERROR'; // 接口返回参数错误

export const HTTP_SUCCESS = 200; // 权限错误

export const code2Message: {[code: number]: string} = {
  400: HTTP_ERROR,
  401: AUTH_ERROR,
  405: HTTP_ERROR,
  500: HTTP_ERROR,
  502: HTTP_ERROR,
  503: HTTP_ERROR,
  504: HTTP_ERROR,
};

export class AppError extends Error {
  constructor(name: string, message: string) {
    super(message);
    this.name = name;
  }
}
