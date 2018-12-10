import React, { Component } from 'react';
import './css/App.css';
import { Layout, Menu, Icon } from 'antd';
import {Route, Link,Switch} from 'react-router-dom'
import clerkPage from './components/clerkPage';
import requestFormPage from './containers/requestFormPageContainer';
import pickCarPage from './components/pickCarPage';
import selectParkingLot from './components/selectParkingLot';


const { Header, Sider, Content } = Layout;
class App extends Component {

  render() {
    return (
      <Layout>
        <Content>
          <Switch>
            <Route path="/" exact component={()=><h1>home page</h1>}></Route>
            <Route path="/requestFormPage" component={requestFormPage}></Route>
            <Route path="/clerkPage" component={clerkPage}></Route>
            <Route path="/pickCarPage" component={pickCarPage}></Route>
          </Switch>
        </Content>
      </Layout>
    );
  }
}

export default App;
