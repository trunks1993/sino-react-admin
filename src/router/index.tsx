/*
 * @Author: wangzhijian
 * @Date: 2022-04-21 08:58:26
 * @LastEditTime: 2022-04-21 09:42:06
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';
import Layout from '@/frame/layout';
import Login from '@/frame/login';
import Page1 from '@/pages/page1';

// 声明式路由
// export default () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout />} >
//           <Route path="/page1" element={<Page1 name="page1" />} />
//         </Route>
//         <Route path="/login" element={<Login name="login" />} />
//       </Routes>
//     </Router>
//   );
// };

const App = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/Page1",
          element: <Page1 name={''} />
        },
      ]
    },
    { path: "/login", element: <Login name={''} /> }
  ]);
  
  return element;
}

export default () => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  return (
    <Router>
      <App />
    </Router>
  );
};

