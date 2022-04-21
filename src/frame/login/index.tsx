/*
 * @Author: wangzhijian
 * @Date: 2022-04-20 09:22:05
 * @LastEditTime: 2022-04-21 10:32:56
 */
  import React from 'react';
  import { useDispatch } from "react-redux";
  import { getLoginAction, getLogoutAction } from '@/store/login/actions';
  
  interface LoginProps {
    name: string;
  }
  
  const Login: React.FC<LoginProps> = ({ name }) => {
    const dispatch = useDispatch();
  
    const handleLogout = () => {
      dispatch(getLogoutAction());
    }
  
    const handleLogin = () => {
      // jun.wei&password=e10adc3949ba59abbe56e057f20f883
      dispatch(getLoginAction({ username: 'jun.wei', password: 'e10adc3949ba59abbe56e057f20f883e'}));
    }
    
    return <div className='container-page'>
      <div className='login__block1'>
        <div className='login__block1-element1'>
          <div className='login__block1-element1-text'></div>
        </div>
      </div>
      <button onClick={handleLogin}>登录{name}</button>
      <button onClick={handleLogout}>退出</button>
    </div>;
  }
  
  export default Login;
  