import { FrameState, AuthInfo, Menu } from '@/models/frame';
import produce from 'immer';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { FrameAction, getLoginSuccessAction, LoginAction, FRAME_SIDER_COLLAPSE, FRAME_LOGIN, FRAME_LOGIN_SUCCESS, FRAME_MENU, FRAME_LOGOUT, FRAME_LOGIN_FAIL, getLoginFailAction, getMenuSuccessAction, getMenuFailAction, FRAME_MENU_SUCCESS, FRAME_MENU_FAIL, FRAME_MENU_CLEAR, getMenuClearAction } from './actions';
import { Response } from '@/models';
import { login, fetchMenu } from '@/service/frame';
import { getAuthInfo, setAuthInfo, removeAuthInfo } from '@/utils/auth';

const initialState: FrameState = {
  siderCollapsed: false,
  loadingGlobal: false,
  authInfo: getAuthInfo(),
  authMenu: [],
  loadingAuthMenu: false,
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
      draft.authInfo = action.payload;
      break;
    case FRAME_LOGOUT:
      draft.authInfo = {};
      break;
    case FRAME_LOGIN_FAIL:
      draft.loadingGlobal = false;
      break;
    case FRAME_MENU:
      draft.loadingAuthMenu = true;
      break;
    case FRAME_MENU_SUCCESS:
      draft.loadingAuthMenu = false;
      draft.authMenu = action.payload;
      break;
    case FRAME_MENU_FAIL:
      draft.loadingAuthMenu = false;
      break;
    case FRAME_MENU_CLEAR:
      draft.authMenu = [];
      break;
  }
});

// 异步调用api
function* loginByUsername(action: LoginAction) {
  const [success, data]:Response<AuthInfo> = yield call(login, action.payload);
  if (!success || !data?.access_token){
    yield put(getLoginFailAction());
    return;
  }
  setAuthInfo(data);
  yield put(getLoginSuccessAction(data));
}

function* getMenu() {
  const [success, data]:Response<Menu[]> = yield call(fetchMenu);
  if (!success || !data?.length) {
    yield put(getMenuFailAction());
    return;
  }
  yield put(getMenuSuccessAction(data));
}

function* logout() {
  yield removeAuthInfo();
  yield put(getMenuClearAction());
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
