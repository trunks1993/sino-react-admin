import React from 'react';
import { Form, Row } from 'antd';

export interface PlusFormProps<T = Record<string, any>> {
  children: React.ReactNode;
  formSource: T;
  name?: string;
  onSubmit?: (values: T) => void;
}

export interface QueryFormProps<T = Record<string, any>> extends PlusFormProps<T> {
  onFilter?: (values: T) => void;
  collapse?: boolean;
}

function PlusFormInstance<T = Record<string, any>>({ children }: PlusFormProps<T>) {
  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      {children}
    </Form>
  );
}

function QueryForm<T = Record<string, any>>({ children }: QueryFormProps<T>) {
  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Row>
        {children}
        {/* {React.Children.map(child => console.log(child))} */}
      </Row>
    </Form>
  );
}

export default PlusFormInstance;

export { QueryForm };

export interface BaseFormItemProps {
  name: string;
  label?: string;
  placeholder?: string;
}
