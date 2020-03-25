import React, { Component } from 'react';
import {Link} from "react-router-dom";

import { Layout, Menu,Input,Button } from 'antd';
import { UserOutlined} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Head extends Component{
    render(){
      return(
        <Layout>
    <Header className="header">
           <h1 className="num">Numerical</h1>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <UserOutlined />
                subnav 1
              </span>
            }
          >
            <Menu.Item key="1"><Link to="/Bisection"/>Bisection</Menu.Item>
            <Menu.Item key="2"><Link to="/FalsePosition"/>FalsePosition</Menu.Item>
            <Menu.Item key="3"><Link to="/OnePoint"/>One-Point lntertion</Menu.Item>
            <Menu.Item key="4"><Link to="/NewtonRaphson"/>NewtonRaphson</Menu.Item>
            <Menu.Item key="5"><Link to="/Secant"/>Secant</Menu.Item>

          </SubMenu>
         
        
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 600,
          }}
        >

          {/* ใส่ตรงกลาง       */}
          <p>
          <h1 className="color">พงศธร พันธุ์สิทธิเดช s.1</h1>
          </p>
        </Content>
      </Layout>
    </Layout>
  </Layout>
      
      );
    }
}

export default Head;