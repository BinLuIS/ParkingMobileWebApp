import { List, InputItem, WhiteSpace, Button } from 'antd-mobile';
import React, { Component } from 'react';

export default class requestFormPage extends Component {

  render() {

    return (
      <div>
        <List renderHeader={() => <span><h2>申請停車</h2></span>}>
          <InputItem style={{ padding: "50px" }}><p style={{ color: "#1890ff" }}>姓名 </p> </InputItem>
          <InputItem style={{ padding: "50px" }}><p style={{ color: "#1890ff" }}>車牌號碼 </p></InputItem>
        </List>
        <br />
        <div>
          <Button type="primary">提交</Button><WhiteSpace />
        </div>
      </div>
    );
  }
}
