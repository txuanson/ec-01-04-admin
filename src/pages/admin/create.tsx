import { Breadcrumb, Button, Form, Input, message, Space } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Api } from '../../api'

export const CreateAdmin = () => {
  const onFinish = async (values: { mEmail: string, mPassword: string, mName: string }) => {
    const hide = message.loading('Creating...');
    await Api.getInstance().createAdmin(values);
    hide();
    message.success('Admin created');
  }

  return (
    <>
      <Breadcrumb className="my-2">
        <Breadcrumb.Item>
          <NavLink to='/'>Home</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <Form
          className="mx-auto w-96"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
        >
          <Form.Item label="Name" name="mName" required>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="mEmail" required>
            <Input type='email' />
          </Form.Item>
          <Form.Item label="Password" name="mPassword" required>
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 20 }}>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}
