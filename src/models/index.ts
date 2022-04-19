/*
 * @Author: wangzhijian
 * @Date: 2022-04-20 00:14:35
 * @LastEditTime: 2022-04-20 00:16:10
 */

export type Response<T> = [boolean, T, string];
export interface Page<T> {
  list: T[];
  total: number;
  page: number;
}