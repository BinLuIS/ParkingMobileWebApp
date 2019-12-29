import { List, Toast} from 'antd-mobile';
import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import {PullToRefresh, PullDownContent, ReleaseContent, RefreshContent} from "react-js-pull-to-refresh";
import { getClerksprocessingOrders, getOrderByCarNumber, changeOrderStatus } from '../util/APIUtils';
import { Modal} from 'antd-mobile';

const alert = Modal.alert;

export default class viewAcceptedOrderPage extends Component {
    state={
        data:[]
    }
    
    componentDidMount() {
        this.getAcceptedOrder();
    }
    componentWillReceiveProps() {
        this.getAcceptedOrder();
    }

    getAcceptedOrder=()=>{
        getClerksprocessingOrders("1")
        // fetch('https://parkingsystem.herokuapp.com/parkingclerks/1/orders?status=accepted,parked,pendingFetching')
        // .then(results => results.json())
        .then(res => {
          this.setState({data:res})
          console.log(res);
          console.log(this.state.data);
        });
    }

    fetchCar=(order) => {
        const fetchCarItem ={
          carNumber: order.carNumber,
          status: 'completed'
        }
        console.log(fetchCarItem)
        // fetch("https://parkingsystem.herokuapp.com/orders?carNumber="+order.carNumber, {
        //     mode: 'cors', 
        // }).then(res => res.json())
        getOrderByCarNumber(order.carNumber)
            .then(resp => {
                console.log(resp[0].status)
                if(resp.length>0 && resp[0].status=='pendingFetching'){
            //     fetch("https://parkingsystem.herokuapp.com/orders/"+resp[0].id, {
            //     method: 'PATCH', 
            //     headers: new Headers({
            //     'Content-Type': 'application/json'
            // }), 
            // mode: 'cors', 
            // body: JSON.stringify(fetchCarItem)
            // }).then(res => res.json())
            changeOrderStatus(resp[0].id,fetchCarItem)
     .then(res => {
        Toast.success('Order completed', 3);
      this.getAcceptedOrder();
     })
     .catch((error) => {
        console.log('error: ' + error);
        Toast.fail("Failed to complete this order. Please contact technical support",3);
     })
    }
    })

    } 
    onPullList=()=> {
        return new Promise((resolve) => {
            setTimeout(this.getAcceptedOrder(), 2000);
            resolve();
        });
    }
    getParkingLot=(order)=>{
        console.log(order)
        if(order.status=='pendingFetching'){
            return <div>Parking Lot: {order.parkingLot.name}</div>
        }else{
            return <div></div>
        }

    }

    getAction=(order)=>{
        if(order.status=='accepted'){
            return <div onClick={()=>{this.props.onChangePage("pickAcceptedOrderCarPage");this.props.onChangeOrderID(order.id);}}><span style={{verticalAlign: "baseline", fontSize: '15px'}}>Park ></span></div>
        }else if(order.status=='pendingFetching'){
            return <div onClick={()=>{ {alert('Car Picking Up', 'Are you going to pick up this car?', [
                { text: 'Cancel', onPress: () => console.log('cancel') },
                { text: 'Confirm', onPress: () => {{this.fetchCar(order)}; console.log('ok')} },
              ])}} }><span style={{verticalAlign: "baseline", fontSize: '15px'}}>Pick up car ></span></div>
        }
    }
    getIcon = (order) => {
        if(order.status=="parked"){
            return <Avatar
            src={require('../icon/parkicon.png')}
            />
        }else {
            return <Avatar
            src={require('../icon/caricon.png')}
            />
        }
    }
    getListItem = () => {
        if(this.state.data.length > 0) {
            return (<List className={this.props.root}>
                {this.state.data.map(each => (<div key={each.id}>
                  <ListItem key={each.id} button style={{background: "white"}} >
                    <ListItemAvatar>
                      {/* <Avatar
                          src={require('../icon/caricon.png')}
                      /> */}
                      {this.getIcon(each)}
                    </ListItemAvatar>
                    <ListItemText style={{verticalAlign: "baseline" , fontSize: '15px'}} primary={each.carNumber} />
                    {/* <div onClick={()=>this.grabOrder(each)}><span style={{verticalAlign: "baseline", fontSize: '15px'}}>搶單 ></span></div> */}
                    {/* <div>停車時間: 17:00</div> */}
                    {this.getParkingLot(each)}
                    {this.getAction(each)}
                  </ListItem>
                  <Divider />
                  </div>
                ))}
              </List>);
        }
        else {
            return (<div style={{background:"#F5F4F9", verticalAlign: "baseline", textAlign: "center", fontSize: '15px', padding: "5px"}}>No accepted order.</div>);
        }
    }
    render() {
  
      return (
        <div>
            <Typography variant="h5" className={this.props.title} style={{background:"#1B82D2"}}>
                <p style={{textAlign:"center", color: "white", padding: "20px 20px", margin: "0px 0px 0px 0px"}}>Handle order</p>
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