/*
 * @Author: wangzhijian
 * @Date: 2022-04-06 22:20:57
 * @LastEditTime: 2022-04-23 18:24:27
 */
import React, { Suspense } from 'react';
import ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { Spin } from 'antd';
import App from './_router.config';
import store from '@/store';


import 'antd/dist/antd.css';
import './global.less';

if (module && module.hot) {
  module.hot.accept();
}

const container: any = document.getElementById('root');
// 新 createRoot API 暂时没有声明使用any
ReactDOMClient.createRoot(container).render(
  <Provider store={store}>
    <Suspense fallback={<Spin />}>
      <App />
    </Suspense>
  </Provider>
);
