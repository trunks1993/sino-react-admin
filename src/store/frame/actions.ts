import { LoginParams, Menu, AuthInfo } from '@/models/frame';
import { BaseAction } from '@/store';

export enum ActionType {
  SiderCollapse = 'frame/SIDER_COLLAPSE',
  Login = 'frame/LOGIN',
  LoginSuccess = 'frame/LOGIN_SUCCESS',
  LoginFail = 'frame/LOGIN_FAIL',
  Logout = 'frame/LOGOUT',
  AuthMenu = 'frame/AUTH_MENU',
  AuthMenuSuccess = 'frame/AUTH_MENU_SUCCESS',
  AuthMenuFail = 'frame/AUTH_MENU_FAIL',
  AuthMenuClear = 'frame/AUTH_MENU_CLEAR',
}

export type FrameAction =
  BaseAction<ActionType.SiderCollapse>
  | BaseAction<ActionType.Login, LoginParams>
  | BaseAction<ActionType.LoginSuccess, AuthInfo>
  | BaseAction<ActionType.LoginFail>
  | BaseAction<ActionType.Logout>
  | BaseAction<ActionType.AuthMenu>
  | BaseAction<ActionType.AuthMenuSuccess, Menu[]>
  | BaseAction<ActionType.AuthMenuFail>
  | BaseAction<ActionType.AuthMenuClear>;

// action api
export const getSiderCollapseAction = (): BaseAction<ActionType.SiderCollapse> => ({
  type: ActionType.SiderCollapse,
});

export const getLoginAction = (payload: LoginParams): BaseAction<ActionType.Login, LoginParams> => ({
  type: ActionType.Login,
  payload,
});

export const getLoginSuccessAction = (payload: AuthInfo): BaseAction<ActionType.LoginSuccess, AuthInfo> => ({
  type: ActionType.LoginSuccess,
  payload
});

export const getLoginFailAction = (): BaseAction<ActionType.LoginFail> => ({
  type: ActionType.LoginFail,
});

export const getLogoutAction = (): BaseAction<ActionType.Logout> => ({
  type: ActionType.Logout,
});

export const getAuthMenuAction = (): BaseAction<ActionType.AuthMenu> => ({
  type: ActionType.AuthMenu,
});

export const getAuthMenuSuccessAction = (payload: Menu[]): BaseAction<ActionType.AuthMenuSuccess, Menu[]> => ({
  type: ActionType.AuthMenuSuccess,
  payload,
});

export const getAuthMenuFailAction = (): BaseAction<ActionType.AuthMenuFail> => ({
  type: ActionType.AuthMenuFail,
});

export const getAuthMenuClearAction = (): BaseAction<ActionType.AuthMenuClear> => ({
  type: ActionType.AuthMenuClear,
});
