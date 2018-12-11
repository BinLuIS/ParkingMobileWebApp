// import React, { Component } from 'react';
import {WhiteSpace, Button } from 'antd-mobile';
import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Route, Link,Switch} from 'react-router-dom';
import '../css/pickAcceptedOrderCarPage.css';
import viewAllOrderPage from './viewAllOrderPage';


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
          fetch('https://parkingsystem.herokuapp.com/parkinglots/'+this.props.lotID+'/orders',{
          mode: 'cors',
          method: 'POST',
          body: JSON.stringify({
          "parkingOrderId" : orderID
          }),
          headers: new Headers({ 'Content-Type': 'application/json'})
          })
          .then(results => results.json())
          .then(res => {
          });
          alert("完成泊車");
          this.props.onChangePage("viewAcceptedOrderPage");
        }
        else {
          alert("請先選擇停車場");
        }
    }

    render() {
      
      let listItem;
      console.log(this.props.lotID);
      if(this.props.lotID != -1 && this.props.lotID !== undefined) {
        listItem = <ListItemText primary={"選擇了: " + this.props.lotID} />
        }
        else {
        listItem =<ListItemText primary="選擇停車場" />
        }
      return (
        <div>
        <div className="am-list-header"><span><h1 style={{textAlign: "center",color: "white"}}><Icon type="left" style={{float: "left", fontSize: "20px", paddingTop: "5px"}} onClick={()=>this.props.onChangePage("viewAcceptedOrderPage")}/>停車地點</h1></span></div>
        {/* <Layout>
        <Content>
          <Switch>
            <Route path="/" exact component={pickAcceptedOrderCarPage}></Route>
            <Route path="/pickAcceptedOrderParkingLocationPage" component={pickAcceptedOrderParkingLocationPage}></Route>
          </Switch>
        </Content>
      </Layout> */}

	    <List>
            <List component="nav" className={this.props.classes.root}>
                <ListItem button onClick={this.routeChange} >
                    {listItem}
                </ListItem>
            </List>
        </List>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div>
            <Button type="primary" onClick={()=>{this.checkOrder(this.props.orderID)}}>完成訂單</Button><WhiteSpace />
        </div>
        </div>
      );
    }
  }
  
  
  export default withStyles(styles)(pickAcceptedOrderCarPage)
  
  
  
  
  