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
import {PullToRefresh, PullDownContent, ReleaseContent, RefreshContent} from "react-js-pull-to-refresh";
import {getParkingClerksParkinglot,getParkingClerkDetail} from '../util/APIUtils';

export default class viewPersonalPage extends Component {
    state ={
      // parkingClerkEId: 0,
      parkingClerkPId: 0,
      parkingClerkName: "",
      parkingClerkLots: [],
      parkingClerkLotString: ""
    }
    handleSubmit=()=> {
       this.props.onLogout();
       
    }
    getPersonalInfo=()=>{
      let temp_pId = 0;
      getParkingClerkDetail()
      .then(response => {
          this.setState({parkingClerkName: response.name, parkingClerkPId: response.id});
          temp_pId = response.id;
          console.log(`ppppp state: ${response.id}`);
          getParkingClerksParkinglot(temp_pId)
          .then(response => {
              this.setState({parkingClerkLots: response});
          });
      });
      this.getParkingClerkLotString();
    }
    onPullList=()=> {
      return new Promise((resolve) => {
          setTimeout(this.getPersonalInfo(), 2000);
          resolve();
      });
    }
    componentDidMount() {
      
      this.getPersonalInfo();
            
    }
    getParkingClerkId = () => {
      if(this.state.parkingClerkLots.length == 0) {          
        return (<ListItemText style={{display: "inline-block", verticalAlign: "baseline" , fontSize: '15px'}} primary={<div style={{float: "right"}}>下載中...</div>} />);
      }
      else {
          return (<ListItemText style={{display: "inline-block", verticalAlign: "baseline" , fontSize: '15px'}} primary={<div style={{float: "right"}}>{this.state.parkingClerkPId}</div>} />);
      }
    }
    getParkingClerkName = () => {
      if(this.state.parkingClerkLots.length == "") {          
        return (<ListItemText style={{display: "inline-block", verticalAlign: "baseline" , fontSize: '15px'}} primary={<div style={{float: "right"}}>下載中...</div>} />);
      }
      else {
          return (<ListItemText style={{display: "inline-block", verticalAlign: "baseline" , fontSize: '15px'}} primary={<div style={{float: "right"}}>{this.state.parkingClerkName}</div>} />);
      }
    }

    getParkingClerkLotString = () => {
        if(this.state.parkingClerkLots.length == 0) {
          return (<ListItemText style={{display: "inline-block" , fontSize: '15px'}} primary={<div style={{float: "right"}}>下載中...</div>} />);
        }
        if(this.state.parkingClerkLots.length > 0) {
            let tempstr = "";
            this.state.parkingClerkLots.map(e => {
            // ["lot1", "lot2", "lot3", "lot1", "lot2", "lot3", "lot1", "lot2", "lot3", "lot3", "lot1", "lot2", "lot3"].map(e => {
              if(this.state.parkingClerkLots[this.state.parkingClerkLots.length-1].name == e.name)
                tempstr += `${e.name}`;
              else
                tempstr += `${e.name}, `;
            });
            console.log(tempstr);
            // this.setState({parkingClerkLotString: tempstr});
            
          return (<ListItemText style={{width: "70%", display: "inline-block" , fontSize: '15px', float: "right"}} primary={<div style={{ float: "right"}}>{tempstr}</div>} />);
            
        }
        else if (this.state.parkingClerkLots.length == 0) {
            return (<ListItemText style={{display: "inline-block" , fontSize: '15px'}} primary={<div style={{float: "right"}}>沒有所屬的停車場</div>} />);
        }
    }
    render() {
      // {console.log(`EID state: ${this.state.parkingClerkEId}`)}
          {console.log(`PID state: ${this.state.parkingClerkPId}`)}
          {console.log(`Name state: ${this.state.parkingClerkName}`)}
          {console.log(`Lot state: ${this.state.parkingClerkLots}`)}
      return (
        
        <div>
          
          {/* {console.log(`Lot String state: ${this.state.parkingClerkLotString}`)} */}
              <Typography variant="h5" className={this.props.title} style={{background:"#1B82D2"}}>
                <h4 style={{textAlign:"center", color: "white", padding: "20px 20px", margin: "0px 0px 0px 0px"}}>個人頁面</h4>
              </Typography>
              <PullToRefresh
                pullDownContent={<PullDownContent />}
                releaseContent={<ReleaseContent />}
                refreshContent={<RefreshContent />}
                pullDownThreshold={150}
                onRefresh={this.onPullList} 
                triggerHeight={300}
                backgroundColor='white'
                >
              <div style={{background:"#F5F4F9", height: "100vh"}}>
              <br/>
              <br/>
              <ImageAvatars />
              <br/>
              <br/>
              <List className={this.props.root}>
              <div>
                <ListItem button style={{background: "white"}}>
                  <ListItemText style={{width: "25%", verticalAlign: "baseline" , fontSize: '15px'}} primary={"停車員編號:"} />
                  {/* <ListItemText style={{display: "inline-block", verticalAlign: "baseline" , fontSize: '15px'}} primary={<div style={{float: "right"}}>{this.state.parkingClerkPId}</div>} /> */}
                  {this.getParkingClerkId()}
                </ListItem>
                <Divider />
                <ListItem button style={{background: "white"}}>
                  <ListItemText style={{width: "25%", verticalAlign: "baseline" , fontSize: '15px'}} primary={"員工名稱:"} />
                  {/* <ListItemText style={{display: "inline-block", verticalAlign: "baseline" , fontSize: '15px'}} primary={<div style={{float: "right"}}>{this.state.parkingClerkName}</div>} /> */}
                  {this.getParkingClerkName()}
                </ListItem>
                <Divider />
                <ListItem button style={{background: "white"}}>
                  <ListItemText style={{width: "25%" , fontSize: '15px'}} primary={"停車場:"} />
                  {this.getParkingClerkLotString()}
                </ListItem>
                <Divider />
              </div>
              </List>
              <br/>
              <br/>
              <Button type="primary" onClick={this.handleSubmit}>登出</Button><WhiteSpace />
              </div>
              </PullToRefresh>
        </div>
        
      );
    }
  }


  