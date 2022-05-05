import React, { useRef, useState } from 'react';
import { QueryParams, RemoveParams } from '@/models/content/article';
import ProCard from '@ant-design/pro-card';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import * as Icon from '@ant-design/icons';
import { Article } from '@/models/content/article';
import { fetchList, remove } from '@/service/content/article';
import { Button, message, Popconfirm } from 'antd';
// import ModalSubmit from './components/ModalSubmit';

const { PlusOutlined } = Icon;

export default () => {

  const [editSubmitData, setEditSubmitData] = useState<null | Article>(null);

  const columns: ProColumns<Article>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      align: 'center',
      width: 120,
    },
    // {
    //   title: '字段1',
    //   dataIndex: 'key1',
    //   align: 'center',
    //   width: 120,
    // },
    // {
    //   title: '字段2',
    //   width: 120,
    //   align: 'center',
    //   dataIndex: 'key2',
    // },
    {
      title: '操作',
      width: 180,
      align: 'center',
      key: 'option',
      valueType: 'option',
      render: (data: any) => [
        <a key="link" onClick={() => setEditSubmitData(data.props.record)}>编辑</a>,
        <Popconfirm
          title="是否删除"
          onConfirm={() => handleRemove({ ids: data.props.record.id })}
          okText="确认"
          cancelText="取消"
          key="delete"
        >
          <a>删除</a>
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
      {/* <ModalSubmit
        editData={editSubmitData}
        onDone={handleSubmitDone}
      /> */}
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
