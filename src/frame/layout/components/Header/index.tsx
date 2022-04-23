/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-no-comment-textnodes */
/*
 * @Author: wangzhijian
 * @Date: 2022-04-23 17:51:40
 * @LastEditTime: 2022-04-23 18:39:21
 */
import React, { useEffect } from 'react';
import { Divider, Dropdown, Layout, Menu, MenuProps } from 'antd';
import { DownOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLogoutAction } from '@/store/frame/actions';
import { ConnectState } from '@/models';
const { Header } = Layout;

interface HeaderProps {
  className?: string;
}

export default (({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nick_name = useSelector(({ frameState }: ConnectState) => frameState.userInfo.nick_name);
  const access_token = useSelector(({ frameState }: ConnectState) => frameState.userInfo.access_token);

  useEffect(() => {
    if (!access_token) navigate('/login');
  }, [access_token]);
  const handleLogout = () => {
    dispatch(getLogoutAction());
  };

  // const menu = (
  //   <Menu>
  //     <Menu.Item>
  //       <Link to="user">
  //         首页
  //       </Link>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <Link to="user">
  //         个人中心
  //       </Link>
  //     </Menu.Item>
  //     <Divider style={{ margin: 0 }} />
  //     <Menu.Item onClick={handleLogout}>
  //       退出
  //     </Menu.Item>
  //   </Menu>
  // );

  // @ts-ignore
  const items: MenuProps['items'] = [
    {
      label: '个人中心',
      icon: <UserOutlined />,
      style: { minWidth: '160px' }
    },
    {
      label: '系统设置',
      icon: <SettingOutlined />
    },
    {
      type: 'divider'
    },
    {
      label: '退出登录',
      onClick: handleLogout,
      icon: <LogoutOutlined />
    }
  ];

  const menu = (
    // @ts-ignore
    <Menu items={items}
    />
  );


  return (
    <Header className={className}>
      <div style={{ flex: 1 }} />
      {/* @ts-ignore */}
      <Dropdown overlay={menu} placement="bottom">
        <a onClick={e => e.preventDefault()} style={{ marginRight: '20px' }}>
          {nick_name} <DownOutlined />
        </a>
      </Dropdown>
    </Header>
  );
}) as React.FC<HeaderProps>;
