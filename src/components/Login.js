import React, { Component } from 'react'
import { login } from '../util/APIUtils';
import { Toast, Input, List, InputItem, WhiteSpace, Button , Icon, NoticeBar} from 'antd-mobile';
import { createForm } from 'rc-form';
import { ACCESS_TOKEN } from '../constants';

import Typography from '@material-ui/core/Typography';

class Login extends Component {
    render() {
        console.log(this.props)
        const LoginWrapper = createForm()(LoginForm);
        return (
            <div>
                <LoginWrapper onLogin={() =>this.props.onLogin(this.props.history)}/>
            </div>
        );
      }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();   
        console.log(this.props.form)
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                .then(response => {
                    console.log("response of /auth/signin")
                    console.log(response)
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    console.log("set accesstoken");
                    // setTimeout(getCurrentUser()
                    // .then(response => {
                    //     Toast.success(`歡迎你 ${response.name}!!!`,2);
                    //     console.log("now2")
                    // }), 2000);
                    // setTimeout(this.props.onLogin(), 2000);
                    // return new Promise((resolve) => {
                    //     setTimeout(getCurrentUser()
                    //     .then(response => {
                    //         Toast.success(`歡迎!!${response.username}`,2);
                    //         console.log("now2")
                    //     }), 3000);
                    //     resolve();
                    // });
                    this.props.onLogin();
                }).catch(error => {
                    if(error.status === 401) {
                        Toast.fail("Invalid username or password. Please try again",3);                    
                    } else {
                        const description =  error.message || 'Failed to login. Please try again.'
                        Toast.fail(description,3);                           
                    }
                });
            }
            else {
                const description =  "Please fill in username and password"
                Toast.info(description,3);                           
            }
            
        });
    }

    componentDidMount() {
        // this.autoFocusInst.focus();
      }

    render() {
        const { getFieldProps } = this.props.form;
        return (
          <div>
            <Typography variant="h5" className={this.props.title} style={{background:"#1B82D2"}}>
                <h5 style={{textAlign:"center", color: "white", padding: "20px 20px", margin: "0px 0px 0px 0px"}}>Parking System(Parking Clerk Platform)<br/>Login Interface</h5>
            </Typography>
            <div>
                {/* <WhiteSpace size="lg" />
                <NoticeBar background="white" marqueeProps={{ loop: true, leading: 800, trailing: 800, fps: 40}} icon={null}> */}
                    <div style={{textAlign:"center", background:"white", paddingTop: "8px", paddingBottom: "8px"}}>
                        <span style={{color: "#1B82D2"}}>Joyful Parking    </span>
                    </div>
                {/* </NoticeBar>
                <WhiteSpace size="lg" /> */}
                </div>
            <img
                src={require('../icon/binluicon.png')}
                alt=""
                style={{ width: '60%', height: '60%', display: "block", 
                marginLeft: "auto", marginRight: "auto"}}
              />
            <List>
            <InputItem
            {...getFieldProps('usernameOrEmail', {
                rules: [{ required: true, message: 'Please input your username or email!' }],
            })}
            placeholder="Username"
          >
            Username
            </InputItem>
          <InputItem
            {...getFieldProps('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
            })}
            type="password"
            placeholder="******"
          >Password</InputItem>
        </List>
        <div>
          <Button type="primary" onClick={this.handleSubmit}>Login</Button><WhiteSpace />
          </div>
          </div>
        );
      }
}

export default Login;