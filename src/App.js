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
import { getCurrentUser, getCurrentParkingClerk } from './util/APIUtils';
import { ACCESS_TOKEN, CLERK_ID } from './constants';
import clerkPage from './components/clerkPage';
import PrivateRoute from './components/PrivateRoute';
import Sound from 'react-sound';
import soundfile from './music/welcome_employee.mp3';

const { Header, Sider, Content } = Layout;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      userId: null,
      parkingClerkId: null
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);  
  }

  loadCurrentUser = (history) => {
    console.log('loadCurrentUser')
    this.setState({
      isLoading: true
    });

    getCurrentUser()
    .then(response => {
      console.log("response of loadCurrentuser getcurrentuser")
      console.log(response)
      console.log('set state')
      this.setState({
        currentUser: response.username,
        isAuthenticated: true,
        isLoading: false,
        userId: response.id,
        parkingClerkId: response.idInRole
      });
      localStorage.setItem(CLERK_ID, response.idInRole);
      console.log("goToClerkPage")
      
      Toast.success(`歡迎你 ${response.name}!!!`,2);
      history.push('/clerkPage');
    }).catch(error => {
      console.log('error of getcurrentuser')
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    // this.loadCurrentUser();
  }

  handleLogout=(history)=>{
    localStorage.removeItem(ACCESS_TOKEN);
    console.log("logouttttt")
    console.log(localStorage.getItem(ACCESS_TOKEN))
    this.setState({
      currentUser: null,
      isAuthenticated: false
    });
    history.push('/login');
    window.location.reload();
    Toast.success("你已成功登出",3);
  }

  onVoice = () => {
    if(this.state.isAuthenticated == true)
      return (<Sound
          url={soundfile}
          playStatus={Sound.status.PLAYING}
          onLoading={this.handleSongLoading}
          onPlaying={this.handleSongPlaying}
          onFinishedPlaying={this.handleSongFinishedPlaying}
          volume={100}
          autoLoad={true}
          // loop ={true}
        />);
  }

  handleLogin=(history)=> {
    console.log("handleLogin");
    this.loadCurrentUser(history);
  // getCurrentUser()
  //   .then(response => {
  //     console.log("getCurrentUser")
  //       console.log(response);
  //       this.setState({
  //         currentUser: response.username,//
  //         isAuthenticated: true,
  //         isLoading: false,
  //         userId: response.id//
  //       });
  //       Toast.success(<div>歡迎你 <b>{response.name}</b>!!!</div>,2);
  //   });
    // console.log("getCurrentParkingClerk")
    // getCurrentParkingClerk(this.state.userId)
    // .then(response => {
    //   this.setState({
    //     parkingClerkId: response.idInRole
    //   });
    // }).catch(error => {
    //   this.setState({
    //     isLoading: false
    //   });  
    // });

    //
    // if(this.state.currentUser!=null){
    //   console.log("current user"+this.state.currentUser)
    // }
    
    // console.log("auth "+this.state.isAuthenticated)
    // console.log('history')
    // console.log(history)
    // this.setState({history:history})
    // console.log("goToClerkPage")
    // history.push('/clerkPage');
  }

  render() {
    
    console.log("Auth"+this.state.isAuthenticated)
    return (
      <Layout>
        {this.onVoice()}
        <Content>
          <Switch>
            <Route path="/" exact render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
            <Route path="/requestFormPage" component={requestFormPage}></Route>
            <PrivateRoute path="/clerkPage"  authenticated={this.state.isAuthenticated} component={(props) => <ClerkPage parkingClerkId={this.state.parkingClerkId} onLogout={this.handleLogout} {...props} />}/>
            {/* <PrivateRoute path="/viewAcceptedOrderPage" authenticated={this.state.isAuthenticated} component={viewAcceptedOrderPage}></PrivateRoute>
            <PrivateRoute path="/pickAcceptedOrderCarPage/pickAcceptedOrderParkingLocationPage" authenticated={this.state.isAuthenticated} component={pickAcceptedOrderParkingLocationPage}></PrivateRoute>
            <PrivateRoute path="/pickAcceptedOrderParkingLocationPage" authenticated={this.state.isAuthenticated}  component={pickAcceptedOrderParkingLocationPage}></PrivateRoute>
            <PrivateRoute path="/pickAcceptedOrderCarPage/:id" authenticated={this.state.isAuthenticated} component={pickAcceptedOrderCarPage}></PrivateRoute>
            <PrivateRoute path="/pickAcceptedOrderCarPage" authenticated={this.state.isAuthenticated} component={pickAcceptedOrderCarPage}></PrivateRoute> */}
            <Route path="/login" render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>

            
          </Switch>
        </Content>
      </Layout>
    );
  }
}

export default App;
