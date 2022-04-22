/*
 * @Author: wangzhijian
 * @Date: 2022-04-19 00:20:39
 * @LastEditTime: 2022-04-23 00:28:13
 */
import { take, call, fork, cancel } from 'redux-saga/effects';
import { login } from '@/service/login';
import produce from 'immer';
import { Task } from 'redux-saga';
import { LoginError, LoginParams, LoginResponse, LoginActionReducer } from '@/models/login';
import { Response } from '@/models';
import { LoginAction, LogoutAction, USER_LOGIN, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT } from './actions';
interface LoginState extends LoginResponse {
  isFetching: boolean;
  error: string;
}

const initialState: LoginState = {
  isFetching: false,
  error: '',
  token: '',
};

const reducer = (state = initialState, action: LoginAction<LoginActionReducer>) => produce(state, draft => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN:
      draft.isFetching = true;
      break;
    case USER_LOGIN_SUCCESS:
      draft.token = (payload as LoginResponse).token;
      draft.isFetching = false;
      break;
    case USER_LOGIN_FAIL:
      draft.error = (payload as LoginError).error;
      draft.isFetching = false;
      break;
  }
});

function* loginByUsername(params: LoginParams) {
  const [success, data]:Response<LoginResponse> = yield call(login, params);
  console.log(success, data);
}

// function* logout(data: LogoutAction) {
//   try {
//     console.log('logout', data);
//   } catch (error) {
//     // yield put(getLoginFailAction(JSON.stringify(error)));
//   }
// }



function* saga() {
  // yield all([
  //   takeLatest(USER_LOGIN, loginByUsername),
  //   takeLatest(USER_LOGOUT, logout)
  // ]);

  while (true) {
    const data: LoginAction<LoginParams> = yield take(USER_LOGIN);

    const task: Task = yield fork(loginByUsername, data.payload);

    const action:LoginAction<LoginParams & LoginError> & LogoutAction = yield take([USER_LOGOUT, USER_LOGIN_SUCCESS]);

    if (action.type === USER_LOGOUT) yield cancel(task);

  }
}

export { reducer, saga };
