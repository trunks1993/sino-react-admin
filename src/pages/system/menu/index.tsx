import React, { useEffect, useRef, useState } from 'react';
import { QueryParams, RemoveParams } from '@/models/system/menu';
import ProForm, { ModalForm, ProFormDependency, ProFormDigit, ProFormInstance, ProFormText, ProFormTreeSelect } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import ProTable, { ActionType, ProColumns, TableDropdown } from '@ant-design/pro-table';
import * as Icon from '@ant-design/icons';
import { Menu } from '@/models/frame';
import { fetchList, remove, submit } from '@/service/system/menu';
import { extractTree } from '@/utils';
import { Button, message } from 'antd';

const { PlusOutlined } = Icon;

export default () => {

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
      // sorter: (a, b) => a.containers - b.containers,
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
      // sorter: (a, b) => a.sort || 0 - (b.sort || 0),
      search: false,
    },
    {
      title: '操作',
      width: 180,
      align: 'center',
      key: 'option',
      valueType: 'option',
      render: (data: any) => [
        <a key="link" onClick={() => setEditData(data.props.record)}>编辑</a>,
        <a key="link2" onClick={() => setEditData({ parentId: data.props.record.id })}>新增子菜单</a>,
        <TableDropdown
          key="actionGroup"
          menus={[
            { key: 'delete', name: '删除', onClick: () => handleRemove({ ids: data.props.record.id }) },
          ]}
        />,
      ],
    },
  ];

  const formRef = useRef<ProFormInstance>();
  const tableRef = useRef<ActionType>();

  const handleRemove = async(params: RemoveParams) => {
    const [success] = await remove(params);
    if (!success) return;
    message.success('操作成功');
    tableRef.current?.reset && tableRef?.current?.reset();
    setEditData(null);
  };

  const [editData, setEditData] = useState<null | Menu>(null);

  useEffect(() => {
    if (!editData) formRef?.current?.resetFields();
    else formRef?.current?.setFieldsValue(editData);
  }, [editData]);

  return (
    <>
      <ModalForm<Menu>
        title={editData?.id ? '编辑' : '新建'}
        formRef={formRef}
        visible={!!editData}
        autoFocusFirstInput
        modalProps={{
          onCancel: () => setEditData(null),
        }}
        submitTimeout={2000}
        onFinish={async(values) => {
          const [success] = await submit(values);
          if (!success) return;
          tableRef.current?.reset && tableRef?.current?.reset();
          setEditData(null);
          message.success('提交成功');
          return true;
        }}
      >
        <ProFormText hidden	name="id" />
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="菜单名称"
            placeholder="请输入"
            rules={[{ required: true, message: '请输入菜单名称' }]}
          />
          <ProFormText
            width="md"
            name="path"
            label="路径"
            placeholder="请输入"
            rules={[{ required: true, message: '请输入路径' }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormTreeSelect
            width="md"
            request={async() => {
              const [success, data] = await fetchList({});
              const { draft } = extractTree<Menu,{ value: string; title: string }>(data, 'children', ['value', 'title'], item => ({ value: item?.id || '', title: item.name || '' }));
              return draft;
            }}
            name="parentId"
            label="上级菜单"
            placeholder="请输入"
            // rules={[{ required: true, message: '请选择父级菜单' }]}
          />
          <ProFormDigit
            width="md"
            name="sort"
            label="菜单排序"
            rules={[{ required: true, message: '请输入菜单排序' }]}
          />
        </ProForm.Group>
        <ProFormDependency name={['source']}>
          {({ source }) => {
            return (
              <ProFormText
                width="md"
                name="source"
                label={<>图标{React.createElement((Icon as any)[source] || 'i', { style: { marginLeft: '5px' } })}</>}
              />
            );
          }}
        </ProFormDependency>
      </ModalForm>
      <ProCard>
        <ProTable<any>
          actionRef={tableRef}
          columns={columns}
          request={async(params) => {
            const [success, data] = await fetchList(params as QueryParams);
            console.log('data', data);
            return Promise.resolve({
              success,
              data,
            });
          }}
          rowKey={item => item.id}
          pagination={false}
          dateFormatter="string"
          toolBarRender={() => [
            <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => setEditData({})}>
              新建
            </Button>,
          ]}
        />
      </ProCard>
    </>
  );
};
