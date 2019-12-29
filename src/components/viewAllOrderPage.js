import { Toast } from 'antd-mobile';
import React, { Component } from 'react'
import '../css/viewAllOrderPage.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {PullToRefresh, PullDownContent, ReleaseContent, RefreshContent} from "react-js-pull-to-refresh";
import { getUngrabedOrder,grabPendingOrder } from '../util/APIUtils';

export default class viewAllOrderPage extends Component {
    constructor() {
        super();
        this.state={
            data:[]
        }
    }
    
    
    componentDidMount() {
        this.getAllOrder()
    }
    componentWillReceiveProps() {
        this.getAllOrder();
    }
    getAllOrder=()=>{
      getUngrabedOrder()
        //     fetch('https://parkingsystem.herokuapp.com/orders?status=pendingParking')
        // .then(results => results.json())
        .then(res => {
          this.setState({data:res})
        });
        
    }
    grabOrder=(order)=>{
        // fetch('https://parkingsystem.herokuapp.com/parkingclerks/1/orders',{
        //     mode: 'cors',
        //     method: 'POST', 
        //     body: JSON.stringify({
        //     "parkingOrderId" : order.id
        //     }),
        //     headers: new Headers({ 'Content-Type': 'application/json'})
        // })
        // .then(results => results.json())
        grabPendingOrder("1",{"parkingOrderId" : order.id})
        .then(res => {
            Toast.success('Order accepted', 3);
          this.getAllOrder();
        })
        .catch((error) => {
            Toast.fail("Failed to accept order. Please contact technical support",3);
         });
    }
    
    onPullList=()=> {
        return new Promise((resolve) => {
            setTimeout(this.getAllOrder(), 2000);
            resolve();
        });
    }
        
    getListItem = () => {
        if(this.state.data.length > 0) {
            return (<List className={this.props.root}>
            {this.state.data.reverse().map(each => (
              <div key={each.id}>
              <ListItem 
              key={each.id} button style={{background: "white"}} onClick={()=>this.grabOrder(each)}>
                <ListItemAvatar>
                  <Avatar
                    src={require('../icon/caricon.png')}
                  />
                </ListItemAvatar>
                <ListItemText style={{verticalAlign: "baseline" , fontSize: '15px'}} primary={each.carNumber} />
                <div><span style={{verticalAlign: "baseline", fontSize: '15px'}}>Compete ></span></div>
                {/* <div>停車時間: 17:00</div> */}
              </ListItem>
              <Divider />
              </div>
            ))}
          </List>);
        }
        else {
            return (<div style={{background:"#F5F4F9", verticalAlign: "baseline", textAlign: "center", fontSize: '15px', padding: "5px"}}>There is no new order</div>);
        }
    }

    render() {
        
        return (
            <div>
            
            <Typography variant="h5" className={this.props.title} style={{background:"#1B82D2"}}>
                <p style={{textAlign:"center", color: "white", padding: "20px 20px", margin: "0px 0px 0px 0px"}}>Order</p>
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
            {this.getListItem()}
            </div>
            </PullToRefresh>
            </div>
    
      );
    }
  }