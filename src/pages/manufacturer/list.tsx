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
    title: 'Logo',
    dataIndex: 'mLogo',
    key: 'logo',
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

export const ListManufacturer: React.FC = () => {
  const [dataSource, setDataSource] = React.useState<any[]>([])

  const loadListManufacturer = async () => {
    const { data } = await Api.getInstance().getListManufacturer();
    console.log('data: ', data);

    setDataSource(data);
  };

  useEffect(() => {
    loadListManufacturer();
  }, [])

  return (
    <>
      <Breadcrumb className="my-2">
        <Breadcrumb.Item>
          <NavLink to='/'>Home</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Manufacturer</Breadcrumb.Item>
      </Breadcrumb>
      <Button className="float-right mb-3">Add New</Button>
      <Table className="clear-both" columns={columns} dataSource={dataSource} pagination={{ pageSize: 10 }} />
    </>
  )
}
