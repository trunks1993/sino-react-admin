import React from 'react';
import { BrowserRouter as Router, useRoutes, Navigate } from 'react-router-dom';
import Layout from '@/frame/layout';
import Login from '@/frame/login';
import SystemUser from '@/pages/system/user';
import Page404 from '@/frame/404';
const Routes = () => {
  const element = useRoutes([
    {
      path: '/*',
      element: <Navigate to="system" replace />,
    },
    {
      path: 'system',
      element: <Layout />,
      children: [
        {
          path: 'user',
          element: <SystemUser />,
        },
        {
          path: '*',
          element: <Page404 />,
        },
      ],
    },
    {
      path: 'login',
      element: <Login />,
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
