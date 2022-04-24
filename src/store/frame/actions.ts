import { LoginParams, Menu, AuthInfo } from '@/models/frame';
// import { Menu } from 'antd';

// sider collapase
export const FRAME_SIDER_COLLAPSE = 'FRAME_SIDER_COLLAPSE';

// 登录
export const FRAME_LOGIN = 'FRAME_LOGIN';
export const FRAME_LOGIN_SUCCESS = 'FRAME_LOGIN_SUCCESS';
export const FRAME_LOGIN_FAIL = 'FRAME_LOGIN_FAIL';

// 登出
export const FRAME_LOGOUT = 'FRAME_LOGOUT';

// 菜单
export const FRAME_MENU = 'FRAME_MENU';
export const FRAME_MENU_SUCCESS = 'FRAME_MENU_SUCCESS';
export const FRAME_MENU_FAIL = 'FRAME_MENU_FAIL';


// action接口
export interface SiderCollapseAction {
  type: typeof FRAME_SIDER_COLLAPSE;
}

export interface LogoutAction {
  type: typeof FRAME_LOGOUT;
}

export interface LoginAction {
  type: typeof FRAME_LOGIN;
  payload: LoginParams;
}

export interface LoginFailAction {
  type: typeof FRAME_LOGIN_FAIL;
}

export interface LoginSuccessAction {
  type: typeof FRAME_LOGIN_SUCCESS;
  payload: AuthInfo;
}

export interface MenuAction {
  type: typeof FRAME_MENU;
}

export interface MenuSuccessAction {
  type: typeof FRAME_MENU_SUCCESS;
  payload: Menu[];
}

export interface MenuFailAction {
  type: typeof FRAME_MENU_FAIL;
}

export type FrameAction = SiderCollapseAction | LoginAction | LoginSuccessAction | LogoutAction | LoginFailAction;

// action api
export const getSiderCollapseAction = (): SiderCollapseAction => ({
  type: FRAME_SIDER_COLLAPSE,
});

export const getLoginAction = (payload: LoginParams): LoginAction => ({
  type: FRAME_LOGIN,
  payload,
});

export const getLogoutAction = (): LogoutAction => ({
  type: FRAME_LOGOUT,
});

export const getLoginSuccessAction = (payload: AuthInfo): LoginSuccessAction => ({
  type: FRAME_LOGIN_SUCCESS,
  payload
});

export const getLoginFailAction = (): LoginFailAction => ({
  type: FRAME_LOGIN_FAIL,
});

export const getMenuAction = (): MenuAction => ({
  type: FRAME_MENU,
});

export const getMenuSuccessAction = (payload: Menu[]): MenuSuccessAction => ({
  type: FRAME_MENU_SUCCESS,
  payload,
});

export const getMenuFailAction = (): MenuFailAction => ({
  type: FRAME_MENU_FAIL,
});
