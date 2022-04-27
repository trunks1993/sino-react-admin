import React from 'react';
import { Form, Input } from 'antd';
import { BaseFormItemProps } from './PlusForm';

export interface FormItemInputTextProps extends Omit<BaseFormItemProps, 'name'> {
  name?: [string, string] | string;
}

const FormItemInputText:React.FC<FormItemInputTextProps> = ({ name }) => (
  <Form.Item name={name}>
    <Input />
  </Form.Item>
);

export default FormItemInputText;
