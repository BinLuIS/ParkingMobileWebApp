import { List, InputItem, WhiteSpace, Button } from 'antd-mobile';
import React, { Component } from 'react';

export default class requestFormPage extends Component {
  
  onAdded = () => {
    const {input} = this.refs
    console.log(input)
    this.props.addNewOrderRequest(input.state.value)
    input.value = ''
  }
  render() {

    return (
      <div>
        <List renderHeader={() => <span><h1 style={{textAlign:"center", color: "white"}}>申請停車</h1></span>}>
          <InputItem style={{ padding: "50px" }}>
          <p style={{ color: "#1890ff" }}>姓名 </p>
          </InputItem>
          <InputItem ref='input' style={{ padding: "50px" }}>
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
