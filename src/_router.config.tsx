import React from 'react';
import { BrowserRouter as Router, useRoutes, Navigate } from 'react-router-dom';
import Layout from '@/frame/layout';
import Login from '@/frame/login';
import Page404 from '@/frame/404';
import AuthRoute from './AuthRoute';
import SystemMenu from '@/pages/system/menu';
import SystemRole from '@/pages/system/role';

const Routes = () => {
  const element = useRoutes([
    {
      path: '/*',
      element: <Navigate to="system/menu" replace />,
    },
    {
      element: <Layout />,
      children: [
        {
          path: '/system/menu',
          element: (
            <AuthRoute>
              <SystemMenu />
            </AuthRoute>
          ),
        },
        {
          path: '/system/role',
          element: (
            <AuthRoute>
              <SystemRole />
            </AuthRoute>
          ),
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
