import { ApartmentOutlined, AppstoreOutlined, GlobalOutlined, LogoutOutlined, SettingOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, MenuProps } from "antd";
import React, { useContext, useState } from "react";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import { AppContext, ContextType } from "../../context";
import { CreateAdmin } from "../../pages/admin";
import { ListCategory } from "../../pages/category";
import { ListManufacturer } from "../../pages/manufacturer";
import { ListOrigin } from "../../pages/origin";
import { ListProduct } from "../../pages/product";
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
  const { logout } = useContext<ContextType>(AppContext);

  const [collapsed, setCollapsed] = useState(false);

  const menu = <Menu
    items={[
      {
        key: 1,
        label: <Link to="/create-admin">Create Admin</Link>,
        icon: <UserAddOutlined />,
      },
      {
        key: 2,
        icon: <LogoutOutlined />,
        label: <a onClick={() => logout()}>Logout</a>
      }
    ]}
  />

  return <Layout className="min-h-screen">
    <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
    </Sider>
    <Layout>
      <Header className="bg-slate-100 p-3 shadow flex" >
        <Dropdown overlay={menu} className="ml-auto">
          <Avatar icon={<UserOutlined />} size={40}/>
        </Dropdown>
      </Header>
      <Content className="m-4">
        <Routes>
          <Route index element={<ListUser />} />
          <Route path="/create-admin" element={<CreateAdmin />} />
          <Route path="/origin" element={<ListOrigin />} />
          <Route path="/category" element={<ListCategory />} />
          <Route path="/manufacturer" element={<ListManufacturer />} />
          <Route path="/product" element={<ListProduct />} />
          <Route path="/admin" element={<CreateAdmin />} />
        </Routes>
      </Content>
      <Footer className="text-center">EC Admin ©2022 Created by txuanson</Footer>
    </Layout>
  </Layout>
}