/*
 * @Author: wangzhijian
 * @Date: 2022-04-20 09:22:05
 * @LastEditTime: 2022-04-23 23:13:00
 */
import React from 'react';
import { Outlet } from 'react-router';
import { Layout, Skeleton } from 'antd';
import Sider from './components/Sider';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import { ConnectState } from '@/models';
const { Content } = Layout;

const Container = () => {

  const loadingAuthMenu = useSelector(({ frameState }: ConnectState) => frameState.loadingAuthMenu);

  return (
    <Layout className="app">
      <Header className="app__header" />
      <Layout className="app__main">
        <Sider />
        <Content className="app__main-content">
          {
            loadingAuthMenu ?
              <div style={{ padding: '0 10px' }}>
                <Skeleton paragraph={{ rows: 6 }} />
              </div>
              :
              <Outlet />
          }
        </Content>
      </Layout>
    </Layout>
  );
};
export default Container;
