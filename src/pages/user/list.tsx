import { Breadcrumb, Button, Space, Table } from 'antd'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Api } from '../../api'

const columns = [
  {
    title: 'Name',
    dataIndex: 'mName',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'mEmail',
    key: 'email',
  },
  {
    title: 'Last Login',
    dataIndex: 'mLastLogin',
    key: 'lastLogin',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_: string, record: any) => <Space>
      <a>Ban</a>
    </Space>
  }
]

export const ListUser: React.FC = () => {
  const [dataSource, setDataSource] = React.useState<any[]>([]);

  const loadListUser = async () => {
    const { data } = await Api.getInstance().getListUser();
    setDataSource(data);
  }

  useEffect(() => {
    loadListUser();
  }, [])

  return (
    <>
      <Breadcrumb className="my-2">
        <Breadcrumb.Item>
          <NavLink to='/'>Home</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>User</Breadcrumb.Item>
      </Breadcrumb>
      <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 10 }} />
    </>
  )
}
