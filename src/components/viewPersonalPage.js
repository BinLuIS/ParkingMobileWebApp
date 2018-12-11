import { TabBar, ListView,List,Button, WhiteSpace } from 'antd-mobile';
import { Icon } from 'antd';
import React, { Component } from 'react'
import ReactDOM from 'react-dom';


export default class viewPersonalPage extends Component {
  
    handleSubmit=()=> {
      console.log(this.props);
       this.props.onLogout();
    }

    render() {
      return (
        <div>
              <div><List renderHeader={() => <span><h1 style={{textAlign:"center", color: "white"}}>申請停車</h1></span>}/></div>
              <Button type="primary" onClick={this.handleSubmit}>登出</Button><WhiteSpace />
        </div>
      );
    }
  }


  