import React, { useRef, useState } from 'react';
import { QueryParams, RemoveParams } from '@/models/system/role';
import ProCard from '@ant-design/pro-card';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import * as Icon from '@ant-design/icons';
import { Role } from '@/models/system/role';
import { fetchList, remove } from '@/service/system/role';

import { Button, message, Popconfirm } from 'antd';

import ModalSubmit from './components/ModalSubmit';
import ModalAuthGrant from './components/ModalAuthGrant';

const { PlusOutlined } = Icon;

export default () => {

  const [editSubmitData, setEditSubmitData] = useState<null | Role>(null);
  const [currentRole, setCurrentRole] = useState<string>('');

  const columns: ProColumns<Role>[] = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      align: 'center',
      width: 120,
    },
    {
      title: '角色别名',
      dataIndex: 'roleAlias',
      align: 'center',
      width: 120,
      search: false,
    },
    {
      title: '排序',
      width: 120,
      align: 'center',
      dataIndex: 'sort',
      search: false,
    },
    {
      title: '操作',
      width: 180,
      align: 'center',
      key: 'option',
      valueType: 'option',
      render: (data: any) => [
        <a key="link" onClick={() => setEditSubmitData(data.props.record)}>编辑</a>,
        <a key="auth" onClick={() => setCurrentRole(data.props.record.id)}>分配权限</a>,
        <Popconfirm
          title="是否删除"
          onConfirm={() => handleRemove({ ids: data.props.record.id })}
          okText="确认"
          cancelText="取消"
          key="delete"
        >

          <a>删除</a>,
        </Popconfirm>
      ],
    },
  ];

  const tableRef = useRef<ActionType>();

  const handleRemove = async(params: RemoveParams) => {
    const [success] = await remove(params);
    if (!success) return;
    message.success('操作成功');
    handleSubmitDone(true);
  };

  const handleSubmitDone = (refresh: boolean) => {
    setEditSubmitData(null);
    if (refresh) tableRef.current?.reset && tableRef?.current?.reset();
  };

  const handleAuthGrantDone = () => {
    setCurrentRole('');
  };

  return (
    <>
      <ModalSubmit
        editData={editSubmitData}
        onDone={handleSubmitDone}
      />
      <ModalAuthGrant
        onDone={handleAuthGrantDone}
        roleId={currentRole}
      />
      <ProCard>
        <ProTable<any>
          actionRef={tableRef}
          columns={columns}
          request={async(params) => {
            const [success, data] = await fetchList(params as QueryParams);
            return Promise.resolve({
              success,
              data,
            });
          }}
          rowKey={item => item.id}
          pagination={false}
          toolBarRender={() => [
            <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => setEditSubmitData({})}>
              新建
            </Button>,
          ]}
        />
      </ProCard>
    </>
  );
};
