import { Breadcrumb, Button, Drawer, Form, Input, InputNumber, message, Modal, Select, Space, Table, TableColumnsType, Tag, Upload } from 'antd'
import ImgCrop from 'antd-img-crop';
import { useForm } from 'antd/es/form/Form';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import React, { ReactNode, useEffect } from 'react'
import ReactQuill from 'react-quill';
import { NavLink } from 'react-router-dom';
import { Api } from '../../api';
import { UploadButton } from '../../components/button/uploadButton';

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
  mDesc: string;
  mManuId: number;
  mOriginId: number;
  mCategoryId: number;
  mPhotos: string[];
  mAvgRating: number;
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

export const ListProduct = () => {
  const [productForm] = useForm();
  const [variantForm] = useForm();

  const [dataSource, setDataSource] = React.useState<IProduct[]>([]);
  const [productVisible, setProductVisible] = React.useState<boolean>(false);
  const [variantVisible, setVariantVisible] = React.useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = React.useState<number | null>(null);
  const [currentSku, setCurrentSku] = React.useState<string | null>(null);
  const [file, setFile] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const [listCategory, setListCategory] = React.useState<any[]>([]);
  const [listOrigin, setListOrigin] = React.useState<any[]>([]);
  const [listManufacturer, setListManufacturer] = React.useState<any[]>([]);

  const loadListProps = () => {
    Api.getInstance().getListCategory().then(({ data }) => {
      setListCategory(data)
    });

    Api.getInstance().getListOrigin().then(({ data }) => {
      setListOrigin(data)
    });

    Api.getInstance().getListManufacturer().then(({ data }) => {
      setListManufacturer(data)
    });
  }

  const loadListProduct = async () => {
    const { data }: { data: IProduct[] } = await Api.getInstance().getListProduct();
    data.forEach((item) => {
      item.key = item.mId;
    });
    setDataSource(data)
  }

  const loadProduct = async (id: number) => {
    const { data }: { data: IProduct } = await Api.getInstance().getProduct(id);
    console.log(data);
    productForm.setFieldsValue({
      mName: data.mName,
      mDesc: data.mDesc,
      mStatus: data.mStatus,
      mCategoryId: data.category.mId,
      mManuId: data.manufacturer.mId,
      mOriginId: data.origin.mId,
    });
    setFile(data.mPhotos);
  }

  const loadVariant = async (productId: number, sku: string) => {
    const { data }: { data: IVariant } = await Api.getInstance().getVariant(productId, sku);
    variantForm.setFieldsValue({
      mSku: data.mSku,
      mVariantType: data.mVariantType,
      mVariantValue: data.mVariantValue,
      mPrice: data.mPrice,
      mStatus: data.mStatus,
    });
  }

  useEffect(() => {
    loadListProduct();
    loadListProps();
  }, [])

  const openProductDrawer = async (productId: number | null) => {
    setCurrentProduct(productId);
    setProductVisible(true);
    setFile([]);
    if (productId) {
      await loadProduct(productId);
    } else {
      productForm.resetFields();
    }
  }

  const openVariantDrawer = async (productId: number, sku: string | null) => {
    setCurrentProduct(productId);
    setCurrentSku(sku);
    setVariantVisible(true);
    if (sku) {
      await loadVariant(productId, sku);
    } else {
      variantForm.resetFields();
    }
  }

  const onFinishProduct = async (values: any) => {
    const hide = message.loading('Processing');
    if (currentProduct) {
      await Api.getInstance().editProduct(currentProduct, {
        mName: values.mName,
        mDesc: values.mDesc,
        mManuId: values.mManuId,
        mOriginId: values.mOriginId,
        mCategoryId: values.mCategoryId,
        mStatus: values.mStatus,
        ...(file.length ? { mPhotos: file } : {})
      });
    }
    else {
      await Api.getInstance().addProduct({
        ...values,
        ...(file.length ? { mPhotos: file } : {})
      });
    }
    hide();
    message.success('Success');
    setProductVisible(false);
    loadListProduct();
  }

  const onFinishVariant = async (values: any) => {
    const hide = message.loading('Processing');
    if (currentSku) {
      await Api.getInstance().editVariant(currentProduct!!, currentSku, {
        mVariantType: values.mVariantType,
        mVariantValue: values.mVariantValue,
        mPrice: values.mPrice,
        mStatus: values.mStatus,
      });
    }
    else {
      await Api.getInstance().addVariant(currentProduct!!, values);
    }
    hide();
    message.success('Success');
    setVariantVisible(false);
    loadListProduct();
  }

  const removeProduct = async (id: number) => {
    Modal.confirm({
      title: 'Are you sure delete this product?',
      content: 'When clicked the OK button, the product will be deleted',
      onOk: async () => {
        const hide = message.loading('Deleting...', 1);
        await Api.getInstance().deleteProduct(id);
        loadListProduct();
        hide();
        message.success('Delete product success', 1);
      }
    })
  }

  const removeVariant = async (productId: number, sku: string) => {
    Modal.confirm({
      title: 'Are you sure delete this variant?',
      content: 'When clicked the OK button, the variant will be deleted',
      onOk: async () => {
        const hide = message.loading('Deleting...', 1);
        await Api.getInstance().deleteVariant(productId, sku);
        loadListProduct();
        hide();
        message.success('Delete variant success', 1);
      }
    })
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
      render: (_: string, record: IProduct) => <Space>
        <a onClick={() => openVariantDrawer(record.mId, null)}>Add-Variant</a>
        <a onClick={() => openProductDrawer(record.mId)}>Edit</a>
        <a onClick={() => removeProduct(record.mId)}>Delete</a>
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
        render: (_: string, record: IVariant) => <Space>
          <a onClick={() => openVariantDrawer(record.mProductId, record.mSku)}>Edit</a>
          <a onClick={() => removeVariant(record.mProductId, record.mSku)}>Delete</a>
        </Space>
      }
    ];

    return <Table columns={columns} dataSource={record.variant} pagination={false} size='small'></Table>
  }

  return (
    <>
      <Breadcrumb className="my-2">
        <Breadcrumb.Item>
          <NavLink to='/'>Home</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Product</Breadcrumb.Item>
      </Breadcrumb>
      <Button className="float-right mb-3" onClick={() => openProductDrawer(null)}>Add New</Button>
      <Table expandable={{ expandedRowRender }} className="clear-both" columns={columns} dataSource={dataSource} pagination={{ pageSize: 10 }} />
      <Drawer
        title={currentProduct ? `Edit Product` : 'Add New Product'}
        visible={productVisible}
        onClose={() => setProductVisible(false)}
        width={720}
      >
        <Form
          form={productForm}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={onFinishProduct}
        >
          <Form.Item label="Name" name="mName" required>
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="mDesc" required>
            <ReactQuill theme='snow' />
          </Form.Item>

          <Form.Item label="Status" name="mStatus" required>
            <Select>
              <Select.Option value="IN_STOCK">IN STOCK</Select.Option>
              <Select.Option value="OUT_OF_STOCK">OUT OF STOCK</Select.Option>
              <Select.Option value="HIDDEN">HIDDEN</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="mCategoryId" required>
            <Select
              showSearch
              filterOption={(input, option) =>
                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
            >
              {listCategory.map((item) => (
                <Select.Option value={item.mId} key={item.mId}>{item.mName}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Manufacturer" name="mManuId" required>
            <Select
              showSearch
              filterOption={(input, option) =>
                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
            >
              {listManufacturer.map((item) => (
                <Select.Option value={item.mId} key={item.mId}>{item.mName}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Origin" name="mOriginId" required>
            <Select
              showSearch
              filterOption={(input, option) =>
                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
            >
              {listOrigin.map((item) => (
                <Select.Option value={item.mId} key={item.mId}>{item.mCountry}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Photos" name="mPhotos" required>
            <ImgCrop>
              <Upload
                listType="picture-card"
                multiple
              >
                {file.length > 0 && file.map((item, index) => <img src={item} alt={`product-image-${index}`}></img>)}
                {file.length === 0 && <UploadButton loading={loading} />}
              </Upload>
            </ImgCrop>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
            <Button type="primary" htmlType="submit" onClick={() => setLoading(true)}>
              {currentProduct ? 'Update' : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      <Drawer
        title={currentSku ? `Edit Variant` : 'Add New Variant'}
        visible={variantVisible}
        onClose={() => setVariantVisible(false)}
        width={720}
      >
        <Form
          form={variantForm}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={onFinishVariant}
        >
          <Form.Item label="SKU" name="mSku" required>
            <Input disabled={currentSku ? true : false} />
          </Form.Item>

          <Form.Item label="Variant Type" name="mVariantType" required>
            <Input />
          </Form.Item>

          <Form.Item label="Variant Value" name="mVariantValue" required>
            <Input />
          </Form.Item>

          <Form.Item label="Price" name="mPrice" required>
            <InputNumber />
          </Form.Item>

          <Form.Item label="Status" name="mStatus" required>
            <Select>
              <Select.Option value="IN_STOCK">IN STOCK</Select.Option>
              <Select.Option value="OUT_OF_STOCK">OUT OF STOCK</Select.Option>
              <Select.Option value="HIDDEN">HIDDEN</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
            <Button type="primary" htmlType="submit">
              {currentSku ? 'Update' : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}
