import React, { Component } from 'react';
import './css/App.css';
import { Layout, Menu, Icon } from 'antd';
import {Route, Link,Switch} from 'react-router-dom'
import allOrderPage from './components/allOrderPage';
import requestFormPage from './components/requestFormPage';

const { Header, Sider, Content } = Layout;
class App extends Component {

  render() {
    return (
      <Layout>
        <Content>
          <Switch>
            <Route path="/" exact component={()=><h1>home page</h1>}></Route>
            <Route path="/requestFormPage" component={requestFormPage}></Route>
            <Route path="/allOrderPage" component={allOrderPage}></Route>
          </Switch>
        </Content>
      </Layout>
    );
  }
}

export default App;
