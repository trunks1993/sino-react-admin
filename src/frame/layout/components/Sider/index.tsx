import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Layout, MenuProps } from 'antd';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { getSiderCollapseAction } from '@/store/frame/actions';
import { ConnectState } from '@/models';
import { useNavigate } from 'react-router-dom';
import { extractTree } from '@/utils';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { Menu as AuthMenu } from '@/models/frame';
import * as Icon from '@ant-design/icons';
import { Skeleton } from 'antd';
import { join, reverse } from 'lodash-es';

const { Sider } = Layout;
interface ExPerportyType {
  label?: string;
  key?: string;
  icon?: React.ReactNode;
}

export default () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const siderCollapsed = useSelector(({ frameState }: ConnectState) => frameState.siderCollapsed);
  const loadingAuthMenu = useSelector(({ frameState }: ConnectState) => frameState.loadingAuthMenu);

  const authMenu = useSelector(({ frameState }: ConnectState) => {
    const { draft } = extractTree<AuthMenu, ExPerportyType>(frameState.authMenu, 'children', ['label', 'key', 'icon'], item => {
      return {
        label: item.name,
        key: item.path,
        icon: React.createElement((Icon as any)[item?.source || '']),
      };
    });
    return draft;
  });

  const handleCollapseChange = () => {
    dispatch(getSiderCollapseAction());
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    navigate(join(reverse(e.keyPath), '/'));
  };

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
        {
          loadingAuthMenu ?
            <div style={{ padding: '0 10px' }}>
              <Skeleton paragraph={{ rows: 8 }} />
            </div>
            :
            <Menu mode="inline" items={authMenu} onClick={handleMenuClick} />
        }
      </div>
      <Menu items={collapseMenu} mode="vertical" selectable={false} />
    </Sider>
  );
};
