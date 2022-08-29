import { Breadcrumb, Button, Drawer, Form, Input, message, Modal, Space, Table, Upload } from 'antd'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import ImgCrop from 'antd-img-crop';
import { Api, uploadImage } from '../../api'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { onPreview } from '../../utils/form';
import { UploadButton } from '../../components/button/uploadButton';


export const ListOrigin = () => {
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = React.useState<any[]>([]);
  const [visible, setVisible] = React.useState<boolean>(false);
  const [currentOrigin, setCurrentOrigin] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<string>("");

  const loadListOrigin = async () => {
    const { data } = await Api.getInstance().getListOrigin();
    setDataSource(data);
  }

  const loadOrigin = async (id: number) => {
    const { data } = await Api.getInstance().getOrigin(id);
    form.setFieldsValue({
      mCountry: data.mCountry,
    })
    setFile(data.mFlag);
  }

  useEffect(() => {
    loadListOrigin();
  }, [])

  const openDrawer = (originId: number | null) => {
    console.log('originId: ', originId);
    setCurrentOrigin(originId);
    setVisible(true);
    setFile("");
    if (originId) {
      loadOrigin(originId);
    } else {
      form.resetFields();
    }
  }

  const removeOrigin = (originId: number) => {
    Modal.confirm({
      title: 'Are you sure delete this origin?',
      content: 'This action cannot be undone',
      onOk: async () => {
        const hide = message.loading('Deleting...');
        await Api.getInstance().deleteOrigin(originId);
        hide();
        message.success('Origin deleted');
        loadListOrigin();
      }
    });
  }

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
      render: (text: string) => text && <img src={text} alt="flag" width={50} height={50} />
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
        <a onClick={() => openDrawer(record.mId)}>Edit</a>
        <a onClick={() => removeOrigin(record.mId)}>Delete</a>
      </Space>
    }
  ]

  const customAction = async (file: File): Promise<string> => {
    setLoading(true);
    const url = await uploadImage(file);
    setLoading(false);
    setFile(url);
    return new Promise(async (res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => res(reader.result as string)
    })
  }

  const onFinish = async (values: any) => {
    if (currentOrigin) {
      await Api.getInstance().editOrigin(currentOrigin, {
        mCountry: values.mCountry,
        mFlag: file,
      });
    } else {
      await Api.getInstance().addOrigin({
        mCountry: values.mCountry,
        mFlag: file,
      });
    }
    setVisible(false);
    loadListOrigin();
  }

  return (
    <>
      <Breadcrumb className="my-2">
        <Breadcrumb.Item>
          <NavLink to='/'>Home</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Origin</Breadcrumb.Item>
      </Breadcrumb>
      <Button className="float-right mb-3" onClick={() => openDrawer(null)}>Add New</Button>
      <Table className="clear-both" columns={columns} dataSource={dataSource} pagination={{ pageSize: 10 }} />
      <Drawer
        title={currentOrigin ? "Edit Origin" : "Add Origin"}
        visible={visible}
        onClose={() => setVisible(false)}
        width={720}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={onFinish}
        >
          <Form.Item label="Country" name="mCountry" required>
            <Input />
          </Form.Item>
          <Form.Item label="Flag" name="mFlag" required>
            <ImgCrop rotate>
              <Upload
                action={customAction}
                accept="image/png, image/jpeg"
                listType="picture-card"
                onRemove={() => setFile("")}
                onPreview={onPreview}
              >
                {file && <img src={file} alt="Origin" className="max-w-full max-h-full"></img>}
                {!file && <UploadButton loading={loading} />}
              </Upload>
            </ImgCrop>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}
