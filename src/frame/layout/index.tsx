/*
 * @Author: wangzhijian
 * @Date: 2022-04-20 09:22:05
 * @LastEditTime: 2022-04-21 09:24:39
 */
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

export default () => {
  let navigate = useNavigate();
  // 下面两种写法等同
  useEffect(() => {
    // navigate('/module1/12', { replace: true });
  }, []);
  return (
    <div>
      layout
      <Outlet />
    </div>
  );
};
