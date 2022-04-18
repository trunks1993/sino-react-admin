/*
 * @Author: wangzhijian
 * @Date: 2022-04-19 00:20:39
 * @LastEditTime: 2022-04-19 01:49:14
 */
import { takeLatest, put, call } from "redux-saga/effects";
import { login } from '@/service/login';
import { AnyAction } from "redux";
import { BaseState } from '@/store/index.d';

interface LoginState extends BaseState {
  token: string
}

const initialState: LoginState = {
  loading: false,
  error: "",
  token: ''
};

export interface ResponseGenerator {
  config?:any,
  data?:any,
  headers?:any,
  request?:any,
  status?:number,
  statusText?:string
}

const reducer = (state = initialState, action: string) => {
  return state;
};

function* loginByUsername(data: any) {
  console.log('data', data);
  try {
    const res: Response = yield call(login, data);
    yield put<AnyAction>(res);
  } catch (error) {
    console.log(error);
  }
}

function* saga() {
  yield takeLatest('GET_POSTS', loginByUsername);
}

export { reducer, saga }