import { FrameState, AuthInfo, Menu } from '@/models/frame';
import produce from 'immer';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ActionType, FrameAction, getLoginSuccessAction, getLoginFailAction, getAuthMenuClearAction, getAuthMenuFailAction, getAuthMenuSuccessAction } from './actions';
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
    case ActionType.SiderCollapse:
      draft.siderCollapsed = !state.siderCollapsed;
      break;
    case ActionType.Login:
      draft.loadingGlobal = true;
      break;
    case ActionType.LoginSuccess:
      draft.loadingGlobal = false;
      draft.authInfo = action.payload as AuthInfo;
      break;
    case ActionType.Logout:
      draft.authInfo = {};
      break;
    case ActionType.LoginFail:
      draft.loadingGlobal = false;
      break;
    case ActionType.AuthMenu:
      draft.loadingAuthMenu = true;
      break;
    case ActionType.AuthMenuSuccess:
      draft.loadingAuthMenu = false;
      draft.authMenu = action.payload as Menu[];
      break;
    case ActionType.AuthMenuFail:
      draft.loadingAuthMenu = false;
      break;
    case ActionType.AuthMenuClear:
      draft.authMenu = [];
      break;
  }
});

// 异步调用api
function* loginByUsername(action: FrameAction) {
  const [success, data]:Response<AuthInfo> = yield call(login, action.payload);
  if (!success || !data?.access_token){
    yield put(getLoginFailAction());
    return;
  }
  setAuthInfo(data);
  yield put(getLoginSuccessAction(data));
}

function* getAuthMenu() {
  const [success, data]:Response<Menu[]> = yield call(fetchMenu);
  if (!success || !data?.length) {
    yield put(getAuthMenuFailAction());
    return;
  }
  yield put(getAuthMenuSuccessAction(data));
}

function* logout() {
  yield removeAuthInfo();
  yield put(getAuthMenuClearAction());
}

// 此模块的saga处理函数
function* saga() {
  yield all([
    takeLatest(ActionType.AuthMenu, getAuthMenu),
    takeLatest(ActionType.Login, loginByUsername),
    takeLatest(ActionType.Logout, logout),
  ]);
}

export { reducer, saga };
