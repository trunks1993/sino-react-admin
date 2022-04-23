import { FrameState, LoginParams, UserInfo } from '@/models/frame';
import produce from 'immer';
import { Task } from 'redux-saga';
import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { FrameAction, getLoginSuccessAction, LoginAction, FRAME_SIDER_COLLAPSE, FRAME_LOGIN, FRAME_LOGIN_SUCCESS, FRAME_MENU, FRAME_LOGOUT, FRAME_LOGIN_FAIL, getLoginFailAction } from './actions';
import { Response } from '@/models';
import { login, fetchMenu } from '@/service/frame';
import { getToken, setToken, removeToken } from '@/utils/auth';

const initialState: FrameState = {
  siderCollapsed: false,
  loadingGlobal: false,
  userInfo: {
    access_token: getToken(),
  },
};

const reducer = (state = initialState, action: FrameAction) => produce(state, draft => {
  const { type } = action;
  switch (type) {
    case FRAME_SIDER_COLLAPSE:
      draft.siderCollapsed = !state.siderCollapsed;
      break;
    case FRAME_LOGIN:
      draft.loadingGlobal = true;
      break;
    case FRAME_LOGIN_SUCCESS:
      draft.loadingGlobal = false;
      draft.userInfo = action.payload;
      break;
    case FRAME_LOGOUT:
      draft.userInfo = {};
      break;
    case FRAME_LOGIN_FAIL:
      draft.loadingGlobal = false;
      break;
  }
});

// 异步调用api
function* loginByUsername(action: LoginAction) {
  const [success, data]:Response<UserInfo> = yield call(login, action.payload);
  if (!success){
    yield put(getLoginFailAction());
    return;
  }
  if (data.access_token) setToken(data.access_token);
  yield put(getLoginSuccessAction(data));
}

function* getMenu() {
  const [success, data]:Response<any> = yield call(fetchMenu);
  console.log(success, data);
}

function* logout() {
  yield removeToken();
}

// 此模块的saga处理函数
function* saga() {
  yield all([
    takeLatest(FRAME_MENU, getMenu),
    takeLatest(FRAME_LOGIN, loginByUsername),
    takeLatest(FRAME_LOGOUT, logout),
  ]);
}

export { reducer, saga };
