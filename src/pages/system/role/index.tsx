import React, { useEffect, useRef, useState } from 'react';
import { QueryParams, RemoveParams, RoleGrantParams } from '@/models/system/role';
import ProForm, { ModalForm, ProFormDependency, ProFormDigit, ProFormInstance, ProFormText, ProFormTreeSelect } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import ProTable, { ActionType, ProColumns, TableDropdown } from '@ant-design/pro-table';
import * as Icon from '@ant-design/icons';
import { Role } from '@/models/system/role';
import { fetchList, getAuthMenuKeys, grant, remove, submit } from '@/service/system/role';
import { fetchList as fetchMenuList } from '@/service/system/menu';

import { Button, message } from 'antd';
import { extractTree } from '@/utils';
import { Menu } from '@/models/frame';

const { PlusOutlined } = Icon;

export default () => {

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
        <a key="link" onClick={() => setEditData(data.props.record)}>编辑</a>,
        <a key="auth" onClick={() => handleAuthGrant(data.props.record.id)}>
          分配权限
        </a>,
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
  const roleGrantFormRef = useRef<ProFormInstance>();
  const tableRef = useRef<ActionType>();

  const handleRemove = async(params: RemoveParams) => {
    const [success] = await remove(params);
    if (!success) return;
    message.success('操作成功');
    tableRef.current?.reset && tableRef?.current?.reset();
    setEditData(null);
  };

  const handleAuthGrant = async(id: string) => {
    const [success, data] = await getAuthMenuKeys({ roleIds: id });
    if (success) {
      setRoleGrantParams({
        menuIds: data.menu,
        roleIds: [id],
      });
    }
  };

  const [editData, setEditData] = useState<null | Role>(null);
  const [roleGrantParams, setRoleGrantParams] = useState<RoleGrantParams | null>(null);
  const [authMenuListLoaded, setAuthMenuListLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!editData) formRef?.current?.resetFields();
    else formRef?.current?.setFieldsValue(editData);
  }, [editData]);

  useEffect(() => {
    if (!roleGrantParams) roleGrantFormRef?.current?.resetFields();
    else authMenuListLoaded && roleGrantFormRef?.current?.setFieldsValue(roleGrantParams);
  }, [roleGrantParams, authMenuListLoaded]);

  return (
    <>
      <ModalForm<RoleGrantParams>
        title="权限分配"
        formRef={roleGrantFormRef}
        visible={!!roleGrantParams}
        autoFocusFirstInput
        modalProps={{
          onCancel: () => setRoleGrantParams(null),
        }}
        submitTimeout={2000}
        onFinish={async(values) => {
          const [success] = await grant(values);
          if (!success) return;
          setRoleGrantParams(null);
          message.success('提交成功');
          return true;
        }}
      >
        <ProFormText hidden	name="roleIds" />
        <ProFormTreeSelect
          width="lg"
          name="menuIds"
          fieldProps={{
            multiple: true,
            treeCheckable: true,
          }}
          request={async() => {
            const [success, data] = await fetchMenuList({});
            const { draft } = extractTree<Menu,{ value: string; title: string }>(data, 'children', ['value', 'title'], item => ({ value: item?.id || '', title: item.name || '' }));
            setAuthMenuListLoaded(true);
            return draft;
          }}
        />
      </ModalForm>
      <ModalForm<Role>
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
            name="roleName"
            label="角色名称"
            placeholder="请输入"
            rules={[{ required: true, message: '请输入角色名称' }]}
          />
          <ProFormText
            width="md"
            name="roleAlias"
            label="角色别名"
            placeholder="请输入"
            rules={[{ required: true, message: '请输入角色别名' }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormDigit
            width="md"
            name="sort"
            label="角色排序"
            rules={[{ required: true, message: '请输入菜单排序' }]}
          />
        </ProForm.Group>
      </ModalForm>
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
            <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => setEditData({})}>
              新建
            </Button>,
          ]}
        />
      </ProCard>
    </>
  );
};
