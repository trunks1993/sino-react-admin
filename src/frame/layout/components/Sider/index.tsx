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
    const path = join(reverse(e.keyPath), '/');
    navigate(path);
  };

  return (
    <Sider theme="light" className="sider" trigger={null} collapsible collapsed={siderCollapsed}>
      <div className="sider__wrapper--top">
        <Menu mode="inline" defaultSelectedKeys={['user']} onClick={handleMenuClick}>
          <Menu.Item key="about" icon={<MailOutlined />}>
            首页
          </Menu.Item>
          <Menu.SubMenu key="/system" title="系统设置" icon={<SettingOutlined />}>
            <Menu.Item key="user" icon={<AppstoreOutlined />}>
              用户管理
            </Menu.Item>
            <Menu.Item key="menu" icon={<AppstoreOutlined />}>
              菜单管理
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
      <div>
        <Divider style={{ margin: 0 }} />
        <Menu mode="vertical" selectable={false} >
          <Menu.Item key="fold" icon={<MenuUnfoldOutlined />} onClick={handleCollapseChange} />
        </Menu>
      </div>
    </Sider>
  );
};
