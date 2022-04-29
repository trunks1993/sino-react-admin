import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Avatar, Dropdown, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ConnectState } from '@/models';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Menu as AuthMenu } from '@/models/frame';
import * as Icon from '@ant-design/icons';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { getLogoutAction } from '@/store/frame/actions';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { extractTree } from '@/utils';
interface ExPerportyType {
  icon?: React.ReactNode;
}

const Container = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const loadingAuthMenu = useSelector(({ frameState }: ConnectState) => frameState.loadingAuthMenu);
  const authMenu = useSelector(({ frameState }: ConnectState) => {
    const { draft } = extractTree<AuthMenu, ExPerportyType>(frameState.authMenu, 'children', ['path', 'icon', 'name'], item => {
      return {
        icon: React.createElement((Icon as any)[item?.source || ''] || 'i'),
      };
    });
    return draft;
  });

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
    <ProLayout
      disableContentMargin
      route={{ path: '/', routes: authMenu }}
      location={{
        pathname: location.pathname,
      }}
      // loading={loadingAuthMenu}
      fixedHeader
      fixSiderbar
      title="三诺教育平台"
      navTheme="light"
      headerTheme="dark"
      layout="mix"
      logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
      menuItemRender={(item: any, dom: any) => (
        <a
          onClick={() => {
            navigate(item.path || '/welcome');
          }}
        >
          {item.icon}
          {dom}
        </a>
      )}
      rightContentRender={() => (
        // <div>
        //   <Avatar shape="square" size="small" icon={<UserOutlined />} />
        // </div>
        <Dropdown overlay={<Menu items={items} style={{ minWidth: '160px' }} />} placement="bottom">
          <a onClick={e => e.preventDefault()} style={{ marginRight: '20px' }}>
            {/* {nick_name} <DownOutlined /> */}
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
          </a>
        </Dropdown>
      )}
      // {...settings}
    >
      <PageContainer fixedHeader header={{ title: '' }}>
        <Outlet />
      </PageContainer>
    </ProLayout>
  );
};
export default Container;
