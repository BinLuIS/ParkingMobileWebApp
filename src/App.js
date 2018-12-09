import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import { Layout, Menu, Icon } from 'antd';
import {Route, Link,Switch} from 'react-router-dom'
import requestFormPage from './components/requestFormPage';
import allOrderPage from './components/allOrderPage'

const { Header, Sider, Content } = Layout;
class App extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          
            {/* <Menu.Item key="1">
              <Link to = "/requestFormPage">
                <Icon type="table" />
                <span>Customer Request Form</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to = "/allOrderPage">
                <Icon type="table" />
                <span>All Order Page</span>
              </Link>
            </Menu.Item> */}
          
          </Menu>
        </Sider>
        <Layout>
          {/* <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <span>This is a Title</span>
          </Header> */}
          <Content style={{ }}
          >
          </Content>
            <Switch>
              <Route path="/" exact component={()=><h1>Home Page</h1>}></Route>
              <Route path="/requestFormPage" component={requestFormPage}></Route>
              <Route path="/AllOrderPage" component={allOrderPage}></Route>
              {/* <Route path="/nav3Page" component={()=><p style={{textAlign: 'center',marginTop:'15rem',color:'#1890ff', fontSize:'2rem'}}>Nav3 Page</p>}></Route> */}
            </Switch>
        </Layout>
      </Layout>
    );
  }
}

export default App;
