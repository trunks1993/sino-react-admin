/*
 * @Author: wangzhijian
 * @Date: 2022-04-19 00:20:59
 * @LastEditTime: 2022-04-19 00:51:43
 */
import { all, fork } from 'redux-saga/effects';

import { saga } from './login';

export default function* rootSaga() {
  yield all([fork(saga)]);
}
