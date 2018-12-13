
import {InputItem, WhiteSpace, Button,Toast } from 'antd-mobile';
import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Route, Link,Switch} from 'react-router-dom';
import '../css/pickAcceptedOrderCarPage.css';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {checkParkingLotParkingOrder} from '../util/APIUtils'


  const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  });
  class pickAcceptedOrderCarPage extends React.Component {
    state = {
    }
    routeChange = () => {
      // this.props.history.push('/pickAcceptedOrderCarPage/pickAcceptedOrderParkingLocationPage');
      this.props.onChangePage("pickAcceptedOrderParkingLocationPage");
    }
    checkOrder = (orderID) => {
        if(this.props.lotID > 0) {
          // fetch('https://parkingsystem.herokuapp.com/parkinglots/'+this.props.lotID+'/orders',{
          // mode: 'cors',
          // method: 'POST',
          // body: JSON.stringify({
          // "parkingOrderId" : orderID
          // }),
          // headers: new Headers({ 'Content-Type': 'application/json'})
          // })
          // .then(results => results.json())
          checkParkingLotParkingOrder(this.props.lotID,{"parkingOrderId" : orderID})
          .then(res => {
          });
          Toast.success('完成泊車', 3);
          this.props.onChangePage("viewAcceptedOrderPage");
        }
        else {
          Toast.info("請先選擇停車場",3);
        }
    }

    render() {
      
      let listItem;
      console.log(this.props.lotID);
      console.log(this.props.lotName);
      if(this.props.lotID != -1 && this.props.lotID !== undefined) {
        listItem = <ListItemText primary={"選擇了: " + this.props.lotName} />
        }
        else {
        listItem =<ListItemText primary="選擇停車場" />
        }
      return (
      //   <div>
      //   <div className="am-list-header">
      //   <span><h1 style={{textAlign: "center",color: "white"}}><Icon type="left" style={{float: "left", fontSize: "20px", paddingTop: "5px"}} onClick={()=>this.props.onChangePage("viewAcceptedOrderPage")}/>停車地點</h1></span></div>

        <div>
          <Typography variant="h5" className={this.props.title} style={{background:"#1B82D2"}}>
              <h4 style={{textAlign:"center", color: "white", padding: "20px 20px", margin: "0px 0px 0px 0px"}}><Icon type="left" style={{float: "left", fontSize: "20px", paddingTop: "5px"}} onClick={()=>this.props.onChangePage("viewAcceptedOrderPage")}/>停車地點</h4>
          </Typography>
            <List>
              <List component="nav" className={this.props.classes.root}>
                <ListItem button onClick={this.routeChange} >
                    {listItem}
                </ListItem>
                <Divider />
              </List>
            </List>
            <br />
           <br />
            <br />
           <br />
           <br />
            <div>
             <Button type="primary" onClick={()=>{this.checkOrder(this.props.orderID)}}>完成泊車</Button><WhiteSpace />
            </div>
        </div>
      );
    }
  }
            
  
  
  export default withStyles(styles)(pickAcceptedOrderCarPage)
  
  
  
  
  