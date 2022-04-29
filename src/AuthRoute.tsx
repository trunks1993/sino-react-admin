import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { ConnectState } from './models';
import { getLogoutAction, getAuthMenuAction } from './store/frame/actions';
import { extractTree } from './utils';
import { getAuthInfo, hasAuth } from './utils/auth';
import { Button, Result } from 'antd';

interface AuthRouteProps {
  children: JSX.Element;
}

// 提供userInfo的组件
const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const access_token = useSelector(({ frameState }: ConnectState) => frameState.authInfo.access_token);

  const auth = useSelector(({ frameState }: ConnectState) => {
    const { flatten } = extractTree(frameState.authMenu, 'children', ['name', 'id', 'path', 'children', 'category', 'parentId']);
    return hasAuth(flatten, location.pathname);
  });

  const authMenu = useSelector(({ frameState }: ConnectState) => frameState.authMenu);

  useEffect(() => {
    const access_token = getAuthInfo().access_token;
    // 如果token不存则则退出登录
    if (!access_token) dispatch(getLogoutAction());
    // 菜单数据为空则拉取菜单
    if (!authMenu.length) dispatch(getAuthMenuAction());
  }, [location.pathname]);

  const result = (
    <Result
      status="403"
      title="403"
      subTitle="对不起,您没有权限进入此页面."
      extra={<Button type="primary">返回上一页</Button>}
    />
  );

  return <>
    {!access_token ? <Navigate to="/login" replace /> : children}
  </>;
};

// 访问 权限控制 组件
export default AuthRoute;
