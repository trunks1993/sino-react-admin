import React from 'react';
import { Col, Form, Input } from 'antd';
import { BaseFormItemProps } from './PlusForm';

export interface FormItemInputTextProps extends BaseFormItemProps {
  [key: string]: any;
}

const FormItemInputText:React.FC<FormItemInputTextProps> = ({ name, label, placeholder }) => (
  <Col>
    <Form.Item label={label} name={name}>
      <Input placeholder={placeholder} />
    </Form.Item>
  </Col>
);

export default FormItemInputText;
