import { Layout, Menu, Modal, Breadcrumb } from 'antd';
import React from 'react';
import { useBoolean, useRequest } from 'ahooks';
import api from './utils/api.js';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface LayoutProps {
  children: any;
}

async function getUsername(): Promise<any> {
  let response: any = await api.request({
    url: '/api/menus',
  });
  console.log('response', response);

  // return response.data;
}

const LayoutProps = (props: LayoutProps) => {
  const [collapsed, { toggle }] = useBoolean(false);
  const { data, error, loading } = useRequest(getUsername);
  const { data: user } = useRequest(getUsername);
  const onCollapse = (collapsed: boolean) => {
    toggle(collapsed);
  };

  console.log('data', data);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />} />
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
          <Modal
            title="Basic Modal"
            visible
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {props.children}
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutProps;
