// import React, { Component } from 'react';
import {WhiteSpace, Button } from 'antd-mobile';
import React from 'react';
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
      lotID: [],
      orderID: 6
    }
    componentDidMount() {
      this.setState({lotID: this.props.match.params.id});
    }
    routeChange = () => {
      this.props.history.push('/pickAcceptedOrderCarPage/pickAcceptedOrderParkingLocationPage');
    }
    checkOrder = (orderID) => {
        if(this.state.lotID > 0) {
          fetch('https://parkingsystem.herokuapp.com/parkinglots/1/orders',{
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
          this.props.history.push('/viewAcceptedOrderPage');
        }
        else {
          alert("請先選擇停車場");
        }
    }

    render() {
      
      let listItem;
      if(this.state.lotID != undefined) {
        listItem = <ListItemText primary={"選擇了: " + this.state.lotID} />
        }
        else {
        listItem =<ListItemText primary="選擇停車場" />
        }
      return (
        <div>
        <div className="am-list-header"><span><h1 style={{textAlign: "center",color: "white"}}>停車地點</h1></span></div>
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
            <Button type="primary" onClick={()=>{this.checkOrder(this.state.orderID)}}>完成訂單</Button><WhiteSpace />
        </div>
        </div>
      );
    }
  }
  
  
  export default withStyles(styles)(pickAcceptedOrderCarPage)
  
  
  
  
  