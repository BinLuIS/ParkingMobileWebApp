import { List, Button, WhiteSpace } from 'antd-mobile';
import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import '../css/viewPersonalPage.css';
import ImageAvatars from './ImageAvatars';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
export default class viewPersonalPage extends Component {
  
    handleSubmit=()=> {
      console.log(this.props);
       this.props.onLogout();
    }

    render() {
      return (
        <div>
              <Typography variant="h5" className={this.props.title} style={{background:"#1B82D2"}}>
                <h5 style={{textAlign:"center", color: "white", padding: "20px 20px", margin: "0px 0px 0px 0px"}}>個人頁面</h5>
              </Typography>
              <br/>
              <br/>
              <ImageAvatars />
              <br/>
              <br/>
              <List dense className={this.props.root}>
              <div>
                <ListItem button style={{background: "white"}}>
                  <ListItemText style={{width: "25%", verticalAlign: "baseline" , fontSize: '15px'}} primary={"用戶名稱:"} />
                  <ListItemText style={{display: "inline-block", verticalAlign: "baseline" , fontSize: '15px'}} primary={"Joe Ho"} />
                </ListItem>
                <Divider />
                <ListItem button style={{background: "white"}}>
                  <ListItemText style={{width: "25%" , fontSize: '15px'}} primary={"停車場:"} />
                  <ListItemText style={{display: "inline-block" , fontSize: '15px'}} primary={<div>ParkingLot1<br/>ParkingLot2</div>} />
                </ListItem>
                <Divider />
              </div>
              </List>
              <br/>
              <br/>
              <Button type="primary" onClick={this.handleSubmit}>登出</Button><WhiteSpace />
        </div>
      );
    }
  }


  