import React from 'react';
import { BrowserRouter as Router, useRoutes, Navigate } from 'react-router-dom';
import Layout from '@/frame/layout';
import Login from '@/frame/login';
import Page404 from '@/frame/404';
import AuthRoute from './AuthRoute';
import SystemMenu from '@/pages/system/menu';
import SystemRole from '@/pages/system/role';
import ContentArticle from '@/pages/content/article';

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
          path: '*',
          element: <Page404 />,
        },
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
          path: '/content/article',
          element: (
            <AuthRoute>
              <ContentArticle />
            </AuthRoute>
          ),
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
