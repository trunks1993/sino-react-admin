/*
 * @Author: wangzhijian
 * @Date: 2022-04-06 22:20:57
 * @LastEditTime: 2022-04-23 11:58:05
 */
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import store from '@/store';
import { Provider } from 'react-redux';
import App from './_router.config';

if (module && module.hot) {
  module.hot.accept();
}

const container: any = document.getElementById('root');
// 新 createRoot API 暂时没有声明用any
ReactDOMClient.createRoot(container).render(
  <Provider store={store}>
    <App />
  </Provider>
);
