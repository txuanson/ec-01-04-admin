import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Drawer, Form, message, Modal, Input, Space, Table, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useForm } from 'antd/es/form/Form'
import React, { useEffect } from 'react'
import ReactQuill from 'react-quill'
import { NavLink } from 'react-router-dom'
import { Api, uploadImage } from '../../api'
import { UploadButton } from '../../components/button/uploadButton'
import { onPreview } from '../../utils/form'

export const ListManufacturer: React.FC = () => {
  const [form] = useForm();

  const [loading, setLoading] = React.useState<boolean>(false)
  const [dataSource, setDataSource] = React.useState<any[]>([])
  const [visible, setVisible] = React.useState(false);
  const [currentManufacturer, setCurrentManufacturer] = React.useState<number | null>(null);
  const [file, setFile] = React.useState<string>("");

  const loadListManufacturer = async () => {
    const { data } = await Api.getInstance().getListManufacturer();
    setDataSource(data);
  };

  const loadManufacturer = async (id: number) => {
    const { data } = await Api.getInstance().getManufacturer(id);
    form.setFieldsValue({
      mName: data.mName,
      mDesc: data.mDesc,
    })
    setFile(data.mLogo);
  }


  useEffect(() => {
    loadListManufacturer();
  }, [])
  
  const openDrawer = (manufacturerId: number | null) => {
    console.log(manufacturerId);
    setCurrentManufacturer(manufacturerId);
    setVisible(true);
    setFile("");
    if (manufacturerId) {
      loadManufacturer(manufacturerId);
    } else {
      form.resetFields();
    }
  }

  const removeManufacturer = (manufacturerId: number) => {
    Modal.confirm({
      title: 'Are you sure delete this manufacturer?',
      content: 'This action cannot be undone',
      onOk: async () => {
        const hide = message.loading('Deleting...');
        await Api.getInstance().deleteManufacturer(manufacturerId);
        hide();
        message.success('Manufacturer deleted');
        loadListManufacturer();
      }
    });
  }

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
      render: (text: string) => text && <img src={text} alt="logo" style={{ width: '50px', height: '50px' }} />,
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
        <a onClick={() => removeManufacturer(record.mId)}>Delete</a>
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
    const hide = message.loading('Processing...', 5);
    if (currentManufacturer) {
      await Api.getInstance().editManufacturer(currentManufacturer, {
        mName: values.mName,
        mDesc: values.mDesc,
        mLogo: file,
      });
      message.success('Manufacturer updated', 1);
    }
    else {
      await Api.getInstance().addManufacturer({
        mName: values.mName,
        mDesc: values.mDesc,
        mLogo: file,
      });
      message.success('Manufacturer saved', 1);
    }
    hide();
    setVisible(false);
    loadListManufacturer();
  }

  return (
    <>
      <Breadcrumb className="my-2">
        <Breadcrumb.Item>
          <NavLink to='/'>Home</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Manufacturer</Breadcrumb.Item>
      </Breadcrumb>
      <Button className="float-right mb-3" onClick={() => openDrawer(null)}>Add New</Button>
      <Table className="clear-both" columns={columns} dataSource={dataSource} pagination={{ pageSize: 10 }} />
      <Drawer
        title={currentManufacturer ? "Edit Manufacturer" : "Add Manufacturer"}
        width={720}
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={onFinish}
        >
          <Form.Item label="Name" name="mName" required>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="mDesc" required>
            <ReactQuill theme='snow' />
          </Form.Item>
          <Form.Item label="Logo" name="mLogo" required>
            <ImgCrop rotate>
              <Upload
                name="manufacturer logo"
                action={customAction}
                accept="image/png, image/jpeg"
                listType="picture-card"
                onRemove={() => setFile("")}
                onPreview={onPreview}
              >
                {file && <img src={file} alt="Manufacturer" className="max-w-full max-h-full"></img>}
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
