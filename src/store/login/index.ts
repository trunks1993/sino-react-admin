/*
 * @Author: wangzhijian
 * @Date: 2022-04-19 00:20:39
 * @LastEditTime: 2022-04-19 22:21:37
 */
import { takeLatest, take, takeEvery, put, call, select, fork, all, cancel, cancelled } from "redux-saga/effects";
import { login } from '@/service/login';
import { LoginParams } from '@/service/login';
import produce from 'immer';
import { Task } from "redux-saga";

const USER_LOGIN = "USER_LOGIN";
const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";

const USER_LOGOUT = "USER_LOGOUT";

export interface LoginResponse {
  token: string;
}

export interface LoginError {
  error: string;
}

interface LoginAction<T> {
  type: typeof USER_LOGIN | typeof USER_LOGIN_SUCCESS | typeof USER_LOGIN_FAIL | typeof USER_LOGOUT;
  payload: T;
};

interface LogoutAction {
  type: typeof USER_LOGOUT;
};

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

interface LoginState extends LoginResponse {
  isFetching: Boolean;
  error: string;
}

const initialState: LoginState = {
  isFetching: false,
  error: "",
  token: "",
};

const reducer = (state = initialState, action: LoginAction<LoginParams & LoginResponse & LoginError>) => produce(state, draft => {
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

function* loginByUsername(data: LoginParams) {
  try {
    const res: LoginResponse = yield call(login, data);
    console.log(res);
    yield put(getLoginSuccessAction(res));
    return res.token;
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