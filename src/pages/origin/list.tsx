import { Button, Space, Table } from 'antd'
import React from 'react'

const data = [
  {
    "mId": 1,
    "mCountry": "VietNam",
    "mFlag": "",
    "mCreatedAt": "2022-07-08T00:00:00.000Z",
    "mModifiedAt": "2022-08-20T17:18:34.683Z",
    "mSlug": "vietnam-1"
  },
  {
    "mId": 2,
    "mCountry": "USA",
    "mFlag": "",
    "mCreatedAt": "2022-07-08T00:00:00.000Z",
    "mModifiedAt": "2022-08-20T17:18:34.977Z",
    "mSlug": "usa-2"
  },
  {
    "mId": 3,
    "mCountry": "ThaiLand",
    "mFlag": "",
    "mCreatedAt": "2022-07-08T00:00:00.000Z",
    "mModifiedAt": "2022-08-20T17:18:35.164Z",
    "mSlug": "thailand-3"
  },
  {
    "mId": 4,
    "mCountry": "China",
    "mFlag": "",
    "mCreatedAt": "2022-07-08T00:00:00.000Z",
    "mModifiedAt": "2022-08-20T17:18:35.358Z",
    "mSlug": "china-4"
  }
]

const columns = [
  {
    title: 'ID',
    dataIndex: 'mId',
    key: 'id',
  },
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
  return (
    <div>
      <Button className="float-right mb-3">Add Origin</Button>
      <Table className="clear-both" columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
    </div>
  )
}
