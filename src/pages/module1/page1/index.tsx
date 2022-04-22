import React from 'react';
import { useDispatch } from "react-redux";
import { getLoginAction, getLogoutAction } from '@/store/login/actions';

interface Page1Props {
  name?: string;
}

const Page1: React.FC<Page1Props> = ({ name }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(getLogoutAction());
  }

  const handleLogin = () => {
    dispatch(getLoginAction({ username: 'admin', password: '123'}));
  }
  
  return <div>Page1</div> ;
}

export default Page1;
