/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginAction, getMenuAction } from '@/store/frame/actions';
import { useNavigate } from 'react-router-dom';
import { ConnectState } from '@/models';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LoginParams } from '@/models/frame';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadingGlobal = useSelector(({ frameState }: ConnectState) => frameState.loadingGlobal);
  const access_token = useSelector(({ frameState }: ConnectState) => frameState.authInfo.access_token);

  useEffect(() => {
    if (access_token) navigate('/system/menu');
  }, [access_token]);

  const handleLogin = (paramas: LoginParams) => {
    dispatch(getLoginAction(paramas));
  };

  const handleMenu = () => {
    dispatch(getMenuAction());
  };

  return (
    <div className="login">
      <div className="login__title">
        <span className="login__title-logo">
          <img alt="logo" src="https://preview.pro.ant.design/logo.svg" />
        </span>
        <span className="login__title-name">三诺教育平台</span>
      </div>
      <div className="login__form">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          size="large"
        >
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input placeholder="用户名" prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
            <Input.Password placeholder="密码" prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loadingGlobal}>登录</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
