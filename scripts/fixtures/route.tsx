/*
 * @Author: wangzhijian
 * @Date: 2022-04-21 08:58:26
 * @LastEditTime: 2022-04-21 09:42:06
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useRoutes, Navigate } from 'react-router-dom';
import Layout from '@/frame/layout';
import Login from '@/frame/login';

const App = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <Navigate to="/module1" replace />,
    },
    {
      path: '/module1',
      element: <Layout />,
      children: [],
    },
    {
      path: '/module2',
      element: <Layout />,
      children: [],
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
