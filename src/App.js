import React, { Component } from 'react';
import './css/App.css';
import { Layout } from 'antd';
import { Toast } from 'antd-mobile';
import {Route,Switch} from 'react-router-dom'
import ClerkPage from './components/clerkPage';
import requestFormPage from './containers/requestFormPageContainer';
import pickAcceptedOrderParkingLocationPage from './components/pickAcceptedOrderParkingLocationPage';
import pickAcceptedOrderCarPage from './components/pickAcceptedOrderCarPage';
import viewAcceptedOrderPage from './components/viewAcceptedOrderPage';
import Login from './components/Login'
import { getCurrentUser } from './util/APIUtils';
import { ACCESS_TOKEN, CLERK_ID, USER_ID } from './constants';
import PrivateRoute from './components/PrivateRoute';


const { Content } = Layout;
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
    this.setState({
      isLoading: true
    });

    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response.username,
        isAuthenticated: true,
        isLoading: false,
        userId: response.id,
        parkingClerkId: response.idInRole
      });
      localStorage.setItem(CLERK_ID, response.idInRole);
      localStorage.setItem(USER_ID, response.id);
      
      Toast.success(`Welcome ${response.name}!!!`,2);
      history.push('/clerkPage');
    }).catch(error => {
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
    this.setState({
      currentUser: null,
      isAuthenticated: false
    });
    history.push('/login');
    window.location.reload();
    Toast.success("Successfully logout",3);
  }

  // onVoice = () => {
  //   if(this.state.isAuthenticated == true)
  //     return (<Sound
  //         url={soundfile}
  //         playStatus={Sound.status.PLAYING}
  //         onLoading={this.handleSongLoading}
  //         onPlaying={this.handleSongPlaying}
  //         onFinishedPlaying={this.handleSongFinishedPlaying}
  //         volume={100}
  //         autoLoad={true}
  //         // loop ={true}
  //       />);
  // }

  handleLogin=(history)=> {
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
    
    return (
      <Layout>
        {/* {this.onVoice()} */}
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
