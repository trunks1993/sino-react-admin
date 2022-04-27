/*
 * @Author: wangzhijian
 * @Date: 2022-04-19 00:20:59
 * @LastEditTime: 2022-04-23 21:37:02
 */
import { all, call, spawn } from 'redux-saga/effects';

import { saga as frameSaga } from './frame';
import { saga as systemMenuSaga } from './system/menu';

export default function* rootSaga() {

  const sagas = [frameSaga, systemMenuSaga];

  const spawns = sagas.map(saga => spawn(function* () {
    while (true) {
      try {
        // saga出错会退出call阻塞，
        // while循环再次调用call重新阻塞执行saga
        yield call(saga);
        break;
      } catch (e) {
        // 错误处理，例如上报运行错误
        console.log(e);
      }
    }
  }));

  yield all(spawns);
}
