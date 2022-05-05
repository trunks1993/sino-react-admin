import React, { useRef } from 'react';
import ProForm, { ModalForm, ProFormDigit, ProFormInstance, ProFormText } from '@ant-design/pro-form';
import { Role } from '@/models/system/role';
import { submit } from '@/service/system/role';

import { message } from 'antd';

interface ModalProps {
  editData: null | Role;
  onDone: (refresh: boolean) => void;
}

export default (props: ModalProps) => {

  const { onDone, editData } = props;

  const formRef = useRef<ProFormInstance>();

  return (

    <ModalForm<Role>
      title={editData?.id ? '编辑' : '新建'}
      formRef={formRef}
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
  );
};
