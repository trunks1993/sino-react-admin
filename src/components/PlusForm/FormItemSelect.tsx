import React from 'react';
import { Form, Input } from 'antd';

export interface FormItemInputTextProps {
  row?: number;
}

export default () => (
  <Form.Item>
    <Input />
  </Form.Item>
);
