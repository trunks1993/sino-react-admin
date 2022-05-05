import React from 'react';
import ProForm, { ModalForm, ProFormDependency, ProFormDigit, ProFormText, ProFormTreeSelect } from '@ant-design/pro-form';
import { fetchList, submit } from '@/service/system/menu';

import { message } from 'antd';
import { extractTree } from '@/utils';
import * as Icon from '@ant-design/icons';
import { Menu } from '@/models/frame';

export interface ModalProps {
  editData: null | Menu;
  onDone: (refresh: boolean) => void;
}

export default (props: ModalProps) => {

  const { onDone, editData } = props;

  return (
    <ModalForm<Menu>
      title={editData?.id ? '编辑' : '新建'}
      visible={!!editData}
      initialValues={editData || {}}
      modalProps={{
        onCancel: () => onDone(false),
        destroyOnClose: true,
      }}
      onFinish={async(values) => {
        const [success] = await submit(values);
        if (!success) return;
        onDone(true);
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
  );
};
