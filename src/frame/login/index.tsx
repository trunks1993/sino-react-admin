/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginAction } from '@/store/frame/actions';
import { useNavigate } from 'react-router-dom';
import { ConnectState } from '@/models';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LoginParams } from '@/models/frame';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadingGlobal = useSelector(({ frameState }: ConnectState) => frameState.loadingGlobal);
  const access_token = useSelector(({ frameState }: ConnectState) => frameState.authInfo.access_token);

  useEffect(() => {
    if (access_token) navigate('/system/menu');
  }, [access_token]);

  const handleLogin = async(paramas: LoginParams) => {
    dispatch(getLoginAction(paramas));
  };

  return (
    <div className="login">
      {/* <div className="login__title">
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
      </div> */}
      <LoginForm<LoginParams>
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="三诺教育平台"
        subTitle="每测一次都是爱"
        onFinish={handleLogin}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          placeholder={'用户名'}
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          placeholder={'密码'}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <div style={{ marginBottom: 24 }}>
          <ProFormCheckbox noStyle name="autoLogin">自动登录</ProFormCheckbox>
          <a style={{ float: 'right' }}>忘记密码</a>
        </div>
      </LoginForm>
    </div>
  );
};

export default Login;
