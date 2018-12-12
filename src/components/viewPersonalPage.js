import { Button, WhiteSpace } from 'antd-mobile';
import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import '../css/viewPersonalPage.css';
import {withStyles} from './ImageAvatars';

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
              <Grid container justify="center" alignItems="center">
                <Avatar alt="usericon" src={require('../icon/user_male.png')} width="100" height="100" className="bigAvatar" />
              </Grid>
              <br/>
              <br/>
              <Button type="primary" onClick={this.handleSubmit}>登出</Button><WhiteSpace />
        </div>
      );
    }
  }


  