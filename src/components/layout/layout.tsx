import { ApartmentOutlined, AppstoreOutlined, GlobalOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { ListCategory } from "../../pages/category";
import { ListOrigin } from "../../pages/origin";
import { ListUser } from "../../pages/user";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  component?: React.ReactNode
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    component
  } as MenuItem;
}

const menuItems: MenuItem[] = [
  getItem(<NavLink to="/user">User</NavLink>, "user", <UserOutlined />),
  getItem(<NavLink to="/category">Category</NavLink>, "category", <ApartmentOutlined />, undefined,),
  getItem(<NavLink to="/origin">Origin</NavLink>, "origin", <GlobalOutlined />, undefined,),
  getItem(<NavLink to="/manufacturer">Manufacturer</NavLink>, "manufacturer", <SettingOutlined />, undefined,),
  getItem(<NavLink to="/product">Product</NavLink>, "product", <AppstoreOutlined />, undefined,),
];

export const LayoutWrapper: React.FC = ({ }) => {
  const [collapsed, setCollapsed] = useState(false);

  return <Layout className="min-h-screen">
    <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
    </Sider>
    <Layout>
      <Header className="bg-slate-100 p-0 shadow" />
      <Content className="m-4">
        <Routes>
          <Route path="/origin" element={<ListOrigin />} />
          <Route path="/user" element={<ListUser />} />
          <Route path="/category" element={<ListCategory />} />
        </Routes>
      </Content>
      <Footer className="text-center">EC Admin ©2022 Created by txuanson</Footer>
    </Layout>
  </Layout>
}