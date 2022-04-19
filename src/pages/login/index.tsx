
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
      dispatch(getLoginAction({ username: 'admin', password: '123'}));
    }
    
    return <div>
      <button onClick={handleLogin}>登录{name}</button>
      <button onClick={handleLogout}>退出</button>
    </div> ;
  }
  
  export default Login;
  