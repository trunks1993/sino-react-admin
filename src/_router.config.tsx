/*
 * @Author: wangzhijian
 * @Date: 2022-04-21 08:58:26
 * @LastEditTime: 2022-04-21 09:42:06
 */
import React from 'react';
import { BrowserRouter as Router, useRoutes, Navigate } from 'react-router-dom';
import Layout from '@/frame/layout';
import Login from '@/frame/login';
import Module1Page1 from '@/pages/module1/page1';
import Module1Page2 from '@/pages/module1/page2';

const App = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <Navigate to="/module1" replace />,
    },
    {
      path: '/module1',
      element: <Layout />,
      children: [
        {
          path: 'page1',
          element: <Module1Page1 />,
        },
        {
          path: 'page2',
          element: <Module1Page2 />,
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

export default () => {
  return (
    <Router>
      <App />
    </Router>
  );
};
