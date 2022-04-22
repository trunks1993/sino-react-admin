/*
 * @Author: wangzhijian
 * @Date: 2022-04-20 00:14:35
 * @LastEditTime: 2022-04-23 02:28:39
 */

export type Response<T> = [boolean, T];
export interface Page<T> {
  list: T[];
  total: number;
  page: number;
}
