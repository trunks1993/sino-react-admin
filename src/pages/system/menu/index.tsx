import React, { useRef, useState } from 'react';
import { QueryParams, RemoveParams } from '@/models/system/menu';
import ProCard from '@ant-design/pro-card';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import * as Icon from '@ant-design/icons';
import { Menu } from '@/models/frame';
import { fetchList, remove } from '@/service/system/menu';
import { Button, message, Popconfirm } from 'antd';
import ModalSubmit from './components/ModalSubmit';

const { PlusOutlined } = Icon;

export default () => {

  const [editSubmitData, setEditSubmitData] = useState<null | Menu>(null);

  const columns: ProColumns<Menu>[] = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      width: 120,
      render: (_) => <a>{_}</a>,
    },
    {
      title: '路径',
      dataIndex: 'path',
      align: 'center',
      width: 120,
      search: false,
    },
    {
      title: '图标',
      dataIndex: 'source',
      align: 'center',
      width: 120,
      search: false,
      render: source => React.createElement((Icon as any)[source as any] || 'i'),
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
        <a key="link2" onClick={() => setEditSubmitData({ parentId: data.props.record.id })}>新增子菜单</a>,
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

  return (
    <>
      <ModalSubmit
        editData={editSubmitData}
        onDone={handleSubmitDone}
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
          dateFormatter="string"
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
