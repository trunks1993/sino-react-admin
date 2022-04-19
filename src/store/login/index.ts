/*
 * @Author: wangzhijian
 * @Date: 2022-04-19 00:20:39
 * @LastEditTime: 2022-04-20 00:31:40
 */
import { takeLatest, take, takeEvery, put, call, select, fork, all, cancel, cancelled } from "redux-saga/effects";
import { login } from '@/service/login';
import produce from 'immer';
import { Task } from "redux-saga";
import { LoginError, LoginParams, LoginResponse, LoginActionReducer } from "@/models/login";
import { Page, Response } from "@/models";
import { getLoginFailAction, getLoginSuccessAction, LoginAction, LogoutAction, USER_LOGIN, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT } from "./actions";
interface LoginState extends LoginResponse {
  isFetching: Boolean;
  error: string;
}

const initialState: LoginState = {
  isFetching: false,
  error: "",
  token: "",
};

const reducer = (state = initialState, action: LoginAction<LoginActionReducer>) => produce(state, draft => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN:
      draft.isFetching = true;
      break;
    case USER_LOGIN_SUCCESS:
      draft.token = payload.token;
      draft.isFetching = false;
      break;
    case USER_LOGIN_FAIL:
      draft.error = payload.error;
      draft.isFetching = false;
      break;
  }
});

function* loginByUsername(params: LoginParams) {
  try {
    const [success, data, msg]:Response<LoginResponse> = yield call(login, params);
    
    console.log(data.token)
  } catch (error) {
    yield put(getLoginFailAction(JSON.stringify(error)));
  } finally {
    const isCancelled: boolean = yield cancelled();
    if (isCancelled) {
      
    }
  }
}

function* logout(data: LogoutAction) {
  try {
    console.log('logout', data);
  } catch (error) {
    // yield put(getLoginFailAction(JSON.stringify(error)));
  }
}



function* saga() {
  // yield all([
  //   takeLatest(USER_LOGIN, loginByUsername), 
  //   takeLatest(USER_LOGOUT, logout)
  // ]);

  while(true) {
    const data: LoginAction<LoginParams> = yield take(USER_LOGIN);

    const task: Task = yield fork(loginByUsername, data.payload);

    const action:LoginAction<LoginParams & LoginError> & LogoutAction = yield take([USER_LOGOUT, USER_LOGIN_SUCCESS]);
    
    if(action.type === USER_LOGOUT) yield cancel(task)
    
  }
}

export { reducer, saga }