import React, { Component } from 'react'
import { login } from '../util/APIUtils';
import { Input, List, InputItem, WhiteSpace, Button , Icon} from 'antd-mobile';
import { createForm } from 'rc-form';
import { ACCESS_TOKEN } from '../constants';

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
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    this.props.onLogin();
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
            <List renderHeader={() => <span><h1 style={{textAlign:"center", color: "white"}}>停車系統(停車員操作平台)登錄介面</h1></span>}>
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
          >密码</InputItem>
        </List>
        <div>
          <Button type="primary" onClick={this.handleSubmit}>登錄</Button><WhiteSpace />
          </div>
          </div>
        );
      }
}

export default Login;
