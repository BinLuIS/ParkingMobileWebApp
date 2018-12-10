import React, { Component } from 'react';
import './css/App.css';
import { Layout, Menu, Icon } from 'antd';
import {Route, Link,Switch} from 'react-router-dom'
import clerkPage from './components/clerkPage';
import requestFormPage from './containers/requestFormPageContainer';
import pickAcceptedOrderParkingLocationPage from './components/pickAcceptedOrderParkingLocationPage';
import pickAcceptedOrderCarPage from './components/pickAcceptedOrderCarPage';


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
            <Route path="/pickAcceptedOrderParkingLocationPage" component={pickAcceptedOrderParkingLocationPage}></Route>
            <Route path="/pickAcceptedOrderCarPage/:id" component={pickAcceptedOrderCarPage}></Route>
            <Route path="/pickAcceptedOrderCarPage" component={pickAcceptedOrderCarPage}></Route>

          </Switch>
        </Content>
      </Layout>
    );
  }
}

export default App;
