import React from 'react';
import { Dropdown, Layout, Menu } from 'antd';
import { DownOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getLogoutAction } from '@/store/frame/actions';
import { ConnectState } from '@/models';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

const { Header } = Layout;

interface HeaderProps {
  className?: string;
}

export default (({ className }) => {
  const dispatch = useDispatch();
  const nick_name = useSelector(({ frameState }: ConnectState) => frameState.authInfo.nick_name);

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
