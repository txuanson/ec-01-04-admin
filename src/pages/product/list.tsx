import { Breadcrumb, Button, Space, Table, TableColumnsType, Tag } from 'antd'
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import React, { ReactNode, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { Api } from '../../api';

interface IVariant {
  mSku: string;
  mVariantType: string;
  mVariantValue: string;
  mPrice: number;
  mStatus: string;
  mProductId: number;
}

interface IProduct {
  key: ReactNode;
  mId: number;
  mName: string;
  mStatus: string;
  mSlug: string;
  category: {
    mId: number;
    mName: string;
    mSlug: string;
  };
  manufacturer: {
    mId: number;
    mName: string;
    mSlug: string;
  };
  origin: {
    mId: number;
    mCountry: string;
    mSlug: string;
  };

  variant: IVariant[];
}

const getStatus = (status: string) => {
  switch (status) {
    case 'IN_STOCK':
      return <Tag color='green'>IN STOCK</Tag>
    case 'OUT_OF_STOCK':
      return <Tag color='red'>OUT OF STOCK</Tag>
    case 'HIDDEN':
      return <Tag>HIDDEN</Tag>
  }
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'mName',
    key: 'name',
  },
  {
    title: 'Status',
    dataIndex: 'mStatus',
    key: 'status',
    render: (status: string) => getStatus(status),
  },
  {
    title: 'Manufacturer',
    dataIndex: ['manufacturer', 'mName'],
    key: 'manufacturer',
    render: (text: string) => <Tag color='red'>{text}</Tag>
  },
  {
    title: 'Origin',
    dataIndex: ['origin', 'mCountry'],
    key: 'origin',
    render: (text: string, record: any) => (
      <Space>
        {/* <img src={`/${record.origin.mFlag}`}></img> */}
        <Tag color='blue'>{text}</Tag>
      </Space>
    )
  },
  {
    title: 'Category',
    dataIndex: ['category', 'mName'],
    key: 'category',
    render: (text: string) => <Tag color='purple'>{text}</Tag>
  },
  {
    title: 'Action',
    key: 'action',
    render: (_: string, record: any) => <Space>
      <a>Add-Variant</a>
      <a>Edit</a>
      <a>Delete</a>
    </Space>
  }
]

const expandedRowRender = (record: IProduct) => {
  const columns: TableColumnsType<IVariant> = [
    { title: 'SKU', dataIndex: 'mSku', key: 'mSku' },
    { title: 'Variant Type', dataIndex: 'mVariantType', key: 'mVariantType' },
    { title: 'Variant Value', dataIndex: 'mVariantValue', key: 'mVariantValue' },
    { title: 'Price', dataIndex: 'mPrice', key: 'mPrice' },
    { title: 'Status', dataIndex: 'mStatus', key: 'mStatus', render: (text: string) => getStatus(text) },
    {
      title: 'Action',
      key: 'action',
      render: (_: string, record: any) => <Space>
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    }
  ];

  return <Table columns={columns} dataSource={record.variant} pagination={false} size='small'></Table>
}

export const ListProduct = () => {
  const [dataSource, setDataSource] = React.useState<IProduct[]>([]);

  const loadListProduct = async () => {
    const { data }: { data: IProduct[] } = await Api.getInstance().getListProduct();
    data.forEach((item) => {
      item.key = item.mId;
    });
    setDataSource(data)
  }

  useEffect(() => {
    loadListProduct()
  }, [])

  return (
    <>
      <Breadcrumb className="my-2">
        <Breadcrumb.Item>
          <NavLink to='/'>Home</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Product</Breadcrumb.Item>
      </Breadcrumb>
      <Button className="float-right mb-3">Add New</Button>
      <Table expandable={{ expandedRowRender }} className="clear-both" columns={columns} dataSource={dataSource} pagination={{ pageSize: 10 }} />
    </>
  )
}
