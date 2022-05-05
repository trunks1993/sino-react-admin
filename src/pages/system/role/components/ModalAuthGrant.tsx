import React, { useEffect, useRef, useState } from 'react';
import { AuthGrantParams } from '@/models/system/role';
import { ModalForm, ProFormInstance, ProFormText, ProFormTreeSelect } from '@ant-design/pro-form';
import { fetchAuthMenuKeys, grant } from '@/service/system/role';
import { fetchList as fetchMenuList } from '@/service/system/menu';

import { message } from 'antd';
import { extractTree } from '@/utils';
import { Menu } from '@/models/frame';

interface ModalProps {
  onDone: (refresh: boolean) => void;
  roleId: string;
}

export default (props: ModalProps) => {

  const { onDone, roleId } = props;

  const formRef = useRef<ProFormInstance>();

  const [submitBtnLoading, setSubmitBtnLoading] = useState<boolean>(false);

  const getAuthMenuKeys = async(id: string) => {
    setSubmitBtnLoading(true);
    const [success, data] = await fetchAuthMenuKeys({ roleIds: id });
    setSubmitBtnLoading(false);
    if (success) {
      formRef.current?.setFieldsValue({
        menuIds: data.menu,
        roleIds: [id],
      });
    }
  };

  useEffect(() => {
    if (roleId) getAuthMenuKeys(roleId);
  }, [roleId]);

  return (
    <ModalForm<AuthGrantParams>
      title="权限分配"
      formRef={formRef}
      visible={!!roleId}
      autoFocusFirstInput
      modalProps={{
        onCancel: () => onDone(false),
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={async(values) => {
        setSubmitBtnLoading(true);
        const [success] = await grant(values);
        setSubmitBtnLoading(false);
        if (!success) return;
        onDone(true);
        message.success('提交成功');
        return true;
      }}
      submitter={{
        // render: (_, dom) => (authMenuKeysLoading ? null : dom),
        submitButtonProps: {
          loading: submitBtnLoading,
        }
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
          return draft;
        }}
      />
    </ModalForm>
  );
};
