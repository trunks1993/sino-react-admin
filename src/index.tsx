/*
 * @Author: wangzhijian
 * @Date: 2022-04-06 22:20:57
 * @LastEditTime: 2022-04-11 13:57:02
 */
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import App from './app';
 
if (module && module.hot) {
  module.hot.accept();
}

const enum A {
  X,
}
console.log('A.X', A.X);

const container:any = document.getElementById("root");

// 新 createRoot API 暂时没有声明使用any
ReactDOMClient.createRoot(container).render(<App />);
