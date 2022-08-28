import { Button, Form, Input, Space } from 'antd'
import React, { useContext } from 'react'
import { AppContext, ContextType } from '../../context';

export const LoginPage = () => {
  const { login } = useContext<ContextType>(AppContext);
  const onFinish = (values: any) => {
    login("123");
  };

  return (
    <Space align='center' className="w-screen h-screen justify-center">
      <Form
        initialValues={{ remember: true }}
        autoComplete="off"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="mEmail"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type='email' />
        </Form.Item>

        <Form.Item
          label="Password"
          name="mPassword"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Space>
  )
}
