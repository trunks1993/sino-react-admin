/*
 * @Author: wangzhijian
 * @Date: 2022-04-20 00:14:35
 * @LastEditTime: 2022-04-23 21:11:12
 */

import { FrameState } from './frame';

export type Response<T> = [boolean, T | undefined];
export interface Page<T> {
  list: T[];
  total: number;
  page: number
}
export interface ConnectState {
  frameState: FrameState;
}
