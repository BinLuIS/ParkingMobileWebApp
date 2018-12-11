import { TabBar, ListView,Toast } from 'antd-mobile';
import { Icon } from 'antd';
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import '../css/viewAllOrderPage.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

export default class viewAllOrderPage extends Component {
    state={
        data:[]
    }
    
    componentDidMount() {
        this.getAllOrder()
    }

    getAllOrder=()=>{
        fetch('https://parkingsystem.herokuapp.com/orders?status=pendingParking')
        .then(results => results.json())
        .then(res => {
          this.setState({data:res})
          console.log(res);
          console.log(this.state.data);
        });
    }
    grabOrder=(order)=>{
        fetch('https://parkingsystem.herokuapp.com/parkingclerks/1/orders',{
            mode: 'cors',
            method: 'POST', 
            body: JSON.stringify({
            "parkingOrderId" : order.id
            }),
            headers: new Headers({ 'Content-Type': 'application/json'})
        })
        .then(results => results.json())
        .then(res => {
            Toast.success('成功搶單', 1.5);
          this.getAllOrder();
        });
    }
    

    render() {
        
        return (
            <div>
            <Typography variant="h5" className={this.props.title} style={{background:"#1B82D2"}}>
                <h5 style={{textAlign:"center", color: "white", padding: "20px 20px", margin: "0px 0px 0px 0px"}}>訂單</h5>
            </Typography>
            <List dense className={this.props.root}>
              {this.state.data.map(each => (
                <div>
                <ListItem key={each} button style={{background: "white"}} onClick={()=>this.grabOrder(each)}>
                  <ListItemAvatar>
                    <Avatar
                      src={require('../icon/caricon.png')}
                    />
                  </ListItemAvatar>
                  <ListItemText style={{verticalAlign: "baseline" , fontSize: '15px'}} primary={each.carNumber} />
                  <div><span style={{verticalAlign: "baseline", fontSize: '15px'}}>搶單 ></span></div>
                  {/* <div>停車時間: 17:00</div> */}
                </ListItem>
                <Divider />
                </div>
              ))}
            </List>
            </div>
    
      );
    }
  }