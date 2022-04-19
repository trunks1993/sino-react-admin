/*
 * @Author: wangzhijian
 * @Date: 2022-04-19 00:04:20
 * @LastEditTime: 2022-04-19 21:20:44
 */
import React from 'react';
import { useDispatch } from "react-redux";
import { getLoginAction, getLogoutAction } from '@/store/login';

export default () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(getLogoutAction());
  }

  const handleLogin = () => {
    dispatch(getLoginAction({ username: 'admin', password: '123'}));
  }
  
  return <div>
    <button onClick={handleLogin}>登录</button>
    <button onClick={handleLogout}>退出</button>
  </div> ;
}
