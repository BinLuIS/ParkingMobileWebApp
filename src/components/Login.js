import React, { Component } from 'react'
import { login } from '../util/APIUtils';
import { Toast, Input, List, InputItem, WhiteSpace, Button , Icon} from 'antd-mobile';
import { createForm } from 'rc-form';
import { ACCESS_TOKEN } from '../constants';
import {getCurrentUser} from '../util/APIUtils';
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
                    console.log("now1")
                    
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    console.log(ACCESS_TOKEN);
                    setTimeout(getCurrentUser()
                    .then(response => {
                        Toast.success(`歡迎你 ${response.name}!!!`,2);
                        console.log("now2")
                    }), 2000);
                    setTimeout(this.props.onLogin(), 2000);
                    // return new Promise((resolve) => {
                    //     setTimeout(getCurrentUser()
                    //     .then(response => {
                    //         Toast.success(`歡迎!!${response.username}`,2);
                    //         console.log("now2")
                    //     }), 3000);
                    //     resolve();
                    // });
                    // this.props.onLogin();
                }).catch(error => {
                    if(error.status === 401) {
                        Toast.fail("用戶名稱或密碼有錯, 請重新輸入",3);                    
                    } else {
                        const description =  error.message || '登入失敗, 請重新登入'
                        Toast.fail(description,3);                           
                    }
                });
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
                <h5 style={{textAlign:"center", color: "white", padding: "20px 20px", margin: "0px 0px 0px 0px"}}>停車系統(停車員操作平台)登錄介面</h5>
            </Typography>
            <List>
            <InputItem
            {...getFieldProps('usernameOrEmail', {
                rules: [{ required: true, message: 'Please input your username or email!' }],
            })}
            placeholder="請輸入你的用戶名稱"
          >
            帳戶
            </InputItem>
          <InputItem
            {...getFieldProps('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
            })}
            type="password"
            placeholder="******"
          >密碼</InputItem>
        </List>
        <div>
          <Button type="primary" onClick={this.handleSubmit}>登錄</Button><WhiteSpace />
          </div>
          </div>
        );
      }
}

export default Login;