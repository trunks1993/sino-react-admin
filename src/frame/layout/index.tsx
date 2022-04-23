/*
 * @Author: wangzhijian
 * @Date: 2022-04-20 09:22:05
 * @LastEditTime: 2022-04-23 23:13:00
 */
import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import { Layout } from 'antd';
const { Content } = Layout;

import Sider from './components/Sider';
import Header from './components/Header';

const Container = () => {
  // 下面两种写法等同
  useEffect(() => {
    console.log('layout');
  }, []);

  return (
    <Layout className="app">
      <Header className="app__header" />
      <Layout className="app__main">
        <Sider />
        <Content className="site-layout-background">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Container;
