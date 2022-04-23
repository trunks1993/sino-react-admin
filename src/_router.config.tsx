/*
 * @Author: wangzhijian
 * @Date: 2022-04-21 08:58:26
 * @LastEditTime: 2022-04-23 17:18:01
 */
import React from 'react';
import { BrowserRouter as Router, useRoutes, Navigate } from 'react-router-dom';
import Layout from '@/frame/layout';
import Login from '@/frame/login';
import SystemUser from '@/pages/system/user';

const Routes = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <Navigate to="/module1" replace />,
    },
    {
      path: '/system',
      element: <Layout />,
      children: [
        {
          path: 'user',
          element: <SystemUser />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login name={''} />,
    },
  ]);
  return element;
};

export default function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}
