import { Breadcrumb, Button, Space, Table } from 'antd'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Api } from '../../api'

const columns = [
  {
    title: 'Contry',
    dataIndex: 'mCountry',
    key: 'contry',
  },
  {
    title: 'Flag',
    dataIndex: 'mFlag',
    key: 'flag',
  },
  {
    title: 'Slug',
    dataIndex: 'mSlug',
    key: 'slug',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_: string, record: any) => <Space>
      <a>Edit</a>
      <a>Delete</a>
    </Space>
  }
]

export const ListOrigin = () => {
  const [dataSource, setDataSource] = React.useState<any[]>([]);

  const loadListOrigin = async () => {
    const { data } = await Api.getInstance().getListOrigin();
    console.log('data: ', data);
    setDataSource(data);
  }

  useEffect(() => {
    loadListOrigin();
  }, [])

  return (
    <>
      <Breadcrumb className="my-2">
        <Breadcrumb.Item>
          <NavLink to='/'>Home</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Origin</Breadcrumb.Item>
      </Breadcrumb>
      <Button className="float-right mb-3">Add New</Button>
      <Table className="clear-both" columns={columns} dataSource={dataSource} pagination={{ pageSize: 10 }} />
    </>
  )
}
