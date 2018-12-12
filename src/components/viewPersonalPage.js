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
import {getCurrentUser} from '../util/APIUtils';
import {getParkingClerksParkinglot} from '../util/APIUtils';
import {getCurrentParkingClerk} from '../util/APIUtils';

export default class viewPersonalPage extends Component {
    state ={
      parkingClerkEId: 0,
      parkingClerkPId: 0,
      parkingClerkName: "",
      parkingClerkLots: [],
      parkingClerkLotString: ""
    }
    handleSubmit=()=> {
       this.props.onLogout();
       
    }
    componentDidMount() {
      // console.log(`ID prop: ${this.props.parkingClerkId}`);
      // const temp = this.props.parkingClerkId;
      // this.setState({parkingClerkId: temp});
      // console.log(`ID state: ${this.state.parkingClerkId}`);

      let employeeId = 0;
      let temp_pId = 0;
      // let tempLots = [];
      // let tempLotName = [];

      // getCurrentUser()
      //   .then(response => {
      //     this.setState({parkingClerkName: response.name, parkingClerkEId: response.id});
      //       employeeId = response.id;

      //   });
      //   console.log(employeeId);
      //   getCurrentParkingClerk(employeeId)
      //   .then(response => {
      //     console.log(response.idInRole);
      //       this.setState({parkingClerkPId: response.idInRole});
      //       temp_pId = response.idInRole;

      //   });
        
      //   let tempLots = [];

      //   getParkingClerksParkinglot(temp_pId)
      //   .then(response => {
      //       this.setState({parkingClerkLots: response});
      //       tempLots = response;
      //   });
        
      //   let tempstr = "";
      //   for(var i=0; i<tempLots.length; i++) {
      //     // `${this.state.parkingClerkLots[0].name}`
      //     tempstr += `${tempLots[i].name} `;
      //   }
      //   this.setState({parkingClerkLotString: tempstr});
          getCurrentUser()
            .then(response => {
              this.setState({parkingClerkName: response.name, parkingClerkEId: response.id});
                employeeId = response.id;
                getCurrentParkingClerk(employeeId)
                .then(response => {
                    this.setState({parkingClerkPId: response.idInRole});
                    temp_pId = response.idInRole;
                    getParkingClerksParkinglot(temp_pId)
                    .then(response => {
                        this.setState({parkingClerkLots: response});
                    });
                });

            });
            this.getParkingClerkLotString();
    }
    getParkingClerkLotString = () => {
      console.log(this.state.parkingClerkLots.length);
        if(this.state.parkingClerkLots.length > 0) {
            let tempstr = "";
            this.state.parkingClerkLots.map(e => {
            tempstr += e.name;
            tempstr += "<br/>";
            });
            console.log(tempstr);
            // this.setState({parkingClerkLotString: tempstr});
            
            return (<ListItemText style={{display: "inline-block" , fontSize: '15px'}} primary={tempstr} />);
            
        }
        else {
            return (<ListItemText style={{display: "inline-block" , fontSize: '15px'}} primary={"No Parking Lots for you."} />);
        }
    }
    render() {
      
      return (
        
        <div>
          {console.log(`EID state: ${this.state.parkingClerkEId}`)}
          {console.log(`PID state: ${this.state.parkingClerkPId}`)}
          {console.log(`Name state: ${this.state.parkingClerkName}`)}
          {console.log(`Lot state: ${this.state.parkingClerkLots}`)}
          {/* {console.log(`Lot String state: ${this.state.parkingClerkLotString}`)} */}
              <Typography variant="h5" className={this.props.title} style={{background:"#1B82D2"}}>
                <h4 style={{textAlign:"center", color: "white", padding: "20px 20px", margin: "0px 0px 0px 0px"}}>個人頁面</h4>
              </Typography>
              <br/>
              <br/>
              <ImageAvatars />
              <br/>
              <br/>
              <List className={this.props.root}>
              <div>
                <ListItem button style={{background: "white"}}>
                  <ListItemText style={{width: "25%", verticalAlign: "baseline" , fontSize: '15px'}} primary={"用戶名稱:"} />
                  <ListItemText style={{display: "inline-block", verticalAlign: "baseline" , fontSize: '15px'}} primary={this.state.parkingClerkName} />
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
      );
    }
  }


  