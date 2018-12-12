import React, { Component } from 'react';
import './css/App.css';
import { Layout, Menu, Icon } from 'antd';
import { Toast } from 'antd-mobile';
import {Route, Link,Switch} from 'react-router-dom'
import ClerkPage from './components/clerkPage';
import requestFormPage from './containers/requestFormPageContainer';
import pickAcceptedOrderParkingLocationPage from './components/pickAcceptedOrderParkingLocationPage';
import pickAcceptedOrderCarPage from './components/pickAcceptedOrderCarPage';
import viewAcceptedOrderPage from './components/viewAcceptedOrderPage';
import Login from './components/Login'
import { getCurrentUser } from './util/APIUtils';
import { ACCESS_TOKEN } from './constants';
import clerkPage from './components/clerkPage';

const { Header, Sider, Content } = Layout;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      parkingclerkId: null
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);  
  }

  loadCurrentUser = () => {
    this.setState({
      isLoading: true
    });
    
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response.username,
        isAuthenticated: true,
        isLoading: false,
        parkingclerkId: response.id
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout=(history)=>{
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      currentUser: null,
      isAuthenticated: false
    });
    history.push('/');
    Toast.success("你已成功登出",3);
  }

  handleLogin=(history)=> {
    this.loadCurrentUser();
    setTimeout(getCurrentUser()
    .then(response => {
        Toast.success(<div>歡迎你 <b>{response.name}</b>!!!</div>,2);
        console.log("now2")
    }), 2000);
    history.push('/clerkPage');
  }

  render() {
    console.log()
    return (
      <Layout>
        <Content>
          <Switch>
            <Route path="/" exact render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
            <Route path="/requestFormPage" component={requestFormPage}></Route>
            <Route path="/clerkPage" render={(props) => <ClerkPage onLogout={this.handleLogout} {...props} />}/>
            <Route path="/viewAcceptedOrderPage" component={viewAcceptedOrderPage}></Route>
            <Route path="/pickAcceptedOrderCarPage/pickAcceptedOrderParkingLocationPage" component={pickAcceptedOrderParkingLocationPage}></Route>
            <Route path="/pickAcceptedOrderParkingLocationPage" component={pickAcceptedOrderParkingLocationPage}></Route>
            <Route path="/pickAcceptedOrderCarPage/:id" component={pickAcceptedOrderCarPage}></Route>
            <Route path="/pickAcceptedOrderCarPage" component={pickAcceptedOrderCarPage}></Route>
            <Route path="/login" render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
          </Switch>
        </Content>
      </Layout>
    );
  }
}

export default App;
