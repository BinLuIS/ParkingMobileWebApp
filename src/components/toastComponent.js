import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import React, { Component } from 'react';
import  { Router } from 'react-router';


const successToast = (text) => {
    Toast.success(text, 100);
  }
  
const failToast = (text) => {
    Toast.fail(text, 1);
}
export default class ToastComponent extends Component {
    state = {
        type: "",
        alertText: ""
    }
    componentDidMount() {
        this.setState({alertText: this.props.alertText})
        this.setState({type: this.props.type})
    }
    render() {
        if(this.state.type == "success") {
            successToast(this.state.alertText);
        }
        else if(this.state.type == "failed") {
            failToast(this.state.alertText);
        }
    }
}