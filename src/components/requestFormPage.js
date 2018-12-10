import { List, InputItem, WhiteSpace, Button } from 'antd-mobile';
import React, { Component } from 'react';
import  { Router } from 'react-router';

export default class requestFormPage extends Component {
  
  onAdded = () => {
    const {name,carnum} = this.refs
    console.log(carnum)
    console.log(name)
    this.props.addNewOrderRequest(carnum.state.value)
    carnum.setState({value: ''});
    name.setState({value: ''});
    alert("成功申請")
    // this.props.history.push('/allOrderPage')
  }
  render() {

    return (
      <div>
        <List renderHeader={() => <span><h1 style={{textAlign:"center", color: "white"}}>申請停車</h1></span>}>
          <InputItem ref='name' style={{ padding: "50px" }}>
          <p style={{ color: "#1890ff" }}>姓名 </p>
          </InputItem>
          <InputItem ref='carnum' style={{ padding: "50px" }}>
          <p style={{ color: "#1890ff" }}>車牌號碼 </p>
          </InputItem>
        </List>
        <br />
        <div>
          <Button type="primary" onClick={this.onAdded}>提交</Button><WhiteSpace />
        
        </div>
      </div>
    );
  }
}
