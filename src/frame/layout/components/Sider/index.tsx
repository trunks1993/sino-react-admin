/*
 * @Author: wangzhijian
 * @Date: 2022-04-23 17:51:40
 * @LastEditTime: 2022-04-23 21:11:27
 */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Divider, Layout, MenuProps } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { getSiderCollapseAction } from '@/store/frame/actions';
import { ConnectState } from '@/models';
import { reverse, join } from 'lodash-es';
import { useNavigate } from 'react-router-dom';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import MenuItem from 'antd/lib/menu/MenuItem';

const { Sider } = Layout;

export default () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const siderCollapsed = useSelector(({ frameState }: ConnectState) => frameState.siderCollapsed);

  const handleCollapseChange = () => {
    dispatch(getSiderCollapseAction());
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log();
    // const path = join(reverse(e.keyPath), '/');
    navigate(e.key);
  };

  type MenuItem = Required<MenuProps>['items'][number];


  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const siderMenus: MenuItem[] = [
    getItem('首页', 'dashboard', <MailOutlined />),
    // getItem('', '2', <MenuUnfoldOutlined />),
    // getItem('Option 3', '3', <MenuUnfoldOutlined />),

    getItem('系统设置', 'system', <MailOutlined />, [
      getItem('菜单管理', 'menu', <MailOutlined />),
      getItem('用户管理', 'user', <MailOutlined />),
    ]),
  ];


  // const siderMenus: ItemType[] = [
  //   {
  //     label: 'fff',
  //     key: 'about',
  //     itemIcon: <MailOutlined />,
  //   },
  //   {
  //     // type: 'group',
  //     key: 'system',
  //     label: '系统设置',
  //     children: [
  //       {
  //         label: '用户管理',
  //         key: 'user',
  //         itemIcon: <AppstoreOutlined />,
  //       },
  //       {
  //         label: '菜单管理',
  //         key: 'menu',
  //         itemIcon: <AppstoreOutlined />,
  //       },
  //     ]
  //   }
  // ];

  const collapseMenu: ItemType[] = [
    {
      type: 'divider'
    },
    {
      key: 'fold',
      itemIcon: <MenuUnfoldOutlined />,
      onClick: handleCollapseChange
    }
  ];

  return (
    <Sider theme="light" className="sider" trigger={null} collapsible collapsed={siderCollapsed}>
      <div className="sider__wrapper--top">
        <Menu mode="vertical" items={siderMenus} onClick={handleMenuClick} />
      </div>
      <Menu items={collapseMenu} mode="vertical" selectable={false} />
    </Sider>
  );
};
