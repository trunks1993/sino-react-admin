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
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { MenuItemType } from 'rc-menu/lib/interface';
// import { SubMenuType } from 'antd/lib/menu/hooks/useItems';
const { Header } = Layout;

interface HeaderProps {
  className?: string;
}

export default (({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nick_name = useSelector(({ frameState }: ConnectState) => frameState.authInfo.nick_name);
  const access_token = useSelector(({ frameState }: ConnectState) => frameState.authInfo.access_token);

  useEffect(() => {
    if (!access_token) navigate('/login');
  }, [access_token]);
  const handleLogout = () => {
    dispatch(getLogoutAction());
  };

  const items: ItemType[] = [
    {
      label: '个人中心',
      key: 'minf',
      itemIcon: <UserOutlined />,
    },
    {
      label: '系统设置',
      key: 'system',
      itemIcon: <SettingOutlined />,
    },
    {
      type: 'divider',
    },
    {
      label: '退出登录',
      key: 'login',
      itemIcon: <LogoutOutlined />,
      onClick: handleLogout,
    }
  ];

  return (
    <Header className={className}>
      <div style={{ flex: 1 }} />
      <Dropdown overlay={<Menu items={items} style={{ minWidth: '160px' }} />} placement="bottom">
        <a onClick={e => e.preventDefault()} style={{ marginRight: '20px' }}>
          {nick_name} <DownOutlined />
        </a>
      </Dropdown>
    </Header>
  );
}) as React.FC<HeaderProps>;
