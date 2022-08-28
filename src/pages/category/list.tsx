import { CarryOutOutlined, FormOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Form, Input, message, Modal, Row, Space, Tree } from "antd"
import type { DataNode } from "antd/es/tree";
import { useEffect, useState } from "react"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { NavLink } from "react-router-dom";
import { Api } from "../../api";

let tree: DataNode[];
let prevParent: DataNode[];

export const ListCategory: React.FC = () => {
  const [form] = Form.useForm();


  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [category, setCategory] = useState<DataNode[]>([]);

  const loadCategoryTree = async () => {
    const { data } = await Api.getInstance().getListCategory();

    tree = [];
    prevParent = [];

    data.forEach((item: any) => {
      const { mId, mName, mDepth, mParent } = item;
      const node: DataNode = {
        key: mId,
        title: mName,
        icon: <CarryOutOutlined />,
        children: []
      };

      if (mDepth === 0) {
        prevParent.push(node);
        tree.push(node);
        return;
      }

      while (mParent !== prevParent.at(-1)?.key) {
        prevParent.pop();
      }

      const parent = prevParent.at(-1);
      if (parent) {
        parent.children!.push(node);
      }
      prevParent.push(node);
    });
    setCategory(tree);
  }

  const loadCategory = async (categoryId: number) => {
    const { data } = await Api.getInstance().getCategory(categoryId);
    const fields = form.getFieldsValue();
    const newData: any = {}
    Object.keys(fields).forEach((key) => {
      newData[key] = data[key];
    });
    form.setFieldsValue(newData);
  }

  useEffect(() => {
    loadCategoryTree();
  }, []);

  // useEffect(() => {
  // }, [selectedCategory])

  const onSelectTreeNode = async (selectedKeys: React.Key[], info: any) => {
    setSelectedCategory(selectedKeys[0] as number);
    await loadCategory(selectedKeys[0] as number);
  };

  const onFinish = async (values: any) => {
    const hide = message.loading('Processing...');
    if (selectedCategory) {
      await Api.getInstance().editCategory(selectedCategory, { ...values });
    } else {
      await Api.getInstance().addCategory({ ...values, mParentCategoryId: null });
      form.resetFields();
    }
    hide();
    message.success('Success!', 1);
    await loadCategoryTree();
  }

  const addChild = async () => {
    if (!selectedCategory) {
      return message.error('Please select a category');
    }
    const hide = message.loading('Processing...');
    const fields = form.getFieldsValue();
    await Api.getInstance().addCategory({ ...fields, mParentCategoryId: selectedCategory });
    hide();
    message.success('Success!', 1);
    await loadCategoryTree();
  }

  const remove = async () => {
    if (!selectedCategory) {
      return message.error('Please select a category');
    }
    Modal.confirm({
      title: 'Are you sure delete this category?',
      content: 'This action cannot be undone',
      onOk: async () => {
        const hide = message.loading('Processing...');
        await Api.getInstance().deleteCategory(selectedCategory);
        hide();
        message.success('Category deleted!', 1);
        await loadCategoryTree();
      }
    })
  }

  return (
    <>
      <Breadcrumb className="my-2">
        <Breadcrumb.Item>
          <NavLink to='/'>Home</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Category</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={16}>
        <Col sm={24} lg={8}>
          <Button type="primary" className="mb-2" onClick={() => {
            setSelectedCategory(null);
            form.resetFields();
          }}>
            Root
          </Button>
          <Tree
            className="md:rounded p-3"
            showLine={{ showLeafIcon: false }}
            showIcon={true}
            selectedKeys={selectedCategory ? [selectedCategory] : []}
            onSelect={onSelectTreeNode}
            treeData={category}
          />
        </Col>
        <Col sm={24} lg={16}>
          <div className="md:rounded p-3 bg-white">
            <Form
              form={form}
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 22 }}
              name="category"
              onFinish={onFinish}
            >
              <Form.Item
                label="Name"
                name="mName"
                required
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Description"
                name="mDesc"
                required
              >
                <ReactQuill theme="snow" />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 2, span: 22 }}>
                <Space>
                  <Button type="primary" htmlType="submit" >
                    {selectedCategory ? "Edit" : "Create"}
                  </Button>
                  {
                    !selectedCategory
                    ||
                    <>
                      <Button onClick={addChild}>Add child</Button>
                      <Button danger type="primary" onClick={remove}>Delete</Button>
                    </>
                  }
                </Space>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  )
}