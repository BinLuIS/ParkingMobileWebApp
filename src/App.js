import React, { Component } from 'react';
import './css/App.css';
import { Layout, Menu, Icon } from 'antd';
import {Route, Link,Switch} from 'react-router-dom'
import clerkPage from './components/clerkPage';
import requestFormPage from './containers/requestFormPageContainer';
import pickAcceptedOrderParkingLocationPage from './components/pickAcceptedOrderParkingLocationPage';
import pickAcceptedOrderCarPage from './components/pickAcceptedOrderCarPage';
import viewAcceptedOrderPage from './components/viewAcceptedOrderPage';
import Login from './components/Login'
import { getCurrentUser } from './util/APIUtils';
import { ACCESS_TOKEN } from './constants';

const { Header, Sider, Content } = Layout;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
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
        isLoading: false
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

  handleLogout(redirectTo="/login") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
    
  }

  handleLogin=(history)=> {
    this.loadCurrentUser();
    history.push('/clerkPage');
  }

  render() {
    return (
      <Layout>
        <Content>
          <Switch>
            <Route path="/" exact render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
            <Route path="/requestFormPage" component={requestFormPage}></Route>
            <Route path="/clerkPage" component={clerkPage} onLogout={this.handleLogout}></Route>
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
