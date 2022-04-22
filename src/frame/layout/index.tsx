/*
 * @Author: wangzhijian
 * @Date: 2022-04-20 09:22:05
 * @LastEditTime: 2022-04-23 01:53:18
 */
import React, { useEffect } from 'react';
import { Outlet } from 'react-router';

const Layout = () => {
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
export default Layout;